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
                  <v-col cols="12" sm="4">
                    <SettingsTheme />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <SettingsLanguage />
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
export default {
  name: "Settings",
  components: {SettingsLanguage, SettingsTheme},
  data(){
    return {
      panel: 1
    }
  }
}
</script>

<style scoped>

</style>
