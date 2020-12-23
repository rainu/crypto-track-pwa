<template>
  <v-row dense>
    <v-dialog v-model="showDelete">
      <v-card>
        <v-card-title>{{ $t('wallet.delete-question.title') }}</v-card-title>
        <v-card-text>
          <v-row dense>
            <v-col cols="3">{{ $t('wallet.delete-question.name') }}</v-col>
            <v-col cols="9">{{ value.name }}</v-col>
          </v-row>
          <v-row dense>
            <v-col cols="3">{{ $t('wallet.delete-question.address') }}</v-col>
            <v-col cols="9">{{ value.address }}</v-col>
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
      <v-btn small tile block color="warning" @click="requestDeleteWallet">
        <v-icon small>mdi-delete</v-icon>
        {{ $t('common.delete') }}
      </v-btn>
    </v-col>
    <v-col cols="6">
      <v-btn small tile block color="primary" @click="editWallet">
        <v-icon small>mdi-border-color</v-icon>
        {{ $t('common.edit') }}
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: "WalletActions",
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
  methods: {
    ...mapActions({
      deleteWallet: 'wallets/deleteWallet'
    }),
    requestDeleteWallet() {
      this.showDelete = true
    },
    confirmDeletion() {
      this.showDelete = false
      this.deleteWallet(this.value.id)
    },
    cancelDeletion() {
      this.showDelete = false
    },
    editWallet() {
      this.$router.push({path: `/wallet/edit/${this.value.id}`})
    }
  }
}
</script>

<style scoped>

</style>
