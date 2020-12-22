<template>
  <v-toolbar>
    <v-row>
      <v-col cols="4" sm="3" class="pr-0">
        <v-select
          v-model="container.in"
          :items="cfItems"
          item-value="v"
          item-disabled="divider"
          :disabled="fixedCrypto"
          dense
        >

          <template v-slot:prepend>
            <v-icon dense>mdi-numeric-1-box</v-icon>
          </template>

          <template v-slot:selection="data">
            <CurrencyIcon :currency="data.item"></CurrencyIcon>
            <span>&nbsp; {{data.item.name}}</span>
          </template>

          <template v-slot:append-outer>
            <v-icon dense>mdi-repeat</v-icon>
          </template>

          <template v-slot:item="data">
            <v-list-item v-if="data.item.divider" dense>
              <v-divider></v-divider>
            </v-list-item>
            <v-list-item v-if="!data.item.divider">
              <CurrencyIcon :currency="data.item"></CurrencyIcon>
              <span>&nbsp; {{data.item.label}}</span>
            </v-list-item>
          </template>

        </v-select>
      </v-col>

      <v-col cols="5" sm="7" class="pr-0 pl-1">
        <InputNumber v-model="container.ratio" :number-format="numberFormat" dense />
      </v-col>

      <v-col cols="3" sm="2">
        <v-select
          v-model="container.out"
          :items="fcItems"
          item-value="v"
          item-disabled="divider"
          :disabled="fixedFiat"
          dense
        >

          <template v-slot:selection="data">
            <CurrencyIcon :currency="data.item"></CurrencyIcon>
            <span>&nbsp; {{data.item.name}}</span>
          </template>

          <template v-slot:item="data">
            <v-list-item v-if="data.item.divider" dense>
              <v-divider></v-divider>
            </v-list-item>
            <v-list-item v-if="!data.item.divider">
              <CurrencyIcon :currency="data.item"></CurrencyIcon>
              <span>&nbsp; {{data.item.label}}</span>
            </v-list-item>
          </template>

        </v-select>
      </v-col>
    </v-row>
  </v-toolbar>
</template>

<script>
import CurrencyIcon from "@/components/CurrencyIcon";
import InputNumber from "@/components/form/InputNumber";
import {mapState} from "vuex";

export default {
  components: {InputNumber, CurrencyIcon},
  props: {
    value: {
      type: Object,
      required: false,
      default() {
        return null;
      }
    },
    selectedIn: {
      type: Object,
      required: false,
      default() {
        return {
          name: 'BTC',
          type: 'crypto'
        }
      }
    },
    selectedOut: {
      type: Object,
      required: false,
      default() {
        return {
          name: 'EUR',
          type: 'fiat'
        }
      }
    },
    numberFormat: {
      type: String,
      required: false,
      default: '0,0.[00000000]'
    },
    fixedCrypto: {
      type: Boolean,
      required: false,
      default: false,
    },
    fixedFiat: {
      type: Boolean,
      required: false,
      default: false,
    }
  },
  data() {
    let content = this.value;
    if (this.value === null || this.value.in === null || this.value.out === null) {
      content = {
        in: this.selectedIn,
        out: this.selectedOut,
        ratio: 0
      }
    }

    return {
      container: {
        ...content
      }
    }
  },
  computed: {
    ...mapState({
      currencies: state => state.currencies.currencies,
    }),
    cfItems(){
      let crypto = this.extract(this.currencies.crypto)
      let fiat = this.extract(this.currencies.fiat)

      return [
        ...crypto,
        { divider: true },
        ...fiat,
      ]
    },
    fcItems(){
      let crypto = this.extract(this.currencies.crypto)
      let fiat = this.extract(this.currencies.fiat)

      return [
        ...fiat,
        { divider: true },
        ...crypto,
      ]
    },
  },
  methods: {
    extract(currencies){
      return Object.keys(currencies).sort().map(k => {
        return {
          type: currencies[k].type,
          label: currencies[k].label,
          name: k,
          v: {
            name: k,
            type: currencies[k].type
          }
        }
      })
    }
  },
  watch: {
    container: {
      handler() {
        if (this.container.ratio !== 0) {
          this.$emit('input', this.container)
        } else {
          this.$emit('input', null)
        }
      },
      deep: true
    }
  }
}
</script>

<style scoped>

</style>
