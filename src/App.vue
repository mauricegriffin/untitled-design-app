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



    <v-toolbar class="primary darken-4" fixed scroll-off-screen v-if="!['home'].includes($route.name)" app>
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
      <!-- <v-container fluid> -->
        <router-view></router-view>
      <!-- </v-container> -->
    </v-content>

    <v-footer fixed 
      v-if="!['home','login','join'].includes($route.name)"
      >

    <v-bottom-nav
      :value="true"
      absolute
      color="primary darken-4"
    >
      <v-btn
        color="warning"
        flat
        value="news"
        to="/news/latest" 
      >
        <span>News</span>
        <v-icon>rss_feed</v-icon>
      </v-btn>

      <v-btn
        color="warning"
        flat
        value="photos"
        to="/photos" 
      >
        <span>Photos</span>
        <v-icon>photo_camera</v-icon>
      </v-btn>

      <v-btn
        color="warning"
        flat
        value="colors"
        to="/colors"
      >
        <span>Colors</span>
        <v-icon>color_lens</v-icon>
      </v-btn>
    </v-bottom-nav>
    </v-footer>
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
        // bottomNav: this.$props.bottomNavShow
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
        color: var(--v-accent-base);
      }
    }


    article {
      // ? lazily avoid override by Vuetify styles

      margin-bottom: 1.5rem;

      h1 {
        font-weight: normal;
        font-size: 1.25rem;
        line-height: 1.7rem;
      }

      .v-card__actions {
        footer {
          width: 100%;
        }

        &>img {
          max-width: 26px;
          max-height: 26px;
          border-radius: 0.5rem;
          margin-right: 0.5rem;
          border: 1px solid rgba(255, 255, 255, 0.5);
          padding: 1px;
        }
      }

      &.v-card {
        border-radius: 1.5rem;
      }
    }
    .v-content__wrap {
      // margin-bottom: 3rem;
    }
</style>

