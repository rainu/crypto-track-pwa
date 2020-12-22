<template>
  <v-card>
    <v-card-title>{{ $t(title) }}</v-card-title>
    <v-card-text>
      <template v-for="(curFee, i) in fees">
        <v-row>
          <v-col cols="12">
            <WalletIO :mandatory="false" :comment="true" v-model="fees[i]">
              <v-row>
                <v-col cols="9"></v-col>
                <v-col cols="3">
                  <v-btn color="warning" block v-if="fees.length > 1" @click.prevent="removeFee(i)">
                    <v-icon>remove_circle</v-icon>
                  </v-btn>
                </v-col>
              </v-row>

              <template v-slot:bottom>
                <v-row>
                  <v-col cols="12">
                    <v-checkbox v-model="fees[i].included">
                      <template v-slot:label>
                        <span v-if="fees[i].included">{{ $t('transaction.common.fee.included') }}</span>
                        <span v-else>{{ $t('transaction.common.fee.not-included') }}</span>
                      </template>
                    </v-checkbox>
                  </v-col>
                </v-row>
              </template>
            </WalletIO>
          </v-col>
        </v-row>
      </template>

      <v-row>
        <v-col cols="12">
          <v-btn color="success" block @click.prevent="addFee()">
            <v-icon>add_circle</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import {requiredIf} from 'vuelidate/lib/validators'
import WalletIO from "@/components/form/WalletIO";

export default {
  components: {WalletIO},
  props: {
    value: {
      type: Array,
      required: false,
    },
    title: {
      type: String,
    }
  },
  data() {
    let fees = [this.emptyFee()];
    if (this.value && this.value.length !== 0) {
      fees = this.value;
    }

    return {
      fees: fees,
    }
  },
  validations: {
    fees: {
      $each: {
        amount: {
          required: requiredIf('currency.name')
        },
        wallet: {
          required: requiredIf('amount')
        },
        currency: {
          name: {
            required: requiredIf(function () {
              return this.fees.amount
            })
          }
        }
      }
    }
  },
  methods: {
    addFee() {
      this.fees.push(this.emptyFee())
    },
    removeFee(index) {
      this.fees.splice(index, 1)
    },
    emptyFee() {
      return {
        amount: null,
        currency: {
          name: null,
          type: null
        },
        included: false,
        wallet: ''
      }
    },
    isEmpty(fee) {
      if (!fee) {
        return true;
      }
      if (!fee.amount) {
        return true;
      }
      if (!fee.currency) {
        return true;
      }
      if (!fee.currency.name) {
        return true;
      }
      if (!fee.currency.type) {
        return true;
      }
      if (!fee.wallet) {
        return true;
      }

      return false;
    }
  },
  watch: {
    fees() {
      this.$v.$touch();

      //emit only valid data
      if (!this.$v.fees.$error) {
        this.$emit('input', this.fees.filter(f => !this.isEmpty(f)))
      }
    }
  }
}
</script>
