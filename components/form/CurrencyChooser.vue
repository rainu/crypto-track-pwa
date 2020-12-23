<template>
  <v-autocomplete
    :label="label"
    :items="items"
    :value="selectedValue"
    :error="error"
    item-value="value"
    item-text="label"
    clearable
    @change="onSelectCurrency">

    <template v-slot:item="data" >
      <CurrencyIcon :currency="data.item.value" />
      &nbsp;
      <span>{{data.item.label}}</span>
    </template>
    <template v-slot:selection="data" >
      <CurrencyIcon :currency="data.item.value" />
      &nbsp;
      <span>{{data.item.label}}</span>
    </template>
    <template v-slot:no-data>
      <span>{{$t('common.select.no-result')}}</span>
    </template>
  </v-autocomplete>
</template>

<script>
import {mapState} from "vuex";
import CurrencyIcon from "@/components/CurrencyIcon";

export default {
  name: "CurrencyChooser",
  components: {CurrencyIcon},
  props: {
    value: {
      default() {
        return {
          name: null,
          value: null
        }
      },
      required: false,
      type: Object
    },
    error: {
      required: false,
      default: false,
      type: Boolean,
    },
    label: {
      default: '',
      required: false,
      type: String
    },
    fiat: {
      default: true,
      required: false,
    },
    crypto: {
      default: true,
      required: false,
    },
    whitelist: {
      default() {
        return []
      },
      required: false,
      type: Array,
    }
  },
  data() {
    return {
      selectedValue: null,
    }
  },
  computed: {
    ...mapState({
      currencies: state => state.currencies.currencies,
    }),
    items() {
      let cleanedWhitelists = {
        fiat: [],
        crypto: []
      }
      let hasWhitelist = this.whitelist.length > 0

      if (this.whitelist) {
        //filter out invalid values:
        // empty object
        // object within no name
        // object within no typ
        cleanedWhitelists = {
          fiat: this.whitelist
            .filter(i => i)
            .filter(i => i.name)
            .filter(i => i.type)
            .filter(i => i.type === 'fiat')
            .map(i => i.name),
          crypto: this.whitelist
            .filter(i => i)
            .filter(i => i.name)
            .filter(i => i.type)
            .filter(i => i.type === 'crypto')
            .map(i => i.name),
        }
      }

      let items = []
      const fiat = this.currencies.fiat;
      const crypto = this.currencies.crypto;

      if (this.fiat) {
        for (let symbol of Object.keys(fiat)) {
          if (!hasWhitelist || cleanedWhitelists.fiat.includes(symbol)) {
            items.push({
              label: `${symbol} (${fiat[symbol].label})`,
              value: {
                name: fiat[symbol].key,
                type: 'fiat'
              }
            })
          }
        }
      }
      if (this.crypto) {
        for (let symbol of Object.keys(crypto)) {
          if (!hasWhitelist || cleanedWhitelists.crypto.includes(symbol)) {
            items.push({
              label: `${symbol} (${crypto[symbol].label})`,
              value: {
                name: crypto[symbol].key,
                type: 'crypto'
              }
            })
          }
        }
      }
      return items;
    }
  },
  methods: {
    onSelectCurrency(currency) {
      this.$emit('input', currency)
    }
  },
  watch: {
    value() {
      if (this.value.name === '') {
        this.selectedValue = ''
      } else if (
        !this.selectedValue || (
        this.selectedValue &&
        this.selectedValue.name !== this.value.name &&
        this.selectedValue.type !== this.value.type)
      ) {
        for (let curOpt of this.items) {
          if (curOpt.value === this.value.name) {
            this.selectedValue = curOpt;
            break;
          }
        }
      }
    },
    items() {
      if(this.items.length === 1) {
        this.selectedValue = this.items[0]
        this.onSelectCurrency(this.items[0].value)
      }
    }
  },
  mounted() {
    if (this.value) {
      for (let curOpt of this.items) {
        if (curOpt.value === this.value.name && curOpt.type === this.value.type) {
          this.selectedValue = curOpt
          break
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
