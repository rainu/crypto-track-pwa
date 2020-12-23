<template>
  <v-container fluid>
    <v-layout column justify-center>
      <v-row align="center">
        <v-col cols="12">
          <v-expansion-panels v-model="panel" accordion focusable>

            <!-- Other options -->
            <v-expansion-panel>
              <v-expansion-panel-header>{{$t('settings.others.title')}}</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row>
                  <v-col cols="12">
                    <SettingsPaging />
                  </v-col>
                  <v-col cols="12">
                    <SettingsTheme />
                  </v-col>
                  <v-col cols="12">
                    <SettingsLanguage />
                  </v-col>
                  <v-col cols="12">
                    <SettingsDateTime />
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>

          </v-expansion-panels>
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>

import SettingsTheme from "~/components/settings/Theme";
import SettingsLanguage from "~/components/settings/Language";
import SettingsPaging from "@/components/settings/Paging";
import SettingsDateTime from "@/components/settings/DateTime";
export default {
  name: "Settings",
  components: {SettingsDateTime, SettingsPaging, SettingsLanguage, SettingsTheme},
  data(){
    return {
      panel: 0
    }
  }
}
</script>

<style scoped>

</style>
