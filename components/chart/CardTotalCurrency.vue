<template>
  <v-card>
    <v-card-title>{{ $t('balances.total-currency') }}:</v-card-title>
    <v-card-text>
      <strong>
        <CurrencyAmount :amount="balance" :currency="currency" />
      </strong>
    </v-card-text>
  </v-card>
</template>

<script>
import {mapGetters} from "vuex";
import CurrencyAmount from "@/components/CurrencyAmount";

export default {
  name: "CardTotalCurrency",
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
    ...mapGetters({
      currentBalance: 'balances/currentBalance'
    }),
    balance(){
      return this.currentBalance(this.currency).amount
    }
  }
}
</script>

<style scoped>

</style>
