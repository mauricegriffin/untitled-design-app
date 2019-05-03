<template>


    <v-container fluid grid-list-lg>
        <v-layout row wrap tag="main" class="photo-page">
            
                       <v-btn
              fixed
              dark
              fab
              bottom
              right
              color="warning"
            >
              <v-icon>search</v-icon>
            </v-btn>

            <v-flex row>
                <v-form v-on:submit.prevent="submitSearch">
                    <v-text-field hide-details single-line required v-model="searchQuery" prepend-icon="search"
                        label="search" hint="'pandas', 'red', 'Taj Mahal'"></v-text-field>
                </v-form>
            </v-flex>

            <v-flex v-for="result in imageSearches" :key="result.id" xs12 sm6 md4 lg3 xl2>
                <v-card tag="article" class="elevation-10">
                    <!-- <v-container color="success"> -->
                    <v-img :src="result.urls.regular" :alt="result.alt_description" aspect-ratio="1.5"></v-img>

                    <!-- </v-container> -->
                    <v-card-actions>
                        <v-container>

                            <v-layout justify-space-between row>
                                <a justify-start :href="result.links.html" target="_blank">Unsplash</a>
                                <a justify-start target="_blank"
                                    :href="result.user.links.html">{{ result.user.name }}</a>
                            </v-layout>
                        </v-container>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
                  <v-toolbar>
            <v-btn icon class="hidden-xs-only">
              <v-icon>arrow_back</v-icon>
            </v-btn>

            <v-toolbar-title>Title</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon class="hidden-xs-only">
              <v-icon>search</v-icon>
            </v-btn>
          </v-toolbar>
    </v-container>
</template>
<script>

import Vuex from 'vuex';

export default {
    name: 'photos',
    data: function() {
        return {
            searchQuery: "",
        }
    },
    methods: {
        submitSearch: function() {
            this.$store.dispatch('imageSearch', this.searchQuery);
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
        ...Vuex.mapState(['imageSearches'])
    }
};

</script>

<style lang="scss">
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
