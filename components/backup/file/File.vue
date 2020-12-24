<template>
  <v-card>
    <v-card-title>{{ $t('backup.file.title') }}</v-card-title>
    <v-card-actions>
      <v-row align="center">
        <v-col md="6">
          <FileExport/>
        </v-col>
        <v-col md="6">
          <FileImport/>
        </v-col>
      </v-row>
    </v-card-actions>

  </v-card>
</template>

<script>
import FileExport from "./FileExport";
import FileImport from "./FileImport";

export default {
  name: "BackupFile",
  components: {FileImport, FileExport},
}
</script>

<style scoped>

</style>
