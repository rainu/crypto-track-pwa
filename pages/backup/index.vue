<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <BackupFile />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>{{ $t('backup.cointracking.title') }}</v-card-title>
          <v-card-actions>
            <v-row>
              <v-col cols="12">
                <CoinTracking />
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import BackupFile from "@/components/backup/file/File";
import CoinTracking from "@/components/backup/file/CoinTracking";
export default {
  components: {CoinTracking, BackupFile}
}
</script>

<style scoped>

</style>
