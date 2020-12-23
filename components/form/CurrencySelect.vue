<template>
  <v-autocomplete
    v-model="selectedValues"
    :label="label"
    :items="items"
    :error="error"
    item-value="value"
    item-text="label"
    multiple
    clearable
    filled
    chips
    deletable-chips
    @change="onSelectCurrencies">

    <template v-slot:item="data" >
      <CurrencyIcon :currency="data.item.value" />
      &nbsp;
      <span>{{data.item.label}}</span>
    </template>
    <template v-slot:selection="data" >
      <v-chip close @click:close="remove(data.item)">
        <CurrencyIcon :currency="data.item.value" />
        &nbsp;
        <span>{{data.item.label}}</span>
      </v-chip>
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
  name: "CurrencySelect",
  components: {CurrencyIcon},
  props: {
    value: {
      default() {
        return [];
      },
      required: true,
      type: Array
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
      selectedValues: [],
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
    },
  },
  methods: {
    remove (item) {
      let index = this.selectedValues.findIndex(currency => {
        return currency.name === item.value.name && currency.type === item.value.type
      })
      if (index >= 0) this.selectedValues.splice(index, 1)
    },
    onSelectCurrencies(currencies) {
      this.$emit('input', currencies)
    }
  },
  mounted() {
    if (this.value) {
      this.selectedValues = this.items.filter(option => {
        for(let so of this.value) {
          if(option.value === so.name && option.type === so.type){
            return true;
          }
        }
        return false;
      })
    }
  }
}
</script>

<style scoped>

</style>
