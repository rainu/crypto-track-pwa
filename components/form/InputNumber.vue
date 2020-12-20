<template>
  <v-text-field :value="displayValue" @change="setValue"/>
</template>

<script>
import {mapState} from 'vuex';
import numeral from 'numeral'

export default {
  name: "InputNumber",
  props: {
    value: {
      default: null,
      required: true,
    },
    numberFormat: {
      default: '0.00',
      required: false,
    }
  },
  data() {
    return {}
  },
  computed: {
    ...mapState({
      locale: state => state.settings.locale,
    }),
    displayValue() {
      return numeral(this.value).format(this.numberFormat)
    },
  },
  methods: {
    setValue(rawInput) {
      this.$emit('input', numeral(rawInput).value())
    }
  },
  watch: {
    locale() {
      numeral.locale(this.locale)
    }
  },
  mounted() {
    numeral.locale(this.locale)
  }
}
</script>

<style scoped>

</style>
