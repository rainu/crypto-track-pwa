<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="6" md="6" v-for="w of wallets" :key="w.id" >
        <Wallet :wallet="w" />
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
import {mapState, mapActions} from 'vuex';
import Wallet from "~/components/Wallet";

export default {
  components: {Wallet},
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
