<template>
  <v-container fluid>
    <!-- row for income info -->
    <v-row>
      <!-- income info -->
      <v-col cols="12" lg="6">
        <WalletIO v-model="data.in">{{ $t('transaction.income.in') }}</WalletIO>
      </v-col>

      <!-- fee info -->
      <v-col cols="12">
        <fees v-model="data.fee" :title="'transaction.income.fee'"/>
      </v-col>
    </v-row>

    <!-- row for exchangerates -->
    <v-row>
      <v-col cols="12">
        <ExchangeRates :currencies="involvedCurrencies" v-model="data.exchangeRates">
          {{ $t('transaction.income.exchangerates.title') }}
        </ExchangeRates>
      </v-col>
    </v-row>

    <!-- row for detail info -->
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>{{ $t('transaction.common.details.title') }}</v-card-title>
          <v-card-text>
            <v-row dense>
              <v-col cols="12">
                <v-text-field
                  v-model="data.details.exchange"
                  :label="$t('transaction.common.details.exchange')"
                  :error="$v.data.details.exchange.$error"
                />
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="12">
                <v-text-field
                  v-model="data.details.group"
                  :label="$t('transaction.common.details.group')"
                  :error="$v.data.details.group.$error"
                />
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="12">
                <v-text-field
                  v-model="data.details.comment"
                  :label="$t('transaction.common.details.comment')"
                  :error="$v.data.details.comment.$error"
                />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {required, minValue} from 'vuelidate/lib/validators'
import ExchangeRates from './ExchangeRates'
import Fees from './Fees'
import {uniq} from '@/functions/currencies'
import WalletIO from "@/components/form/WalletIO";

export default {
  components: {
    WalletIO, ExchangeRates, Fees
  },
  props: {
    value: {
      default: null,
      required: false
    }
  },
  data() {
    if (this.value) {
      return {
        data: this.value.data
      }
    }

    return {
      data: {
        in: {
          amount: null,
          currency: {
            name: null,
            type: null
          },
          wallet: '',
        },
        fee: [],
        exchangeRates: [],
        details: {
          exchange: '',
          group: '',
          comment: ''
        }
      }
    }
  },
  validations: {
    data: {
      in: {
        amount: {
          required,
          minValue: minValue(0),
        },
        wallet: {
          required,
        },
        currency: {
          name: {
            required
          },
          type: {
            required
          }
        },
      },
      details: {
        exchange: {},
        group: {},
        comment: {}
      }
    }
  },
  computed: {
    involvedCurrencies() {
      let currencies = []

      if (this.data.in.currency.name) {
        currencies.push(this.data.in.currency)
      }
      for (let curFee of this.data.fee) {
        if (curFee.currency && curFee.currency.name) {
          currencies.push(curFee.currency)
        }
      }

      return currencies;
    }
  },
  watch: {
    data: {
      handler() {
        this.$v.$touch();

        //emit only valid data
        if (!this.$v.data.$error) {
          this.$emit('input', {
            involvedWallets: [...new Set([
              this.data.in.wallet,
              ...this.data.fee.map(f => f.wallet),
            ].filter(i => i))],
            involvedCurrencies: uniq([
              this.data.in.currency,
              ...this.data.fee.map(f => f.currency)
            ]),
            data: this.data,
          })
        }
      },
      deep: true,
    }
  }
}
</script>

<style scoped>

</style>
