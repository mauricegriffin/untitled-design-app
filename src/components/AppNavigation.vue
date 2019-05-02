<template>
    <span>
        <v-navigation-drawer app v-model="drawer" disable-resize-watcher>
            <!-- <v-list>
                <template v-for="(item, index) in items">
                    <v-list-tile :key="index">
                        <v-list-tile-content>
                            {{item.title}}
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-divider :key="`divider-${index}`"></v-divider>
                </template>
            </v-list> -->
            <v-list>
                <v-list-tile to="/news/latest">
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
        <v-toolbar class="primary">
            <v-toolbar-side-icon class="hidden-md-and-up" @click="drawer = !drawer"></v-toolbar-side-icon>
            <v-spacer class="hidden-md-and-up"></v-spacer>
            <router-link to="/">
                <v-toolbar-title to="/">{{this.$store.state.appTitle}}</v-toolbar-title>
            </router-link>
            <v-btn flat class="hidden-sm-and-down" to="/news/latest">News</v-btn>
            <v-btn flat class="hidden-sm-and-down" to="/photos">Photos</v-btn>
            <v-btn flat class="hidden-sm-and-down" to="/colors">Colors</v-btn>
            <v-spacer class="hidden-sm-and-down"></v-spacer>
            <v-btn flat class="hidden-sm-and-down" to="/login">Sign In</v-btn>
            <v-btn flat class="hidden-sm-and-down" to="/join">Sign Up</v-btn>
            <v-btn flat class="hidden-sm-and-down" to="/">Sign Out</v-btn>
        </v-toolbar>
    </span>
</template>
<script>
export default {
    name: 'AppNavigation',
    data() {
        return {
            drawer: false
        };
    }
};
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
</style>
