<template>
  <v-row justify="center" align="center" dense>
    <v-col cols="12" md="5">
      <v-progress-linear v-show="inProgress" :value="statePercent" height="32" striped>
        <strong>{{ Math.ceil(statePercent) }}%</strong>
      </v-progress-linear>
      <v-progress-linear v-show="!inProgress" color="success" height="32"></v-progress-linear>
    </v-col>
    <v-col cols="4" md="3">
      <CurrencyChooser v-model="dstCurrency" :clearable="false" />
    </v-col>
    <v-col cols="8" md="4">
      <v-btn block @click="onCalculate" :disabled="inProgress">
        <v-icon>mdi-calculator</v-icon>
        {{ $t('balances.calculate') }}
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import {mapActions, mapState} from "vuex";
import CurrencyChooser from "@/components/form/CurrencyChooser";

export default {
  name: "BalancesCalculator",
  components: {CurrencyChooser},
  data(){
    return {
      dstCurrency: { type: 'fiat', name: 'USD' },
      inProgress: false,
    }
  },
  computed: {
    ...mapState({
      defaultDstCurrency: state => state.settings.balances.dstCurrency,
      balancesState: state => state.balances.updateState.balances,
      totalsState: state => state.balances.updateState.totals,
    }),
    balancesStatePercent() {
      if (this.balancesState.current == null || this.balancesState.total == null) {
        return 0
      }
      if(this.balancesState.total === 0) return 100

      return this.balancesState.current * 100 / this.balancesState.total
    },
    totalsStatePercent() {
      if (this.totalsState.current == null || this.totalsState.total == null) {
        return 0
      }
      if(this.totalsState.total === 0) return 100

      return this.totalsState.current * 100 / this.totalsState.total
    },
    statePercent(){
      return this.balancesStatePercent / 2 + this.totalsStatePercent / 2
    }
  },
  methods: {
    ...mapActions({
      setBalanceDestinationCurrency: 'settings/setBalanceDestinationCurrency',
      updateBalances: 'balances/updateBalances',
      updateTotals: 'balances/updateTotals',
    }),
    onCalculate(){
      this.inProgress = true

      return this.updateBalances()
        .then(() => this.updateTotals(this.dstCurrency))
        .finally(() => this.inProgress = false)
    }
  },
  watch: {
    dstCurrency(){
      this.setBalanceDestinationCurrency(this.dstCurrency)
    }
  },
  mounted() {
    this.dstCurrency = this.defaultDstCurrency
  }
}
</script>

<style scoped>

</style>
