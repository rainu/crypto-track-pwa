<template>
  <v-card>
    <v-card-text>
      <v-row>
        <v-col cols="12">
          <v-combobox
            v-model="value"
            :label="$t('settings.crawler.cors-proxy')"
            :items="predefinedItems"
            @change="onChange"/>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "SettingsCrawler",
  data(){
    return {
      value: null,
      predefinedItems: [
        'https://cors-anywhere.herokuapp.com/',
      ]
    }
  },
  computed: {
    ...mapState({
      proxy: state => state.settings.cors.proxy,
    })
  },
  methods: {
    ...mapActions({
      setProxy: 'settings/setCorsProxy'
    }),
    onChange(){
      this.setProxy(this.value)
    }
  },
  mounted() {
    this.value = this.proxy

    let i = this.predefinedItems.findIndex(i => i === this.value)
    if(i < 0) {
      this.predefinedItems.push(this.value)
    }
  }
}
</script>

<style scoped>

</style>
