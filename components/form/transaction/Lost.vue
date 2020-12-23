<template>
  <v-container fluid>
    <!-- row for lost info -->
    <v-row>
      <!-- lost info -->
      <v-col cols="12">
        <WalletIO v-model="data.out">{{ $t('transaction.lost.out') }}</WalletIO>
      </v-col>

    </v-row>

    <!-- row for exchangerates -->
    <v-row>
      <v-col cols="12">
        <ExchangeRates :currencies="involvedCurrencies" v-model="data.exchangeRates">
          {{ $t('transaction.lost.exchangerates.title') }}
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
import WalletIO from "@/components/form/WalletIO";

export default {
  components: {
    WalletIO, ExchangeRates
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
        out: {
          amount: null,
          currency: {
            name: null,
            type: null
          },
          wallet: '',
        },
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
      out: {
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

      if (this.data.out.currency.name) {
        currencies.push(this.data.out.currency)
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
            involvedWallets: [this.data.out.wallet],
            involvedCurrencies: [this.data.out.currency],
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
