<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="6" md="6" v-for="w in wallets" :key="w.id" >
        <Wallet :wallet="w"><WalletActions :value="w" /></Wallet>
      </v-col>
    </v-row>

    <v-footer app class="pa-0">
      <v-toolbar dense>
        <v-toolbar-items class="flex-grow-1"></v-toolbar-items>

        <v-toolbar-items>
          <v-btn tile class="primary" @click="onNewWallet">
            <v-icon>add_circle</v-icon>
            {{ $t('common.new') }}
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-footer>
  </v-container>
</template>

<script>
import {mapState} from 'vuex';
import Wallet from "~/components/Wallet";
import WalletActions from "@/components/WalletActions";

export default {
  components: {WalletActions, Wallet},
  computed: {
    ...mapState({
      wallets: state => state.wallets.wallets,
    })
  },
  methods: {
    onNewWallet(){
      this.$router.push({ path: "/wallet/new", query: this.$route.query })
    },
  }
}
</script>

<style scoped>

</style>
