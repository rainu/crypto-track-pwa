<template>
  <v-container fluid>
    <v-row>
      <v-col cols="6" sm="4">
        <CardTotalCoins />
      </v-col>
      <v-col cols="6" sm="4">
        <CardTotalCurrency :currency="defaultDstCurrency" />
      </v-col>
      <v-col cols="6" sm="4">
        <CardTotalValue :currency="defaultDstCurrency" />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <SettingsRealtimeRecalculation />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="6">
        <BalanceChart :currency="defaultDstCurrency" />
      </v-col>
      <v-col cols="12" sm="6">
      </v-col>
    </v-row>

    <BalanceHistoryChart>
      <BalancesCalculator />
    </BalanceHistoryChart>
  </v-container>
</template>

<script>
import BalancesCalculator from "@/components/BalancesCalculator";
import SettingsRealtimeRecalculation from "@/components/settings/RealtimeRecalculation";
import CardTotalCoins from "@/components/chart/CardTotalCoins";
import CardTotalCurrency from "@/components/chart/CardTotalCurrency";
import {mapState} from "vuex";
import CardTotalValue from "@/components/chart/CardTotalValue";
import BalanceChart from "@/components/chart/BalanceChart";
import BalanceHistoryChart from "@/components/chart/BalanceHistoryChart";

export default {
  components: {BalanceHistoryChart, BalanceChart, CardTotalValue, CardTotalCurrency, CardTotalCoins, SettingsRealtimeRecalculation, BalancesCalculator},
  computed: {
    ...mapState({
      defaultDstCurrency: state => state.settings.balances.dstCurrency,
    }),
  }
}
</script>
