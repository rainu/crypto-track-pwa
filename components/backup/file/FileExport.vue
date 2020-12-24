<template>
  <div>
    <v-btn block color="primary" @click="onDownloadFile">
      <v-icon left>cloud_upload</v-icon>
      {{ $t('backup.file.export.title') }}
    </v-btn>
    <a hidden ref="downloadLink"></a>
  </div>
</template>

<script>
import {mapActions} from 'vuex';
import {exportAll} from "@/functions/importExport";

export default {
  name: "FileExport",
  data() {
    return {}
  },
  methods: {
    ...mapActions({
      backupContent: 'backup/getBackupContent'
    }),
    onDownloadFile() {
      return this.backupContent().then(backupContent => {
        let exportData = exportAll(backupContent)
        let blob = new Blob([JSON.stringify(exportData, null, 2)], {type: 'text/json;charset=UTF-8'});
        let link = this.$refs['downloadLink'];
        link.href = window.URL.createObjectURL(blob);
        link.download = `crypto_track_backup.json`;
        link.click();
      })

    }
  }
}
</script>

<style scoped>

</style>
