<template>
  <v-card>
    <v-card-text>
      <v-select
        :items="pageSizes"
        :value="txPageSize"
        prepend-icon="library_books"
        :label="$t('settings.paging.title')"
        @change="onTransactionChange"
      ></v-select>
    </v-card-text>
  </v-card>
</template>

<script>
import {mapState, mapActions} from 'vuex';

export default {
  name: "SettingsPaging",
  data(){
    return {
      pageSizes: [5, 10, 20, 50, 100]
    }
  },
  computed: {
    ...mapState({
      txPageSize: state => state.settings.paging.transaction,
    })
  },
  methods: {
    ...mapActions({
      setTransactionPaging: 'settings/setTransactionPaging',
    }),
    onTransactionChange(pageSize) {
      this.setTransactionPaging(pageSize)
    },
  }
}
</script>

<style scoped>

</style>
