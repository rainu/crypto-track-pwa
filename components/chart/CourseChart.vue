<template>
  <v-card>
    <v-card-title></v-card-title>
    <v-card-actions>
      <v-row>
        <v-col cols="12" sm="6">
          <CurrencyChooser :whitelist="whitelist" v-model="chosenLeftCurrency" />
        </v-col>
        <v-col cols="12" sm="6">
          <CurrencyChooser :whitelist="whitelist" v-model="chosenRightCurrency" />
        </v-col>
      </v-row>
    </v-card-actions>
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
  </v-card>
</template>

<script>
import * as dateFN from 'date-fns'
import numeral from "numeral";
import {mapActions, mapState} from "vuex";
import LineChart from "@/components/chart/ReactiveLine";
import CurrencyChooser from "@/components/form/CurrencyChooser";
import DatePicker from "@/components/form/DatePicker";

export default {
  name: "CourseChart",
  components: {DatePicker, CurrencyChooser, LineChart},
  props: {
    baseOptions: {
      required: false,
      default(){
        return {
          responsive: true,
          tooltips: {
            callbacks: {
              label(tpItem, data) {
                return numeral(data.datasets[tpItem.datasetIndex].data[tpItem.index]).format('0.00') + " $";
              },
            }
          }
        }
      }
    }
  },
  data() {
    return {
      chartData: {},
      from: dateFN.addDays(new Date(), -30),
      until: new Date(),
      skipCalc: true,
      chosenLeftCurrency: null,
      chosenRightCurrency: null,
    }
  },
  computed: {
    ...mapState({
      locale: state => state.settings.locale,
      currencies: state => state.currencies.currencies,
    }),
    pairs(){
      return [
        ...Object.values(this.currencies.fiat).filter(c => c.key !== 'USD').map(c => {
          return {from: {type: 'fiat', name: c.key}, to: {type: 'fiat', name: 'USD'}}
        }),
        ...Object.values(this.currencies.crypto).map(c => {
          return {from: {type: 'crypto', name: c.key}, to: {type: 'fiat', name: 'USD'}}
        })
      ]
    },
    whitelist(){
      return this.pairs.map(p => p.from)
    },
    chosenPairs(){
      let chosen = []

      if(this.chosenLeftCurrency) {
        chosen.push(...this.pairs.filter(p => p.from.type === this.chosenLeftCurrency.type && p.from.name === this.chosenLeftCurrency.name))
      }
      if(this.chosenRightCurrency) {
        chosen.push(...this.pairs.filter(p => p.from.type === this.chosenRightCurrency.type && p.from.name === this.chosenRightCurrency.name))
      }

      return chosen
    },
    options(){
      let options = {...this.baseOptions}
      options.scales = {
        yAxes: []
      }

      for(let i=0; i < this.chosenPairs.length; i++) {
        options.scales.yAxes.push({
          id: `y${i}`,
          type: 'linear',
          display: true,
          position: i % 2 === 0 ? 'left' : 'right',
        })
      }
      return options
    }
  },
  methods: {
    ...mapActions({
      getHistoricalCourse: 'courses/getHistoricalCourse',
    }),
    async calcChartData() {
      let data = {
        labels: [],
        datasets: []
      }

      let days = Math.abs(dateFN.differenceInDays(this.from, this.until))
      let promises = []

      for(let i=0; i < this.chosenPairs.length; i++) {
        let pair = this.chosenPairs[i]
        promises.push(new Promise(async resolve => {

          let courses = {
            label: pair.from.name,
            fill: false,
            yAxisID: `y${i}`,
            data: [],
          }

          //alternate coloring
          if(i%2===0) {
            courses.backgroundColor = this.$vuetify.theme.currentTheme.secondary + '88' //secondary half alpha
            courses.borderColor = this.$vuetify.theme.currentTheme.primary
          } else {
            courses.backgroundColor = this.$vuetify.theme.currentTheme.primary + '88' //primary half alpha
            courses.borderColor = this.$vuetify.theme.currentTheme.secondary
          }

          for (let i = 0; i < days; i++) {
            let curDate = dateFN.addDays(this.from, i)

            let course = await this.getHistoricalCourse({
              course: {
                ...pair,
                date: curDate
              }
            })

            courses.data.push(course ? course.close : 0)
          }

          resolve(courses)
        }))
      }

      await Promise.all(promises).then(courses => data.datasets.push(...courses))

      for (let i = 0; i < days; i++) {
        let curDate = dateFN.addDays(this.from, i)
        data.labels.push(dateFN.format(curDate, this.$t('common.datetime.format.date')))
      }

      this.chartData = data;
    },
  },
  watch:{
    locale() {
      numeral.locale(this.locale)
    },
    chosenPairs(){
      if(!this.skipCalc) {
        this.calcChartData()
      }
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

    this.chosenLeftCurrency = this.whitelist.find(w => w.type === 'crypto' && w.name === 'BTC')
    this.chosenRightCurrency = this.whitelist.find(w => w.type === 'crypto' && w.name === 'ETH')

    if(!this.chosenLeftCurrency && this.whitelist.length > 0) this.chosenLeftCurrency = this.whitelist[0]
    if(!this.chosenRightCurrency && this.whitelist.length > 1) this.chosenRightCurrency = this.whitelist[1]

    this.skipCalc = false
    this.calcChartData()
  }
}
</script>

<style scoped>

</style>
