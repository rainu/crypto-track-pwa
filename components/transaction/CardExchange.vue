<template>
  <v-card>
    <v-toolbar flat>
      <v-toolbar-title>
        <v-icon :title="$t('transaction.exchange.title')">mdi-cart-outline</v-icon>
      </v-toolbar-title>
      <div class="flex-grow-1"></div>
      <span class="text-end">{{ldate(tx.date)}}</span>
    </v-toolbar>

    <v-list>
      <v-list-item>
        <v-list-item-subtitle>
          <span>{{walletName(tx.data.out.wallet)}}</span>
        </v-list-item-subtitle>
        <v-list-item-icon></v-list-item-icon>
        <v-list-item-subtitle class="text-right">
          <span>{{walletName(tx.data.in.wallet)}}</span>
        </v-list-item-subtitle>
      </v-list-item>

      <!-- wallets and amount -->
      <v-list-item>
        <!-- col for OUTCOME -->
        <v-list-item-subtitle>
          <CurrencyAmount :amount="tx.data.out.amount" :currency="tx.data.out.currency" />
        </v-list-item-subtitle>

        <v-list-item-icon><v-icon>mdi-arrow-right</v-icon></v-list-item-icon>

        <!-- col for INCOME -->
        <v-list-item-subtitle class="text-right">
          <CurrencyAmount :amount="tx.data.in.amount" :currency="tx.data.in.currency" />
        </v-list-item-subtitle>
      </v-list-item>

      <!-- fees -->
      <template v-if="tx.data.fee.length > 0">
        <v-divider></v-divider>
        <v-list-item v-for="fee in tx.data.fee" v-if="fee.amount">
          <v-list-item-subtitle>{{fee.comment}}</v-list-item-subtitle>
          <v-list-item-subtitle class="text-right">
            <CurrencyAmount :amount="fee.amount" :currency="fee.currency" />
          </v-list-item-subtitle>
        </v-list-item>
      </template>

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
    name: "CardExchange",
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
        return moment(date).format(this.$t('common.datetime.format'))
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
