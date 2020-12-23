<template>
  <v-container fluid>
    <v-alert type="error" dense dismissible v-if="saveError">{{ $t('transaction.common.save-error') }}</v-alert>
    <v-alert type="success" dense dismissible v-if="saveSuccess">{{ $t('transaction.edit-success') }}</v-alert>

    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>{{ $t('transaction.common.head') }}</v-card-title>

          <v-card-text class="pb-0">
            <v-row>
              <v-col cols="12" sm="6">
                <v-select v-model="type"
                          :label="$t('transaction.common.type')"
                          :items="items"
                          item-value="value"
                          item-disabled="disabled">

                  <template v-slot:selection="data">
                    <v-list-item dense>
                      <v-list-item-title>{{ $t(data.item.text) }}</v-list-item-title>
                    </v-list-item>
                  </template>

                  <template v-slot:item="data">
                    <v-list-item v-if="data.item.type === 'item'" dense>
                      <v-list-item-icon>{{ data.item.sign }}</v-list-item-icon>
                      <v-list-item-title>{{ $t(data.item.text) }}</v-list-item-title>
                    </v-list-item>
                    <v-list-item v-if="data.item.type === 'group'" dense>
                      <v-list-item-icon v-if="data.item.text">{{ $t(data.item.text) }}</v-list-item-icon>
                      <v-list-item-title>
                        <v-divider></v-divider>
                      </v-list-item-title>
                    </v-list-item>
                  </template>
                </v-select>
              </v-col>

              <v-col cols="12" sm="6">
                <DateTimePicker v-model="date" @input="$v.date.$touch()" :error="$v.date.$error"/>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <Donation v-if="type === 'donation'" v-model="container.donation" class="pt-0"></Donation>
      <Exchange v-else-if="type === 'exchange'" v-model="container.exchange" class="pt-0"></Exchange>
      <GiftIn v-else-if="type === 'giftIn'" v-model="container.giftIn" class="pt-0"></GiftIn>
      <GiftOut v-else-if="type === 'giftOut'" v-model="container.giftOut" class="pt-0"></GiftOut>
      <Income v-else-if="type === 'income'" v-model="container.income" class="pt-0"></Income>
      <Lost v-else-if="type === 'lost'" v-model="container.lost" class="pt-0"></Lost>
      <Spent v-else-if="type === 'spent'" v-model="container.spent" class="pt-0"></Spent>
      <Stolen v-else-if="type === 'stolen'" v-model="container.stolen" class="pt-0"></Stolen>
      <Transfer v-else-if="type === 'transfer'" v-model="container.transfer" class="pt-0"></Transfer>
    </v-row>

    <v-footer app class="pa-0">
      <v-toolbar dense>
        <v-toolbar-items class="flex-grow-1"></v-toolbar-items>

        <v-toolbar-items>
          <v-btn to="/transaction" tile color="warning" class="mr-2">
            <v-icon left>mdi-keyboard-backspace</v-icon>
            {{ $t('common.back') }}
          </v-btn>
          <v-btn @click="submit" :disabled="$v.$invalid" tile color="primary">
            <v-icon left>mdi-content-save</v-icon>
            {{ $t('common.confirmation.save') }}
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-footer>
  </v-container>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import {required, requiredIf, minValue} from 'vuelidate/lib/validators'

import DateTimePicker from "@/components/form/DateTimePicker";
import Exchange from "@/components/form/transaction/Exchange";
import Transfer from "@/components/form/transaction/Transfer";
import Donation from "@/components/form/transaction/Donation";
import GiftIn from "@/components/form/transaction/GiftIn";
import GiftOut from "@/components/form/transaction/GiftOut";
import Income from "@/components/form/transaction/Income";
import Lost from "@/components/form/transaction/Lost";
import Spent from "@/components/form/transaction/Spent";
import Stolen from "@/components/form/transaction/Stolen";

export default {
  components: { Stolen, Spent, Lost, Income, GiftOut, GiftIn, Donation, Transfer, Exchange, DateTimePicker },
  data() {
    return {

      items: [
        {type: 'item', sign: '<->', text: 'transaction.exchange.title', value: 'exchange'},
        {type: 'group', text: 'transaction.type.in', disabled: true},
        {type: 'item', sign: '->', text: 'transaction.income.title', value: 'income'},
        {type: 'item', sign: '->', text: 'transaction.gift.title', value: 'giftIn'},
        {type: 'group', text: 'transaction.type.out', disabled: true},
        {type: 'item', sign: '<-', text: 'transaction.spent.title', value: 'spent'},
        {type: 'item', sign: '<-', text: 'transaction.gift.title', value: 'giftOut'},
        {type: 'item', sign: '<-', text: 'transaction.donation.title', value: 'donation'},
        {type: 'item', sign: '<-', text: 'transaction.lost.title', value: 'lost'},
        {type: 'item', sign: '<-', text: 'transaction.stolen.title', value: 'stolen'},
        {type: 'group', disabled: true},
        {type: 'item', sign: '<->', text: 'transaction.transfer.title', value: 'transfer'},
      ],

      transaction: null,
      date: new Date(),
      type: '',
      container: {
        donation: null,
        giftIn: null,
        giftOut: null,
        income: null,
        spent: null,
        lost: null,
        stolen: null,
        exchange: null,
        transfer: null,
      },
      saveError: false,
      saveSuccess: false
    }
  },
  validations: {
    date: {
      //bitcoin birthday :) (before that date - there was no cryptocurrency)
      minValue: minValue(new Date('2009-01-03T12:00:00Z')),
      required
    },
    container: {
      donation: { required: requiredIf(function() { return this.type === 'donation' }) },
      giftIn: { required: requiredIf(function() { return this.type === 'giftIn' }) },
      giftOut: { required: requiredIf(function() { return this.type === 'giftOut' }) },
      income: { required: requiredIf(function() { return this.type === 'income' }) },
      spent: { required: requiredIf(function() { return this.type === 'spent' }) },
      lost: { required: requiredIf(function() { return this.type === 'lost' }) },
      stolen: { required: requiredIf(function() { return this.type === 'stolen' }) },
      exchange: { required: requiredIf(function() { return this.type === 'exchange' }) },
      transfer: { required: requiredIf(function() { return this.type === 'transfer' }) },
      required
    }
  },
  computed: {
    ...mapGetters({
      transactionById: 'transactions/byId'
    }),
  },
  methods: {
    ...mapActions({
      storeTransaction: 'transactions/saveTransaction'
    }),
    submit() {
      //we have to inline the container fields
      let date = this.date;
      let type = this.type;
      let container = this.container[type];

      let payload = {
        id: this.transaction.id,
        date,
        type,
        involvedWallets: container.involvedWallets,
        involvedCurrencies: container.involvedCurrencies,
        data: container.data
      }
      delete payload.data.involvedWallets
      delete payload.data.involvedCurrencies

      this.storeTransaction(payload).then(() => {
        //storing was successful
        this.saveSuccess = true
      }).catch(err => {
        this.saveError = true
      })
    }
  },
  mounted() {
    this.transaction = this.transactionById(this.$route.params.id)
    this.date = new Date(this.transaction.date)
    this.type = this.transaction.type

    this.container[this.type] = {
      //make sure to COPY the data, to prevent direct data-changes
      //(it should only apply after submit the form)
      data: {...this.transaction.data}
    }

    this.$v.container.$touch()
  },
  watch: {
    container: {
      handler() {
        this.$v.date.$touch()
      },
      deep: true,
    }
  }
}
</script>

<style scoped>

</style>
