<template>
  <v-card>
    <v-toolbar flat>
      <v-toolbar-title>
        <v-icon :title="$t('transaction.gift.in')">mdi-gift</v-icon>
      </v-toolbar-title>
      <div class="flex-grow-1"></div>
      <span class="text-end">{{ ldate }}</span>
    </v-toolbar>

    <v-list>
      <v-list-item>
        <v-list-item-subtitle></v-list-item-subtitle>
        <v-list-item-subtitle class="text-right">
          <span>{{ walletName(tx.data.in.wallet) }}</span>
        </v-list-item-subtitle>
      </v-list-item>

      <!-- wallets and amount -->
      <v-list-item>
        <!-- col for OUTCOME -->
        <v-list-item-subtitle></v-list-item-subtitle>

        <!-- col for INCOME -->
        <v-list-item-subtitle class="text-right">
          <CurrencyAmount :amount="tx.data.in.amount" :currency="tx.data.in.currency"/>
        </v-list-item-subtitle>
      </v-list-item>

      <!-- fees -->
      <template v-if="tx.data.fee.length > 0">
        <v-divider></v-divider>
        <v-list-item v-for="(fee, index) in tx.data.fee" v-if="fee.amount" :key="index">
          <v-list-item-subtitle>{{ fee.comment }}</v-list-item-subtitle>
          <v-list-item-subtitle class="text-right">
            <CurrencyAmount :amount="fee.amount" :currency="fee.currency"/>
          </v-list-item-subtitle>
        </v-list-item>
      </template>

      <!-- comment -->
      <template v-if="tx.data.details.comment">
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-subtitle class="text-center">{{ tx.data.details.comment }}</v-list-item-subtitle>
        </v-list-item>
      </template>

    </v-list>

    <v-card-actions>
      <slot v-bind:tx="tx"></slot>
    </v-card-actions>
  </v-card>
</template>

<script>
import moment from 'moment'
import {mapGetters} from 'vuex';

export default {
  name: "CardGiftIn",
  props: {
    tx: {
      required: true,
      type: Object,
    }
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      wallet: 'wallets/byId'
    }),
    ldate() {
      return moment(this.date).format(this.$t('common.datetime.format.moment.datetime'))
    },
  },
  methods: {
    walletName(wId) {
      let wallet = this.wallet(wId);
      if (wallet) {
        return wallet.name
      }
      return ""
    },
  }
}
</script>

<style scoped>

</style>
