<template>
  <span class="word-wrap">
    {{ displayAmount }} <CurrencyIcon :currency="currency" />
  </span>
</template>

<script>
import {mapState} from 'vuex';
import numeral from 'numeral'
import CurrencyIcon from "./CurrencyIcon";

export default {
  name: "CurrencyAmount",
  components: {CurrencyIcon},
  props: {
    amount: {
      type: Number,
    },
    currency: {
      type: Object,
    },
  },
  data() {
    return {}
  },
  computed: {
    ...mapState({
      locale: state => state.settings.locale,
      currencies: state => state.currencies.currencies,
    }),
    displayAmount() {
      if (!this.amount) {
        return "0";
      }

      let format = '0.00'
      if (this.currency && this.currency.name) {
        format = this.currencies[this.currency.type][this.currency.name].format.numeral
      }

      numeral.locale(this.locale)
      let dAmount = numeral(this.amount).format(format)

      if (dAmount === "NaN") {
        dAmount = "0"
      }

      return dAmount;
    }
  }
}
</script>
