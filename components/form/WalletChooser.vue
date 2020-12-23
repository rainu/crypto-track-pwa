<template>
  <v-autocomplete
    :label="label"
    :items="items"
    :value="selectedWallet"
    :error="error"
    item-text="label"
    item-value="value"
    clearable
    @change="onSelectWallet">

    <template v-slot:no-data>
      <span>{{$t('common.select.no-result')}}</span>
    </template>
  </v-autocomplete>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "WalletChooser",
  props: {
    value: {
      default: '',
      required: true,
      type: String
    },
    error: {
      required: false,
      default: false,
      type: Boolean,
    },
    label: {
      default: '',
      required: false,
      type: String
    },
    whitelist: {
      default() {
        return []
      },
      required: false,
      type: Array,
    }
  },
  data() {
    return {
      selectedWallet: null,
    }
  },
  computed: {
    ...mapState({
      wallets: state => state.wallets.wallets,
    }),
    items() {
      let cleanedWhitelist = []
      if (this.whitelist) {
        //filter out invalid values:
        // empty object
        // object within no name
        // object within no typ
        cleanedWhitelist = this.whitelist.filter(i => i).filter(i => i.name).filter(i => i.type)
      }

      return this.wallets.filter(wallet => {
        //we have to filter out potential whitelisted wallets
        //the whitelist contains currencies which the wallet must support
        if (cleanedWhitelist.length > 0) {
          for (let wli of cleanedWhitelist) {
            for (let currency of wallet.currencies) {
              if (wli.type === currency.type && wli.name === currency.name) {
                return true;
              }
            }
          }

          //the wallet doesn't support the currency
          return false;
        } else {
          //no whitelist -> all wallets are supported
          return true;
        }
      }).map(wallet => {
        return {
          label: `${wallet.name} (${this.shortWalletAddress(wallet)})`,
          value: wallet.id,
        }
      })
    }
  },
  methods: {
    shortWalletAddress(wallet) {
      if (!wallet.address) {
        return "";
      }
      if (wallet.address.length < 15) {
        return wallet.address;
      }

      let firstPart = wallet.address.substr(0, 8);  //first 8
      let lastPart = wallet.address.substr(wallet.address.length - 4, wallet.address.length); //last 4
      return `${firstPart}...${lastPart}`;
    },
    onSelectWallet(walletId) {
      this.$emit('input', walletId)
    }
  },
  watch: {
    value() {
      if (this.value === '') {
        this.selectedWallet = ''
      }
    },
  },
  mounted() {
    for (let curItem of this.items) {
      if (curItem.value === this.value) {
        this.selectedWallet = curItem
        break
      }
    }
  }
}
</script>

<style scoped>

</style>
