<template>
  <v-card>
    <v-card-title>{{ $t('balances.total-coins') }}</v-card-title>
    <v-card-text>
      <strong>
        <CurrencyAmount :amount="totalValue" :currency="defaultDstCurrency" />
      </strong>
    </v-card-text>
  </v-card>
</template>

<script>
import {mapState} from "vuex";
import CurrencyAmount from "@/components/CurrencyAmount";

export default {
  name: "CardTotalCoins",
  components: {CurrencyAmount},
  computed: {
    ...mapState({
      defaultDstCurrency: state => state.settings.balances.dstCurrency,
      currentTotals: state => state.balances.currentTotals,
    }),
    totalValue() {
      if (!this.defaultDstCurrency) {
        return 0
      }

      let key = `${this.defaultDstCurrency.type}_${this.defaultDstCurrency.name}`
      return this.currentTotals[key] ? this.currentTotals[key].total : 0
    }
  }
}
</script>

<style scoped>

</style>
