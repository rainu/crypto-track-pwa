<template>
  <i>
    <cryptoicon v-if="isSymbolKnown" :symbol="symbol" :size="12" :color="color"></cryptoicon>
    <span v-else>{{ symbol }}</span>
  </i>
</template>

<script>
import {mapState} from 'vuex';
import icons from 'vue-cryptoicon/src/icons'

export default {
  name: "CurrencyIcon",
  props: {
    currency: {
      type: Object,
    }
  },
  data() {
    return {}
  },
  computed: {
    ...mapState({
      currencies: state => state.currencies.currencies,
      darkMode: state => state.settings.theme.dark,
    }),
    isSymbolKnown(){
      return icons.filter(i => i.symbol.toLowerCase() === this.currency.name.toLowerCase()).length > 0
    },
    symbol() {
      if (!this.currency || !this.currency.name) {
        return ''
      }
      return this.currency.name
    },
    color() {
      return this.darkMode ? 'white' : 'black'
    }
  }
}
</script>
