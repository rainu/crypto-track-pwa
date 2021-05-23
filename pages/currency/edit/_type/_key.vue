<template>
  <v-container fluid>
    <v-form role="form" @submit.prevent="submit">
      <v-alert type="error" dense dismissible v-if="saveError">{{ $t('currency.save-error') }}</v-alert>
      <v-alert type="success" dense dismissible v-if="saveSuccess">{{ $t('currency.edit-success') }}</v-alert>

      <v-row>
        <v-col cols="3" sm="2" md="2" >
          <v-text-field
            v-model="this.$route.params.key"
            :label="$t('currency.key')"
            readonly />
        </v-col>
        <v-col cols="6" sm="9" md="9" >
          <v-text-field
            v-model="label"
            :label="$t('currency.name')"
            :error="$v.label.$error"
            @input="$v.label.$touch()" />
        </v-col>
        <v-col cols="3" sm="1" md="1" >
          <v-text-field
            type="number"
            min="1"
            max="18"
            v-model="factor"
            :label="$t('currency.factor')"
            :error="$v.factor.$error"
            @input="$v.factor.$touch()" />
        </v-col>
      </v-row>

      <v-row v-if="isCrypto">
        <v-col cols="6" >
          <v-text-field
            v-model="crawler.coinmarketcap.id"
            :label="$t('currency.crawler.coinmarketcap.id')"
            :error="$v.crawler.coinmarketcap.id.$error"
            @input="$v.crawler.coinmarketcap.id.$touch()" />
        </v-col>
        <v-col cols="6" >
          <v-text-field
            v-model="crawler.coinmarketcap.slug"
            :label="$t('currency.crawler.coinmarketcap.slug')"
            :error="$v.crawler.coinmarketcap.slug.$error"
            @input="$v.crawler.coinmarketcap.slug.$touch()" />
        </v-col>
      </v-row>
      <template v-else>
        <v-row>
          <v-col cols="6" >
            <v-text-field
              v-model="crawler.forexsb.from"
              :label="$t('currency.crawler.forexsb.from')"
              :error="$v.crawler.forexsb.from.$error"
              @input="$v.crawler.forexsb.from.$touch()" />
          </v-col>
          <v-col cols="6" >
            <v-text-field
              v-model="crawler.forexsb.to"
              :label="$t('currency.crawler.forexsb.to')"
              :error="$v.crawler.forexsb.to.$error"
              @input="$v.crawler.forexsb.to.$touch()" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" >
            <v-text-field
              v-model="crawler.finnhub.symbol"
              :label="$t('currency.crawler.finnhub.symbol')"
              :error="$v.crawler.finnhub.symbol.$error"
              @input="$v.crawler.finnhub.symbol.$touch()" />
          </v-col>
        </v-row>
      </template>

      <v-footer app class="pa-0">
        <v-toolbar dense>
          <v-toolbar-items class="flex-grow-1"></v-toolbar-items>

          <v-toolbar-items>
            <v-btn to="/currency" color="warning" tile class="mr-2">
              <v-icon left>mdi-keyboard-backspace</v-icon>
              {{ $t('common.abort') }}
            </v-btn>
          </v-toolbar-items>
          <v-toolbar-items>
            <v-btn @click="submit" :disabled="$v.$invalid" tile color="primary">
              <v-icon left>mdi-content-save</v-icon>
              {{ $t('common.confirmation.save') }}
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
      </v-footer>
    </v-form>
  </v-container>
</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex";
import {required, requiredIf, maxValue, minValue} from "vuelidate/lib/validators";

export default {
  data() {
    return {
      currency: null,
      label: '',
      factor: 0,
      crawler: {
        coinmarketcap: {
          id: '',
          slug: ''
        },
        forexsb: {
          from: "",
          to: "",
        },
        finnhub: {
          symbol: ""
        }
      },
      saveError: false,
      saveSuccess: false
    }
  },
  validations: {
    label: {
      required,
      uniqueLabel(label) {
        for (let curCurrency of this.currencies) {
          if (curCurrency.key === this.currency.key) {
            //skip the own currency
            continue;
          }

          if (curCurrency.label === label) {
            //there is a currency with the same name!
            return false;
          }
        }
        return true
      }
    },
    factor: {
      required,
      minValue: minValue(1),
      maxValue: maxValue(18)
    },
    crawler: {
      coinmarketcap: {
        id: {
          required: requiredIf(function () {
            return this.isCrypto
          })
        },
        slug: {
          required: requiredIf(function () {
            return this.isCrypto
          })
        }
      },
      forexsb: {
        from: {
          required: requiredIf(function () {
            return !this.isCrypto
          })
        },
        to: {
          required: requiredIf(function () {
            return !this.isCrypto
          })
        },
      },
      finnhub: {
        symbol: {
          required: requiredIf(function () {
            return !this.isCrypto
          })
        }
      }
    }
  },
  computed: {
    ...mapState({
      allCurrencies: state => state.currencies.currencies,
    }),
    ...mapGetters({
      getCurrency: 'currencies/getCurrency',
    }),
    currentCurrency(){
      return this.getCurrency(this.$route.params.type, this.$route.params.key)
    },
    isCrypto() {
      return this.$route.params.type === 'crypto'
    },
    currencies(){
      return Object.values(this.allCurrencies[this.$route.params.type])
    }
  },
  methods: {
    ...mapActions({
      updateCurrency: 'currencies/updateCurrency'
    }),
    submit() {
      let currency = {
        type: this.$route.params.type,
        key: this.$route.params.key,
        label: this.label,
        factor: parseFloat(`1e-${this.factor}`),
        format: {
          numeral: `0,0.[${"0".repeat(this.factor)}]`
        },
      }

      if(this.isCrypto) {
        currency.crawler = {
          coinmarketcap: {
            id: this.crawler.coinmarketcap.id,
            slug: this.crawler.coinmarketcap.slug,
          }
        }
      } else {
        currency.crawler = {
          forexsb: {
            from: this.crawler.forexsb.from,
            to: this.crawler.forexsb.to,
          },
          finnhub: {
            symbol: this.crawler.finnhub.symbol,
          }
        }
      }

      this.updateCurrency(currency).then(() => {
        //storing was successful
        this.saveSuccess = true
      }).catch(err => {
        this.saveError = true
      })
    }
  },
  mounted() {
    this.currency = this.currentCurrency
    this.label = this.currency.label
    this.factor = Math.log10(this.currency.factor) * -1

    if(this.isCrypto) {
      this.crawler.coinmarketcap.id = this.currency.crawler.coinmarketcap.id
      this.crawler.coinmarketcap.slug = this.currency.crawler.coinmarketcap.slug
    } else {
      this.crawler.forexsb.from = this.currency.crawler.forexsb.from
      this.crawler.forexsb.to = this.currency.crawler.forexsb.to
      this.crawler.finnhub.symbol = this.currency.crawler.finnhub.symbol
    }

    this.$v.$touch();
  }
}
</script>

<style scoped>

</style>
