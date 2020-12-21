<template>
  <v-card>
    <v-card-title class="pb-1">
      <slot></slot>
    </v-card-title>
    <v-card-text>
      <v-row dense>
        <v-col cols="12" sm="4">
          <WalletChooser v-model="container.wallet" :label="$t('common.wallet')" :whitelist="[container.currency]" :error="$v.container.wallet.$error"/>
        </v-col>
        <v-col cols="12" sm="4">
          <CurrencyChooser v-model="container.currency" :label="$t('common.currency')" :whitelist="currencyWhitelist" :error="$v.container.currency.$error"/>
        </v-col>
        <v-col cols="12" sm="4">
          <input-number v-model="container.amount" :label="$t('common.amount')" :number-format="numberFormat" :error="$v.container.amount.$error" ></input-number>
        </v-col>
      </v-row>

      <v-row dense v-if="comment">
        <v-col cols="12">
          <v-text-field :label="$t('common.comment')" v-model="container.comment"/>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import {mapGetters, mapState} from 'vuex';
import {minValue, requiredIf} from 'vuelidate/lib/validators'
import CurrencyChooser from "@/components/form/CurrencyChooser";
import InputNumber from "@/components/form/InputNumber";
import WalletChooser from "@/components/form/WalletChooser";

export default {
  name: "WalletIO",
  components: {WalletChooser, InputNumber, CurrencyChooser},
  props: {
    value: {
      type: Object,
      required: false,
      default() {
        return {
          amount: null,
          currency: {
            name: null,
            type: null
          },
          wallet: '',
          comment: ''
        }
      }
    },
    comment: {
      type: Boolean,
      required: false,
      default: false
    },
    mandatory: {
      type: Boolean,
      required: false,
      default: true,
    }
  },
  validations: {
    container: {
      amount: {
        mandatory: function (value) {
          if (this.mandatory && (value === null || value === 0)) {
            return false;
          }

          return true;
        },
        required1: requiredIf(function () {
          return this.container.currency && this.container.currency.name
        }),
        required2: requiredIf(function () {
          return this.container.wallet
        }),
        minValue: minValue(0),
      },
      wallet: {
        mandatory(value) {
          if (this.mandatory && (value === null || value === "")) {
            return false;
          }

          return true;
        },
        required1: requiredIf(function () {
          return this.container.currency && this.container.currency.name
        }),
        required2: requiredIf(function () {
          return this.container.amount
        }),
      },
      currency: {
        name: {
          mandatory(value) {
            if (this.mandatory && (value === null || value === "")) {
              return false;
            }

            return true;
          },
          required1: requiredIf(function () {
            return this.container.amount
          }),
          required2: requiredIf(function () {
            return this.container.wallet
          })
        },
        type: {
          mandatory(value) {
            if (this.mandatory && (value === null || value === "")) {
              return false;
            }

            return true;
          },
          required1: requiredIf(function () {
            return this.container.amount
          }),
          required2: requiredIf(function () {
            return this.container.wallet
          })
        }
      },
    }
  },
  data() {
    return {
      container: {
        ...this.value
      }
    }
  },
  computed: {
    ...mapGetters({
      getWalletById: 'wallets/byId'
    }),
    ...mapState({
      currencies: state => state.currencies.currencies,
    }),
    numberFormat() {
      if (this.container.currency && this.container.currency.name && this.container.currency.type) {
        return this.currencies[this.container.currency.type][this.container.currency.name].format.numeral
      }
      return null
    },
    currencyWhitelist() {
      if (!this.container.wallet) {
        return []
      }
      const wallet = this.getWalletById(this.container.wallet)
      return wallet.currencies
    }
  },
  watch: {
    value: {
      handler() {
        this.container = this.value
      },
      deep: true
    },
    container: {
      handler() {
        this.$v.$touch();

        //emit only valid data
        if (!this.$v.container.$error) {
          this.$emit('input', this.container)
        }
      },
      deep: true
    }
  }
}
</script>

<style scoped>

</style>
