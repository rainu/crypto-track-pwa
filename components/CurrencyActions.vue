<template>
  <v-row dense>
    <v-dialog v-model="showDelete">
      <v-card>
        <v-card-title>{{ $t('currency.delete-question.title') }}</v-card-title>
        <v-card-text>
          <v-row dense>
            <v-col cols="3">{{ $t('currency.delete-question.label') }}</v-col>
            <v-col cols="9">{{ value.label }}</v-col>
          </v-row>
          <v-row dense>
            <v-col cols="3">{{ $t('currency.delete-question.name') }}</v-col>
            <v-col cols="9">{{ value.key }}</v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-row dense>
            <v-col cols="6">
              <v-btn small tile block @click="cancelDeletion">
                <v-icon small>mdi-undo-variant</v-icon>
                {{ $t('common.abort') }}
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn small tile block color="warning" @click="confirmDeletion">
                <v-icon small>mdi-delete</v-icon>
                {{ $t('common.ok') }}
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-col cols="6">
      <v-btn small tile block color="warning" @click="requestDeleteCurrency" v-if="!isInUse">
        <v-icon small>mdi-delete</v-icon>
        {{ $t('common.delete') }}
      </v-btn>
    </v-col>
    <v-col cols="6">
      <v-btn small tile block color="primary" @click="editCurrency">
        <v-icon small>mdi-border-color</v-icon>
        {{ $t('common.edit') }}
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import {mapActions, mapGetters, mapState} from 'vuex'

export default {
  name: "CurrencyActions",
  props: {
    value: {
      required: true,
      type: Object,
    }
  },
  data() {
    return {
      showDelete: false,
    }
  },
  computed: {
    ...mapState({
      wallets: state => state.wallets.wallets,
    }),
    ...mapGetters({
      involvedCurrencies: 'transactions/involvedCurrencies'
    }),
    isInUse(){
      let txCurrencies = this.involvedCurrencies()
        .filter(c => c.type === this.value.type && c.name === this.value.key)
        .length > 0

      let wCurrencies = this.wallets.map(w => w.currencies).flat()
        .filter(c => c.type === this.value.type && c.name === this.value.key)
        .length > 0

      return txCurrencies || wCurrencies
    }
  },
  methods: {
    ...mapActions({
      deleteCurrency: 'currencies/deleteCurrency'
    }),
    requestDeleteCurrency() {
      this.showDelete = true
    },
    confirmDeletion() {
      this.showDelete = false
      this.deleteCurrency({type: this.value.type, name: this.value.key})
    },
    cancelDeletion() {
      this.showDelete = false
    },
    editCurrency() {
      this.$router.push({path: `/currency/edit/${this.value.type}/${this.value.key}`})
    }
  }
}
</script>

<style scoped>

</style>
