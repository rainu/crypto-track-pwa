<template>
  <v-container fluid>
    <v-form role="form" @submit.prevent="submit">
      <v-alert type="error" dense dismissible v-if="saveError">{{ $t('wallet.save-error') }}</v-alert>
      <v-alert type="success" dense dismissible v-if="saveSuccess">{{ $t('wallet.edit-success') }}</v-alert>

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
import {mapActions, mapGetters, mapState} from 'vuex'
import {required, minLength} from 'vuelidate/lib/validators'
import CurrencySelect from "@/components/form/CurrencySelect";

export default {
  components: {CurrencySelect},
  data() {
    return {
      wallet: null,
      address: '',
      currencies: [],
      displayName: '',
      comment: '',
      saveError: false,
      saveSuccess: false
    }
  },
  validations: {
    address: {
      required,
      uniqueAddress(address) {
        for (let curWallet of this.wallets) {
          if (curWallet.id === this.wallet.id) {
            //skip the own wallet
            continue;
          }

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
          if (curWallet.id === this.wallet.id) {
            //skip the own wallet
            continue;
          }

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
    }),
    ...mapGetters({
      walletById: 'wallets/byId'
    }),
  },
  methods: {
    ...mapActions({
      storeWallet: 'wallets/saveWallet'
    }),
    submit() {
      let wallet = {
        id: this.wallet.id,
        address: this.address,
        name: this.displayName,
        currencies: this.currencies,
        description: this.comment
      };
      this.storeWallet(wallet).then(() => {
        //storing was successful
        this.saveSuccess = true
      }).catch(err => {
        this.saveError = true
      })
    }
  },
  mounted() {
    this.wallet = this.walletById(this.$route.params.id)
    this.address = this.wallet.address
    this.currencies = this.wallet.currencies
    this.displayName = this.wallet.name
    this.comment = this.wallet.description

    this.$v.$touch();
  }
}
</script>
