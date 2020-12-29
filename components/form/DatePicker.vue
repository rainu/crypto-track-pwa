<template>
  <v-dialog
    ref="dateDialog"
    v-model="date.dialog"
    width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        :value.sync="formattedDate"
        :label="$t(label)"
        :error="error"
        prepend-inner-icon="event"
        readonly
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
      v-if="date.dialog"
      v-model="date.value"
      :locale="$t('common.datetime.locale')"
      :first-day-of-week="firstDayOfWeek"
      header-color="primary"
      color="primary"
      scrollable
      full-width>
      <v-spacer></v-spacer>
      <v-btn block color="primary" @click="date.dialog = false">
        {{ $t('common.confirmation.close') }}
      </v-btn>
    </v-date-picker>
  </v-dialog>
</template>

<script>
import * as dateFN from 'date-fns'
import {mapState} from 'vuex';

export default {
  name: "DatePicker",
  props: {
    value: {
      default() {
        return new Date()
      },
      required: false,
      type: Date
    },
    label: {
      required: false,
      type: String,
      default: 'transaction.common.date'
    },
    error: {
      required: false,
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      datetime: this.value,
      date: {
        dialog: false,
        value: dateFN.format(this.value, 'yyyy-MM-dd'),
      },
    }
  },
  computed: {
    ...mapState({
      firstDayOfWeek: state => state.settings.date.firstDayOfWeek,
      timeFormat: state => state.settings.date.timeFormat,
    }),
    formattedDate() {
      return dateFN.format(this.datetime, this.$t('common.datetime.format.date'))
    },
  },
  methods: {
    recalcDate() {
      let result = dateFN.parse(this.date.value, `yyyy-MM-dd`, new Date())
      if (isNaN(result.getDate())) {
        result = new Date()
      }

      this.datetime = result
    },
  },
  watch: {
    value(){
      this.datetime = this.value
      this.date.value = dateFN.format(this.value, 'yyyy-MM-dd')
    },
    'date.value'() {
      this.recalcDate()
      this.$emit('input', this.datetime)
    },
  }
}
</script>

<style scoped>

</style>
