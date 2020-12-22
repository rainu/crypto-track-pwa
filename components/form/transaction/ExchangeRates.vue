<template>
  <v-card>
    <v-card-title>
      <slot></slot>
    </v-card-title>

    <v-row>
      <v-col cols="12">
        <template v-for="(curRate, i) in rates">
          <ExchangeRate v-model="rates[i]"/>
        </template>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-btn block color="success" @click.prevent="addRate">
          <v-icon>add_circle</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import ExchangeRate from "@/components/form/ExchangeRate";

export default {
  components: {ExchangeRate},
  props: {
    value: {
      type: Array,
    },
    currencies: {
      type: Array,
      required: false,
      default() {
        return []
      }
    }
  },
  data() {
    let rates = []
    if (this.value) {
      rates = [...this.value]
    }

    let defaults = this.defaultRates()
    for (let curDef of defaults) {
      let shouldAdd = true
      for (let curRate of rates) {
        if (curRate.in.type === curDef.in.type && curRate.in.name === curDef.in.name) {
          shouldAdd = false;
          break;
        }
      }

      if (shouldAdd) {
        rates.push(curDef)
      }
    }

    return {
      rates: rates
    }
  },
  methods: {
    defaultRates() {
      let rates = [];

      let fiats = this.currencies.filter(c => c.type === 'fiat')
      if (fiats.length === 0) {
        fiats.push({
          type: 'fiat',
          name: 'EUR'
        })
      }

      for (let currency of this.currencies) {
        if (currency.type === 'crypto') {
          for (let fiat of fiats) {
            rates.push({
              in: currency,
              out: fiat,
              ratio: 0
            })
          }
        }
      }

      return rates;
    },
    addRate() {
      this.rates.push({
        in: null,
        out: null,
        ratio: 0
      })
    }
  },
  watch: {
    rates(newRates) {
      //only emit valid rates
      this.$emit('input', newRates.filter(r => r).filter(r => r.ratio !== 0))
    },
    currencies() {
      let newDefaults = this.defaultRates()
      let oldRates = this.rates.filter(r => r).filter(r => r.ratio !== 0)
      let newRates = [...oldRates]

      for (let curDef of newDefaults) {
        let shouldAdd = true
        for (let curRate of newRates) {
          if (curRate.in.type === curDef.in.type && curRate.in.name === curDef.in.name) {
            shouldAdd = false;
            break;
          }
        }

        if (shouldAdd) {
          newRates.push(curDef)
        }
      }

      this.rates = newRates
    }
  }
}
</script>

<style scoped>

</style>
