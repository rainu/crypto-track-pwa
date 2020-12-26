<template>
  <v-row dense>
    <v-dialog v-model="showDelete">
      <v-card>
        <v-card-title>{{ $t('transaction.delete-question.title') }}</v-card-title>
        <v-card-text>
          <v-row dense>
            <v-col cols="3">{{ $t('transaction.delete-question.type') }}</v-col>
            <v-col cols="9">{{ txType }}</v-col>
          </v-row>
          <v-row dense>
            <v-col cols="3">{{ $t('transaction.delete-question.date') }}</v-col>
            <v-col cols="9">{{ ldate }}</v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-row dense>
            <v-col cols="6">
              <v-btn small tile block @click="cancelDeletion">
                <v-icon small>mdi-undo-variant</v-icon>
                {{ $t('common.abort') }}
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn small tile block color="warning" @click="confirmDeletion">
                <v-icon small>mdi-delete</v-icon>
                {{ $t('common.ok') }}
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-col cols="6">
      <v-btn small tile block color="warning" @click="requestDeleteTransaction">
        <v-icon small>mdi-delete</v-icon>
        {{ $t('common.delete') }}
      </v-btn>
    </v-col>
    <v-col cols="6">
      <v-btn small tile block color="primary" @click="editTransaction">
        <v-icon small>mdi-border-color</v-icon>
        {{ $t('common.edit') }}
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import * as dateFN from 'date-fns'
import { mapActions } from 'vuex'

export default {
  name: "TransactionActions",
  props: {
    value: {
      required: true,
      type: Object,
    }
  },
  data() {
    return {
      showDelete: false,
    }
  },
  computed: {
    txType() {
      switch (this.value.type.toLowerCase()) {
        case 'giftin':
          return this.$t(`transaction.gift.in`)
        case 'giftout':
          return this.$t(`transaction.gift.out`)
        default:
          return this.$t(`transaction.${this.value.type}.title`)
      }
    },
    ldate() {
      return dateFN.format(dateFN.parseISO(this.value.date), this.$t('common.datetime.format.datetime'))
    },
  },
  methods: {
    ...mapActions({
      deleteTransaction: 'transactions/deleteTransaction'
    }),
    requestDeleteTransaction() {
      this.showDelete = true
    },
    confirmDeletion() {
      this.showDelete = false
      this.deleteTransaction(this.value.id)
    },
    cancelDeletion() {
      this.showDelete = false
    },
    editTransaction() {
      this.$router.push({path: `/transaction/edit/${this.value.id}`})
    }
  }
}
</script>

<style scoped>

</style>
