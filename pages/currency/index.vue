<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="6" md="6" v-for="currency in sortedCryptoCurrencies" :key="currency.key">
        <CurrencyCard :currency="currency">
          <CurrencyActions :value="currency" />
        </CurrencyCard>
      </v-col>
    </v-row>
    <v-row v-if="sortedFiatCurrencies.length > 0">
      <v-col cols="12">
        <v-divider />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" md="6" v-for="currency in sortedFiatCurrencies" :key="currency.key">
        <CurrencyCard :currency="currency">
          <CurrencyActions :value="currency" />
        </CurrencyCard>
      </v-col>
    </v-row>

    <v-footer app class="pa-0">
      <v-toolbar dense>
        <v-toolbar-items>
          <v-btn tile class="primary" @click="onNewFiat">
            <v-icon>add_circle</v-icon>
            {{ $t('currency.new.fiat') }}
          </v-btn>
        </v-toolbar-items>
        <v-spacer />
        <v-toolbar-items>
          <v-btn tile class="primary" @click="onNewCrypto">
            <v-icon>add_circle</v-icon>
            {{ $t('currency.new.crypto') }}
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-footer>
  </v-container>
</template>

<script>
import {mapState} from "vuex";

export default {
  computed: {
    ...mapState({
      currencies: state => state.currencies.currencies,
    }),
    sortedCryptoCurrencies(){
      return Object.values(this.currencies.crypto).sort((c1, c2) => c1.label.localeCompare(c2.label))
    },
    sortedFiatCurrencies(){
      return Object.values(this.currencies.fiat).sort((c1, c2) => c1.label.localeCompare(c2.label))
    }
  },
  methods: {
    onNewFiat(){
      this.$router.push({ path: "/currency/new/fiat", query: this.$route.query })
    },
    onNewCrypto(){
      this.$router.push({ path: "/currency/new/crypto", query: this.$route.query })
    },
  }
}
</script>

<style scoped>

</style>
