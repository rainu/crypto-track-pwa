<template>
  <v-card>
    <v-toolbar flat>
      <v-toolbar-title>
        <v-icon :title="$t('transaction.stolen.title')">mdi-eye</v-icon>
      </v-toolbar-title>
      <div class="flex-grow-1"></div>
      <span class="text-end">{{ldate(tx.date)}}</span>
    </v-toolbar>

    <v-list>
      <v-list-item>
        <v-list-item-subtitle>
          <span>{{walletName(tx.data.out.wallet)}}</span>
        </v-list-item-subtitle>
        <v-list-item-subtitle></v-list-item-subtitle>
      </v-list-item>

      <!-- wallets and amount -->
      <v-list-item>
        <!-- col for OUTCOME -->
        <v-list-item-subtitle>
          <CurrencyAmount :amount="tx.data.out.amount" :currency="tx.data.out.currency" />
        </v-list-item-subtitle>

        <!-- col for INCOME -->
        <v-list-item-subtitle></v-list-item-subtitle>
      </v-list-item>

      <!-- no fees -->

      <!-- comment -->
      <template v-if="tx.data.details.comment">
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-subtitle class="text-center">{{tx.data.details.comment}}</v-list-item-subtitle>
        </v-list-item>
      </template>

    </v-list>
  </v-card>
</template>

<script>
  import moment from 'moment'
  import { mapGetters } from 'vuex';

  export default {
    name: "CardStolen",
    props:{
      tx: {
        required: true,
        type: Object,
      }
    },
    data(){
      return {
      }
    },
    computed: {
      ...mapGetters({
        wallet: 'wallets/byId'
      }),
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
        return moment(date).format(this.$t('common.datetime.format.datetime'))
      },
    }
  }
</script>

<style scoped>
  hr {
    margin-top: 10px;
    margin-bottom: 10px;
  }
</style>
