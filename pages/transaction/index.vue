<template>
  <v-container fluid>
    <v-row v-for="tx in transactionView" :key="tx.id">
      <v-col cols="12" >
        <card-donation v-if="tx.type === 'donation'" :tx="tx"><TransactionActions slot-scope="{tx}" :value="tx" /></card-donation>
        <card-exchange v-else-if="tx.type === 'exchange'" :tx="tx"><TransactionActions slot-scope="{tx}" :value="tx" /></card-exchange>
        <card-gift-in v-else-if="tx.type === 'giftIn'" :tx="tx"><TransactionActions slot-scope="{tx}" :value="tx" /></card-gift-in>
        <card-gift-out v-else-if="tx.type === 'giftOut'" :tx="tx"><TransactionActions slot-scope="{tx}" :value="tx" /></card-gift-out>
        <card-income v-else-if="tx.type === 'income'" :tx="tx"><TransactionActions slot-scope="{tx}" :value="tx" /></card-income>
        <card-lost v-else-if="tx.type === 'lost'" :tx="tx"><TransactionActions slot-scope="{tx}" :value="tx" /></card-lost>
        <card-spent v-else-if="tx.type === 'spent'" :tx="tx"><TransactionActions slot-scope="{tx}" :value="tx" /></card-spent>
        <card-stolen v-else-if="tx.type === 'stolen'" :tx="tx"><TransactionActions slot-scope="{tx}" :value="tx" /></card-stolen>
        <card-transfer v-else-if="tx.type === 'transfer'" :tx="tx"><TransactionActions slot-scope="{tx}" :value="tx" /></card-transfer>
      </v-col>
    </v-row>

    <infinite-loading @infinite="infiniteHandler">
      <span slot="spinner"></span>
      <span slot="no-more"></span>
      <span slot="no-results"></span>
    </infinite-loading>

    <v-footer app class="pa-0">
      <v-toolbar dense>
        <v-toolbar-items>
          <v-btn icon v-if="transactionView.length < transactions.length" @click="onLoadAll">
            <v-icon>mdi-autorenew</v-icon>
          </v-btn>
        </v-toolbar-items>

        <v-toolbar-title>
          <span>{{ transactionView.length }}</span> /
          <span>{{ transactions.length }}</span>
        </v-toolbar-title>

        <v-toolbar-items>
          <v-btn icon @click="sortByDateDesc = !sortByDateDesc">
            <v-icon v-if="sortByDateDesc">mdi-sort-descending</v-icon>
            <v-icon v-else>mdi-sort-ascending</v-icon>
          </v-btn>
        </v-toolbar-items>

        <v-toolbar-items class="flex-grow-1"></v-toolbar-items>

        <v-toolbar-items>
          <v-btn tile class="primary" @click="onNewTransaction">
            <v-icon>add_circle</v-icon>
            {{ $t('common.new') }}
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-footer>
  </v-container>
</template>

<script>
import * as dateFN from 'date-fns'
import { mapState, mapGetters } from 'vuex';
import InfiniteLoading from 'vue-infinite-loading';
import CardExchange from "@/components/transaction/CardExchange";
import CardDonation from "@/components/transaction/CardDonation";
import CardGiftIn from "@/components/transaction/CardGiftIn";
import CardGiftOut from "@/components/transaction/CardGiftOut";
import CardIncome from "@/components/transaction/CardIncome";
import CardLost from "@/components/transaction/CardLost";
import CardSpent from "@/components/transaction/CardSpent";
import CardStolen from "@/components/transaction/CardStolen";
import CardTransfer from "@/components/transaction/CardTransfer";
import TransactionActions from "@/components/transaction/Actions";

export default {
  components: { TransactionActions, InfiniteLoading, CardTransfer, CardStolen, CardSpent, CardLost, CardIncome, CardGiftOut, CardGiftIn, CardDonation, CardExchange },
  data(){
    return {
      deleteRequest: null,
      maxItems: 0,
      sortByDateDesc: true
    }
  },
  computed: {
    ...mapState({
      transactions: state => state.transactions.transactions,
      pageSize: state => state.settings.paging.transaction,
    }),
    ...mapGetters({
      wallet: 'wallets/byId'
    }),
    transactionSorted(){
      let tx = [...this.transactions]

      const sortFactor = this.sortByDateDesc ? -1 : 1
      tx.sort((a, b) => (new Date(a.date) - new Date(b.date)) * sortFactor)

      return tx
    },
    transactionView(){
      return this.transactionSorted.slice(0, this.maxItems)
    }
  },
  methods: {
    walletName(wId) {
      let wallet = this.wallet(wId);
      if (wallet) {
        return wallet.name
      }
      return ""
    },
    ldate(date){
      return dateFN.format(date, this.$t('common.datetime.format.datetime'))
    },
    infiniteHandler($state){
      this.maxItems += this.pageSize

      if(this.maxItems >= this.transactionSorted.length) {
        $state.complete()
      } else {
        $state.loaded()
      }
    },
    onLoadAll(){
      this.maxItems = this.transactions.length
    },
    onNewTransaction(){
      this.$router.push({ path: "/transaction/new", query: this.$route.query })
    },
  },
  mounted() {
    this.maxItems = this.pageSize
  }
}
</script>

<style scoped>
</style>
