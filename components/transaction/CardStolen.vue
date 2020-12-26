<template>
  <v-card>
    <v-toolbar flat>
      <v-toolbar-title>
        <v-icon :title="$t('transaction.stolen.title')">mdi-eye</v-icon>
      </v-toolbar-title>
      <div class="flex-grow-1"></div>
      <span class="text-end">{{ ldate }}</span>
    </v-toolbar>

    <v-list>
      <v-list-item>
        <v-list-item-subtitle>
          <span>{{ walletName(tx.data.out.wallet) }}</span>
        </v-list-item-subtitle>
        <v-list-item-subtitle></v-list-item-subtitle>
      </v-list-item>

      <!-- wallets and amount -->
      <v-list-item>
        <!-- col for OUTCOME -->
        <v-list-item-subtitle>
          <CurrencyAmount :amount="tx.data.out.amount" :currency="tx.data.out.currency"/>
        </v-list-item-subtitle>

        <!-- col for INCOME -->
        <v-list-item-subtitle></v-list-item-subtitle>
      </v-list-item>

      <!-- no fees -->

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
import * as dateFN from 'date-fns'
import {mapGetters} from 'vuex';
import CurrencyAmount from "@/components/CurrencyAmount";

export default {
  name: "CardStolen",
  components: {CurrencyAmount},
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
      return dateFN.format(dateFN.parseISO(this.tx.date), this.$t('common.datetime.format.datetime'))
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
