<template>
  <v-card>
    <v-card-title>{{ $t('balances.total-value') }}:</v-card-title>
    <v-card-text>
      <strong>
        <CurrencyAmount :amount="totalValue" :currency="defaultDstCurrency" />
      </strong>
    </v-card-text>
  </v-card>
</template>

<script>
import {mapGetters, mapState} from "vuex";
import CurrencyAmount from "@/components/CurrencyAmount";

export default {
  name: "CardTotalValue",
  props: {
    currency: {
      type: Object,
      required: false,
      default(){
        return {
          type: 'fiat',
          name: 'USD'
        }
      },
    }
  },
  components: {CurrencyAmount},
  computed: {
    ...mapState({
      defaultDstCurrency: state => state.settings.balances.dstCurrency,
      currentTotals: state => state.balances.currentTotals,
    }),
    ...mapGetters({
      currentBalance: 'balances/currentBalance'
    }),
    currencyBalance(){
      return this.currentBalance(this.currency).amount
    },
    currentTotal() {
      if (!this.defaultDstCurrency) {
        return 0
      }

      let key = `${this.defaultDstCurrency.type}_${this.defaultDstCurrency.name}`
      return this.currentTotals[key] ? this.currentTotals[key].total : 0
    },
    totalValue(){
      return this.currentTotal + this.currencyBalance
    }
  }
}
</script>

<style scoped>

</style>
