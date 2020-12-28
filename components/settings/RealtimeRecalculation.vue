<template>
  <v-card>
    <v-card-text>
      <v-switch v-model="recalcModeSwitch" :label="$t('settings.realtime-calculation')"></v-switch>
    </v-card-text>
  </v-card>
</template>

<script>
  import { mapActions, mapState } from 'vuex';

  export default {
    name: "SettingsRealtimeRecalculation",
    data(){
      return {
        recalcModeSwitch: true
      }
    },
    computed: {
      ...mapState({
        realtimeRecalculation: state => state.settings.balances.realtimeRecalculation,
      })
    },
    methods: {
      ...mapActions({
        setBalanceRealtimeRecalculation: 'settings/setBalanceRealtimeRecalculation'
      })
    },
    watch: {
      recalcModeSwitch(value){
        this.setBalanceRealtimeRecalculation(value)
      }
    },
    mounted() {
      this.recalcModeSwitch = this.realtimeRecalculation
    }
  }
</script>

<style scoped>

</style>
