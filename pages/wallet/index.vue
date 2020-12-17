<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="6" md="6" v-for="w of wallets" :key="w.id" >
        <Wallet :wallet="w" />
      </v-col>
    </v-row>
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
}
</script>

<style scoped>

</style>
