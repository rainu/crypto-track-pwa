<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" fixed app>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <v-spacer />
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>settings</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <v-navigation-drawer v-model="rightDrawer" right temporary fixed>
      <Settings />
    </v-navigation-drawer>
  </v-app>
</template>

<script>
import Settings from "~/components/settings/index";

export default {
  components: {Settings},
  data () {
    return {
      drawer: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'save',
          title: 'Backup',
          to: '/backup'
        }
      ],
      rightDrawer: false,
    }
  }
}
</script>
