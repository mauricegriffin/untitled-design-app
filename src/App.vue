<template>
  <v-app dark>
    <v-navigation-drawer app v-model="drawer" disable-resize-watcher>
      <v-list>
        <v-list-tile to="/news">
          <v-list-tile-content>
            News
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/photos">
          <v-list-tile-content>
            Photos
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/colors">
          <v-list-tile-content>
            Colors
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/">
          <v-list-tile-content>
            Sign Out
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar class="primary" fixed scroll-off-screen v-if="!['home'].includes($route.name)" app>
      <v-toolbar-side-icon class="hidden-md-and-up" @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-spacer class="hidden-md-and-up"></v-spacer>
      <router-link to="/">
        <v-toolbar-title to="/">{{this.$store.state.appTitle}}</v-toolbar-title>
      </router-link>
      <v-btn flat class="hidden-sm-and-down" to="/news">News</v-btn>
      <v-btn flat class="hidden-sm-and-down" to="/photos">Photos</v-btn>
      <v-btn flat class="hidden-sm-and-down" to="/colors">Colors</v-btn>
      <v-spacer class="hidden-sm-and-down"></v-spacer>
      <v-btn flat class="hidden-sm-and-down" to="/login">Sign In</v-btn>
      <v-btn flat class="hidden-sm-and-down" to="/join">Sign Up</v-btn>
      <v-btn flat class="hidden-sm-and-down" to="/">Sign Out</v-btn>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <!-- <v-footer app></v-footer> -->
  </v-app>
</template>

<script>
// import AppNavigation from "@/components/AppNavigation.vue";


export default {
  name: 'App',
  components: {
    // AppNavigation,
  },
  data () {
    return {
        drawer: false

    }
  }
}
</script>

<style lang="scss">
    .v-toolbar__content {
        a {
        color: white;
        text-decoration: none;
        }
    }
    .v-list__tile--active {
        .v-list__tile__content {
            color: $accent;
        }
    }


    article {
    // ? lazily avoid override by Vuetify styles
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
    border-bottom-left-radius: 1rem;
    border-bottom-left-radius: 1rem;
    margin-bottom: 1.5rem;

    h1 {
        font-family: $narrow;
        font-weight: normal;
        line-height: 1.75rem;
    }
    footer, .v-card__actions {
        & > img {
            border-radius: 0.5rem;
            margin-right: 0.5rem;
        }
    }
}
</style>

