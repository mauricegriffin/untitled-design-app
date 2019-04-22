<template>
    <v-container fluid grid-list-lg>
        <v-layout row wrap tag="main">
            <v-flex row>
            <h1>Photos Page</h1>
            <v-form v-on:submit.prevent="submitSearch">
                <v-text-field hide-details single-line required v-model="searchQuery" prepend-icon="search"
                    label="search" hint="'pandas', 'red', 'Taj Mahal'"></v-text-field>
            </v-form>
            </v-flex>
            <v-flex v-for="result in fullResultsList" :key="result.id" xs12 sm6 md4 lg3 xl2>
                <v-card tag="article">
                    <v-img :src="result.urls.regular" :alt="result.alt_description" aspect-ratio="1.5"></v-img>
                    <v-card-actions>
                        <a class="card-img-source" target="_blank" :href="result.links.html">Unsplash</a>
                        <a class="card-img-artist" target="_blank"
                            :href="result.user.links.html">{{ result.user.name }}</a>
                    </v-card-actions>
                    </section>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>

import UnsplashService from "@/services/UnsplashService";
import unsplashJson from "@/services/unsplash.json";

export default {
    name: 'photos',
    data: function() {
        return {
            searchQuery: "",
            fullResultsList: {}
        }
    },
    methods: {
        submitSearch: async function() {
            let unsplashResults = await UnsplashService.getSearchResults(this.searchQuery);
            console.log(unsplashResults)
            this.fullResultsList = unsplashResults.data.results;
            // console.log(this.fullResultsList)
        }            
    },
    created: function() {
        this.fullResultsList = unsplashJson.results;
        // console.log
        // let sampleResults = unsplashJson.results.concat(designQuotesJson);
    }
};

</script>

