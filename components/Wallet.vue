<template>
  <v-card>
    <v-card-title>{{ wallet.name }}</v-card-title>
    <v-card-subtitle v-html="shyWalletAddress"></v-card-subtitle>

    <v-divider></v-divider>

    <v-list>
      <v-list-item v-for="balance of balances" :key="balance.currency.type + '_' + balance.currency.name">
        <v-list-item-title>{{balance.currency.name}}</v-list-item-title>
        <v-list-item-subtitle class="text-right">
          <CurrencyAmount :amount="balance.amount" :currency="balance.currency" />
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>

    <v-card-actions>
      <slot></slot>
    </v-card-actions>
  </v-card>
</template>

<script>
import CurrencyAmount from "@/components/CurrencyAmount";
export default {
  name: "Wallet",
  components: {CurrencyAmount},
  props: {
    wallet: {
      type: Object,
      required: true,
    },
  },
  computed: {
    shyWalletAddress(){
      if(!this.wallet.address) return "";

      let split = this.wallet.address.split('');
      let shy = ""
      for(let i = 0; i < split.length; i++) {
        shy += split[i];
        if(i !== 0 && i % 12 === 0) {
          shy += '<wbr>'
        }
      }

      return shy;
    },
    balances() {
      return this.$store.getters['wallets/balances'](this.wallet.id);
    },
  }
}
</script>

<style scoped>

</style>
