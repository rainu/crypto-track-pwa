<template>
  <div>
    <v-btn block color="primary" @click="$refs.fileInput.click()">
      <v-icon left>cloud_download</v-icon>
      {{ $t('backup.file.import.title') }}

      <input hidden ref="fileInput" type="file" @change="onUploadFile"/>
    </v-btn>

    <v-snackbar v-model="snackbar.error" color="error" class="text-center" :timeout="5000">
      {{ $t('backup.file.import.failed', {err: uploadError}) }}
      <v-btn text @click="snackbar.error = false">
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>

    <v-dialog v-model="snackbar.success" persistent>
      <v-card>
        <v-card-title>{{ $t('backup.file.import.success') }}</v-card-title>
        <v-card-text>{{ $t('backup.reload') }}</v-card-text>
        <v-card-actions>
          <v-row dense>
            <v-col cols="12">
              <v-btn block color="primary" @click="onConfirm">
                <v-icon>check</v-icon>
                {{ $t('common.ok') }}
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {mapActions} from 'vuex';
import {importAll} from "@/functions/importExport";

export default {
  name: "FileImport",
  data() {
    return {
      uploadError: null,
      snackbar: {
        error: false,
        success: false,
      }
    }
  },
  methods: {
    ...mapActions({
      applyBackup: 'backup/applyBackup'
    }),
    onConfirm(){
      //to avoid store re-initialisation here we go the easy way: reload the page/app ;)
      window.location.reload()
    },
    onUploadFile() {
      if (!this.$refs.fileInput.files[0]) {
        return
      }
      this.uploadError = null

      let fileReader = new FileReader()
      fileReader.readAsText(this.$refs.fileInput.files[0], 'UTF-8')

      fileReader.addEventListener('load', (e) => {
        importAll(e.target.result).then(importResult => {
          this.applyBackup(importResult.content)

          this.snackbar.success = true
          this.$refs.fileInput.value = ''
        }).catch(e => {
          this.uploadError = e
          this.snackbar.error = true
        })
      });
    }
  }
}
</script>

<style scoped>

</style>
