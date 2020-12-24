<template>
  <div>
    <v-snackbar v-model="snackbar.error" color="error" class="text-center" :timeout="5000">
      {{ $t('backup.cointracking.failed', {err: exportError}) }}
      <v-btn text @click="snackbar.error = false">
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>

    <v-btn block color="primary" @click="onDownloadFile">
      <v-icon left>cloud_upload</v-icon>
      {{ $t('backup.file.export.title') }}
    </v-btn>
    <a hidden ref="downloadLink"></a>
  </div>
</template>

<script>
import {mapState} from "vuex";
import {exportCointracking} from "@/functions/export_cointracking";

export default {
  name: "CoinTracking",
  data() {
    return {
      exportError: null,
      snackbar: {
        error: false,
      }
    }
  },
  computed: {
    ...mapState({
      transactions: state => state.transactions.transactions,
    })
  },
  methods: {
    onDownloadFile() {
      return exportCointracking(this.transactions).then(content => {
        let blob = new Blob([content], { type: 'text/csv' } );
        let link = this.$refs['downloadLink'];
        link.href = window.URL.createObjectURL(blob);
        link.download = `cointracking.csv`;
        link.click();
      }).catch(err => {
        this.snackbar.error = true
        this.exportError = err.Error
      })
    }
  }
}
</script>

<style scoped>

</style>
