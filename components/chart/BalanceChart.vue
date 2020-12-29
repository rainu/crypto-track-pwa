<template>
  <v-card>
    <v-card-title>{{ $t('chart.balance.title') }}</v-card-title>
    <v-card-text>
      <pie-chart :chart-data="chartData" :options="options"></pie-chart>
    </v-card-text>
  </v-card>
</template>

<script>
import PieChart from './ReactivePie'
import {mapState} from 'vuex';
import numeral from 'numeral'
import randomColor from 'randomcolor'

export default {
  components: { PieChart },
  props: {
    currency: {
      type: Object,
      required: false,
      default() {
        return {
          name: "USD",
          type: "fiat"
        }
      },
    },
    colors: {
      required: false,
      default() {
        return [
          this.$vuetify.theme.currentTheme.primary,
          this.$vuetify.theme.currentTheme.secondary,
          this.$vuetify.theme.currentTheme.accent,
          this.$vuetify.theme.currentTheme.info,
          this.$vuetify.theme.currentTheme.warning,
          this.$vuetify.theme.currentTheme.error,
        ]
      }
    },
    options: {
      required: false,
      default() {
        return {
          animation: {
            duration: 0, // general animation time
          },
          responsiveAnimationDuration: 0, // animation duration after a resize
          tooltips: {
            callbacks: {
              label(tpItem, data) {
                return data.datasets[0].labels[tpItem.index];
              },
              afterLabel(tpItem, data) {
                return data.datasets[0].footers[tpItem.index];
              }
            }
          },
          legend: {
            position: 'bottom'
          },
          plugins: {
            datalabels: {
              anchor: 'center',
              align: 'top',
              backgroundColor: '#FFFFFF',
              borderColor: '#909090',
              borderWidth: 2,
              borderRadius: 90,
              // offset: 100,
              font: {
                weight: 'bold',
              },
              formatter(value, ctx) {
                return ctx.dataset.datalabels[ctx.dataIndex];
              }
            }
          }
        }
      }
    }
  },
  data() {
    return {
      chartData: {}
    }
  },
  computed: {
    ...mapState({
      locale: state => state.settings.locale,
      currencies: state => state.currencies.currencies,
      currentTotals: state => state.balances.currentTotals,
    }),
    totals(){
      if (!this.currency) {
        return null
      }

      let key = `${this.currency.type}_${this.currency.name}`
      return this.currentTotals[key] ? this.currentTotals[key] : null
    }
  },
  methods: {
    calcChartData() {
      let currencyNames = Object.keys(this.totals.crypto)
      currencyNames.sort((a, b) => (this.totals.crypto[a] - this.totals.crypto[b]) * -1)

      let data = {
        labels: []
      }
      let datasetData = [];
      let dataLabels = [];
      let dataDataLabels = [];
      let dataFooters = [];
      let total = 0;

      for (let currencyName of currencyNames) {
        let balanceAmount = this.totals.crypto[currencyName]

        if (balanceAmount <= 0) {
          continue
        }

        let format = '0.00'
        if (this.currency && this.currency.name) {
          format = this.currencies[this.currency.type][this.currency.name].format.numeral
        }

        let dAmount = numeral(balanceAmount).format(format)

        total += parseFloat(balanceAmount);

        datasetData.push(balanceAmount);
        dataLabels.push(`${currencyName}: ${dAmount} ${this.currency.name}`);
        data.labels.push(currencyName)
      }
      for (let i in datasetData) {
        let percent = datasetData[i] * 100 / total;
        percent = percent.toFixed(2);

        dataDataLabels.push(`${percent}%`);
        dataFooters.push(this.$t('chart.balance.data-footer', {
          percent: percent
        }));
      }
      let colors = [];
      colors.push(...this.colors);
      if (data.labels.length > colors.length) {
        //we dont have enough colors: so generate some one
        colors.push(...randomColor({
          count: data.labels.length - colors.length,
        }))
      }
      data.datasets = [{
        label: this.title,
        backgroundColor: colors.slice(0, data.labels.length),
        data: datasetData,
        labels: dataLabels,
        footers: dataFooters,
        datalabels: dataDataLabels,
      }];

      this.chartData = data
    }
  },
  watch: {
    locale() {
      numeral.locale(this.locale)
    }
  },
  mounted() {
    numeral.locale(this.locale)
    this.calcChartData()
  }
}
</script>

<style scoped>

</style>
