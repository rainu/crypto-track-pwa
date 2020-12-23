<template>
  <v-container fluid>
    <v-form @submit.prevent="submit">
      <v-alert type="error" dense dismissible v-if="saveError">{{ $t('wallet.save-error') }}</v-alert>

      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="displayName"
            :label="$t('wallet.name')"
            :error="$v.displayName.$error"
            @input="$v.displayName.$touch()" />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="address"
            :label="$t('wallet.address')"
            :error="$v.address.$error"
            @input="$v.address.$touch()" />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <CurrencySelect
            v-model="currencies"
            :label="$t('wallet.currency')"
            :error="$v.currencies.$error"
            @input="$v.currencies.$touch()" />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-textarea
            v-model="comment"
            rows="3"
            :label="$t('wallet.comment')"
            :error="$v.comment.$error"
            @input="$v.comment.$touch()" />
        </v-col>
      </v-row>

      <v-footer app class="pa-0">
        <v-toolbar dense>
          <v-toolbar-items class="flex-grow-1"></v-toolbar-items>

          <v-toolbar-items>
            <v-btn to="/wallet" color="warning" tile class="mr-2">
              <v-icon left>mdi-keyboard-backspace</v-icon>
              {{ $t('common.back') }}
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
import {mapActions, mapState} from 'vuex'
import {required, minLength} from 'vuelidate/lib/validators'
import CurrencySelect from "@/components/form/CurrencySelect";
import {v4 as uuid4} from "uuid";

export default {
  components: {CurrencySelect},
  data() {
    return {
      address: '',
      currencies: [],
      displayName: '',
      comment: '',
      saveError: false
    }
  },
  validations: {
    address: {
      required,
      uniqueAddress(address) {
        for (let curWallet of this.wallets) {
          if (curWallet.address === address) {
            //there is a wallet with the same address!
            return false;
          }
        }
        return true
      }
    },
    currencies: {
      required,
      minLength: minLength(1)
    },
    displayName: {
      required,
      uniqueName(name) {
        for (let curWallet of this.wallets) {
          if (curWallet.name === name) {
            //there is a wallet with the same name!
            return false;
          }
        }
        return true
      }
    },
    comment: {}
  },
  computed: {
    ...mapState({
      wallets: state => state.wallets.wallets,
    })
  },
  methods: {
    ...mapActions({
      storeNewWallet: 'wallets/addWallet'
    }),
    submit() {
      let wallet = {
        id: uuid4(),
        address: this.address,
        name: this.displayName,
        currencies: this.currencies,
        description: this.comment
      };
      this.storeNewWallet(wallet).then(() => {
        //storing was successful
        this.$router.push({path: "/wallet"})
      }).catch(err => {
        this.saveError = true
      })
    }
  },
  mounted() {
    this.$v.$touch();
  }
}
</script>
