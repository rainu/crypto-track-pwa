<template>
  <v-card>
    <v-card-title></v-card-title>
    <v-card-actions>
      <v-row>
        <v-col cols="6">
          <DatePicker v-model="from" label="chart.range.from" />
        </v-col>
        <v-col cols="6">
          <DatePicker v-model="until" label="chart.range.until" />
        </v-col>
      </v-row>
    </v-card-actions>

    <v-card-text>
      <line-chart :chart-data="chartData" :options="options"/>
    </v-card-text>

    <v-card-actions>
      <slot></slot>
    </v-card-actions>
  </v-card>
</template>

<script>
import * as dateFN from 'date-fns'
import numeral from "numeral";
import {mapActions, mapGetters, mapState} from "vuex";
import DatePicker from "@/components/form/DatePicker";
import LineChart from "@/components/chart/ReactiveLine";

export default {
  name: "BalanceHistoryChart",
  components: {DatePicker, LineChart},
  props: {
    baseOptions: {
      required: false,
      default(){
        return {
          responsive: true,
        }
      }
    }
  },
  data() {
    return {
      chartData: {},
      calcData: {
        balances: [],
        totals: []
      },
      from: dateFN.addDays(new Date(), -30),
      until: new Date(),
      skipCalc: true,
    }
  },
  computed: {
    ...mapState({
      locale: state => state.settings.locale,
      currencies: state => state.currencies.currencies,
      defaultDstCurrency: state => state.settings.balances.dstCurrency,
    }),
    ...mapGetters({
      getCorrespondingCurrency: 'currencies/getCurrency'
    }),
    correspondingCurrency(){
      return this.getCorrespondingCurrency(this.defaultDstCurrency.type, this.defaultDstCurrency.name)
    },
    options(){
      let self = this

      let options = {
        ...this.baseOptions,
        tooltips: {
          callbacks: {
            label(tpItem, data) {
              let f = self.correspondingCurrency.format.numeral
              let l = data.datasets[tpItem.datasetIndex].label
              let n = numeral(data.datasets[tpItem.datasetIndex].data[tpItem.index]).format(f)

              return `${l}: ${n} ${self.correspondingCurrency.key}`;
            },
            afterLabel(tpItem, data) {
              let f = self.correspondingCurrency.format.numeral
              let l = self.correspondingCurrency.key

              let entries = Object.entries(self.calcData.totals[tpItem.index].crypto).filter(([key, value]) => value > 0)
              entries.sort(([aKey, aValue], [bKey, bValue]) => bValue - aValue)

              return entries.map(([key, value]) => {
                let ca = self.calcData.balances[tpItem.index].find(b => b.currency.type === 'crypto' && b.currency.name === key).amount
                let c = self.getCorrespondingCurrency('crypto', key)
                ca = numeral(ca).format(c.format.numeral)

                let n = numeral(value).format(f)
                return `${ca} ${key} -> ${n} ${l}`
              })
            },
          }
        }
      }

      return options
    }
  },
  methods: {
    ...mapActions({
      getHistoricalBalances: 'balances/getHistoricalBalancesAt',
      getHistoricalTotals: 'balances/getHistoricalTotalsAt',
    }),
    async calcChartData() {
      let lBalances = []
      let lTotals = []

      let data = {
        labels: [],
        datasets: [{
          label: this.$t('balances.total-coins'),
          fill: true,
          backgroundColor: this.$vuetify.theme.currentTheme.success + '88',
          borderColor: this.$vuetify.theme.currentTheme.primary,
          data: [],
        },{
          label: this.$t('balances.total-currency'),
          fill: true,
          backgroundColor: this.$vuetify.theme.currentTheme.warning + '88',
          borderColor: this.$vuetify.theme.currentTheme.primary,
          data: [],
        },{
          label: this.$t('balances.total-value'),
          fill: true,
          backgroundColor: this.$vuetify.theme.currentTheme.primary + '88',
          borderColor: this.$vuetify.theme.currentTheme.primary,
          data: [],
        }],
      }

      let days = Math.abs(dateFN.differenceInDays(this.from, this.until))

      let promises = []

      for (let i = 0; i < days; i++) {
        let curDate = dateFN.addDays(this.from, i)

        let p = Promise.all([
          this.getHistoricalBalances(curDate),
          this.getHistoricalTotals({dstCurrency: this.defaultDstCurrency, at: curDate})
        ]).then(([balances, totals]) => {

          let coinValue = totals ? totals.total : 0
          let currencyValue = balances.find(b => b.currency.type === this.defaultDstCurrency.type && b.currency.name === this.defaultDstCurrency.name)
          currencyValue = currencyValue ? currencyValue.amount : 0

          let totalValue = coinValue + currencyValue

          return {coinValue, currencyValue, totalValue, balances, totals}
        })

        promises.push(p)
      }

      let datasets = await Promise.all(promises)
      for(let ds of datasets) {
        data.datasets[0].data.push(ds.coinValue)
        data.datasets[1].data.push(ds.currencyValue)
        data.datasets[2].data.push(ds.totalValue)
        lBalances.push(ds.balances)
        lTotals.push(ds.totals)
      }

      for (let i = 0; i < days; i++) {
        let curDate = dateFN.addDays(this.from, i)
        data.labels.push(dateFN.format(curDate, this.$t('common.datetime.format.date')))
      }

      this.calcData.balances = lBalances
      this.calcData.totals = lTotals
      this.chartData = data;
    },
  },
  watch:{
    locale() {
      numeral.locale(this.locale)
    },
    from(){
      if(!this.skipCalc) {
        this.calcChartData()
      }
    },
    until(){
      if(!this.skipCalc) {
        this.calcChartData()
      }
    }
  },
  mounted() {
    numeral.locale(this.locale)

    this.skipCalc = false
    this.calcChartData()
  }
}
</script>

<style scoped>

</style>
