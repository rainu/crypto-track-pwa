<template>
  <v-card>
    <v-toolbar>
      <v-toolbar-title>{{currentCurrency.label}}</v-toolbar-title>
      <div class="flex-grow-1"></div>
      <CurrencyIcon :currency="{type: currency.type, name: currency.key}" :size="24"/>
    </v-toolbar>

    <v-card-actions>
      <slot></slot>
    </v-card-actions>
  </v-card>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: "CurrencyCard",
  props: {
    currency: {
      type: Object,
    },
  },
  computed: {
    ...mapGetters({
      getCurrency: 'currencies/getCurrency',
    }),
    currentCurrency(){
      return this.getCurrency(this.currency.type, this.currency.key)
    }
  }
}
</script>

<style scoped>

</style>
