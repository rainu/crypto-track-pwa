<template>
  <v-text-field :label="label" :value="displayValue" @change="setValue" :error="error" :dense="dense"/>
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
    label: {
      default: '',
      required: false,
      type: String
    },
    error: {
      required: false,
      default: false,
      type: Boolean,
    },
    dense: {
      required: false,
      default: false,
      type: Boolean
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
