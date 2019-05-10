<template>
    <v-container fluid grid-list-lg tag="main" class="photo-page">
        <v-layout row wrap>
            <v-flex v-for="result in imageSearches" :key="result.id" xs12 sm6 md4 lg3 xl2>
                <v-card tag="article" class="elevation-10">
                    <v-img :src="result.urls.regular" :alt="result.alt_description" aspect-ratio="1.5"></v-img>
                    <v-card-actions>
                        <v-container>
                            <v-layout justify-space-between row class="mb-2 mx-1">
                                <a :href="result.links.html" target="_blank" class="d-block">Unsplash</a>
                                <v-spacer></v-spacer>
                                <a target="_blank"  class="d-block"
                                    :href="result.user.links.html">{{ result.user.name }}</a>
                            </v-layout>
                            <v-divider></v-divider>
                            <v-layout justify-space-between row>
                                <v-btn flat icon color="warning">
                                    <v-icon>add</v-icon>
                                </v-btn>
                                <v-btn flat icon color="warning">
                                    <v-icon>favorite</v-icon>
                                </v-btn>
                            </v-layout>
                        </v-container>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
        <Flipper :flipKey="flipKey">
            <Flipped v-if="searchBarActive" flipId="search">
                <v-toolbar class="photo-search-bar" fixed bottom prominent height="85" flat color="accent" light >
                    <!-- <Flipped inverseFlipId="search"> -->
                        <v-form v-on:submit.prevent="submitSearch" v-on-clickaway="clickAway">
                            <v-text-field class="mt-2" label="Search" placeholder="Try people, places, things.." outline
                                required v-model="searchQuery" append-icon="search" full-width></v-text-field>
                            <!-- <v-btn icon>
                                <v-icon>search</v-icon>
                            </v-btn> -->
                        </v-form>
                    <!-- </Flipped> -->
                </v-toolbar>
            </Flipped>
            <Flipped v-else flipId="search">
                <v-btn fixed class="black--text" fab bottom right color="accent" @click="toggleSearch">
                    <v-icon>search</v-icon>
                </v-btn>
            </Flipped>
        </Flipper>
    </v-container>
</template>
<script>

import Vuex from 'vuex';
import { Flipper, Flipped } from "vue-flip-toolkit";
import { directive as onClickaway } from 'vue-clickaway';

export default {
    // mixins: [ clickaway ],
  directives: {
    onClickaway: onClickaway,
  },
    name: 'photos',
    data: function() {
        return {
            searchQuery: "",
            searchBarActive: false
        }
    },
    components: {
        Flipped,
        Flipper
    },
    methods: {
        clickAway: function(e) {
            // console.log(e)
            e.preventDefault();
            // alert('clicked away')
            this.searchBarActive = false;

        },
        toggleSearch: function() {
            this.searchBarActive = !this.searchBarActive;
        },
        submitSearch: function() {
            this.$store.dispatch('imageSearch', this.searchQuery);
            this.searchBarActive = false;
            // let unsplashResults = await UnsplashService.getSearchResults(this.searchQuery);
            // // console.log(unsplashResults)
            // this.fullResultsList = unsplashResults.data.results;
            // console.log(this.fullResultsList)
        }            
    },
    created: function() {
        this.$store.dispatch('imageSearch', false);
    },
    computed: {
        ...Vuex.mapState(['imageSearches']),
        flipKey() {
            return this.searchBarActive.toString();
        }
    }
};

</script>

<style lang="scss">
    .photo-search-bar {
        top: calc(100vh - 141px);
        form {
            width: 100%;
        }
        // padding: 0;
        // height: 5rem;
        // height: 56px;
    }
    .photo-page {
        article {
            // background-color: $dust;
        }
        .v-btn--floating {
            margin-bottom: 4rem;
        }
    }
    .v-card__actions {
        a {
            color: $accent;
            text-decoration: none;
        }
    }
</style>
