<template>
  <v-row>
    <v-col cols="7" sm="6">
      <v-dialog
        ref="dateDialog"
        v-model="date.dialog"
        width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            :value.sync="formattedDate"
            :label="$t('transaction.common.date')"
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
    </v-col>
    <v-col cols="5" sm="6">
      <v-dialog
        ref="timeDialog"
        v-model="time.dialog"
        width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            :value.sync="formattedTime"
            :label="$t('transaction.common.time')"
            :error="error"
            append-icon="access_time"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker
          v-if="time.dialog"
          v-model="time.value"
          :format="timeFormat"
          :locale="$t('common.datetime.locale')"
          header-color="primary"
          color="primary"
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn block color="primary" @click="time.dialog = false">
            {{ $t('common.confirmation.close') }}
          </v-btn>
        </v-time-picker>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
import * as dateFN from 'date-fns'
import {mapState} from 'vuex';

export default {
  name: "DateTimePicker",
  props: {
    value: {
      default() {
        return new Date()
      },
      required: false,
      type: Date
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
      time: {
        dialog: false,
        value: dateFN.format(this.value, 'HH:mm'),
      },
    }
  },
  computed: {
    ...mapState({
      firstDayOfWeek: state => state.settings.date.firstDayOfWeek,
      timeFormat: state => state.settings.date.timeFormat,
    }),
    formattedDate() {
      return dateFN.format(this.datetime, this.$t('common.datetime.format.dateFN.date'))
    },
    formattedTime() {
      return dateFN.format(this.datetime, this.$t('common.datetime.format.dateFN.time'))
    },
  },
  methods: {
    recalcNoteDate() {
      let result = dateFN.parse(this.date.value + this.time.value, `yyyy-MM-ddHH:mm`, new Date())
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
      this.datetime.value = dateFN.format(this.value, 'HH:mm')
    },
    'date.value'() {
      this.recalcNoteDate()
      this.$emit('input', this.datetime)
    },
    'time.value'() {
      this.recalcNoteDate()
      this.$emit('input', this.datetime)
    },
  }
}
</script>

<style scoped>

</style>
