<template>
    <v-container fluid>
        <v-layout>
            <h1>News Page</h1>
            {{fullRssItems}}
    <!-- 
            <v-flex>
                <v-card>
                    <v-img></v-img>
                    <v-card-title>

                    </v-card-title>
                    <v-card-text>

                    </v-card-text>
                    <v-card-actions>

                    </v-card-actions>
                </v-card>
            </v-flex> -->
        </v-layout>
    </v-container>
</template>
<script>

import rssParser from 'rss-parser';
// import axios from 'axios';

export default {
    name: 'news',
    data: () => {
        return {
            fullRssItems: []
        };
    },
    methods: {
        async getRssResults() {
            let self = this;
            let rssRequests = [];
            // let rssResults = [];
            let feeds = this.$store.state.defaultRSSFeeds;

            for (let i=0; i<feeds.length; i++) {
                // rssResults.push('result'+i);
                // copy.push(items[i]);
                let parser = new rssParser();
                // parser.parseURL(url);
                rssRequests.push(parser.parseURL(this.$store.state.corsProxy+feeds[i]));
            }

            Promise.all(rssRequests)
                .then(allResponses => {
                    allResponses.forEach(function(result){
                        console.log(result)
                        let feedTitle = result.title;
                        let feedImg = result.image.url;
                        result.items.forEach(function(i){
                            i.source = feedTitle;
                            i.sourceImg = feedImg;
                            // self.fullRssItems.push(i);
                            // console.log(i)
                        })
                        // console.log(JSON.stringify(result.data))
                        // let rssFeed = result.data;
                        // let parser = new rssParser();
                        // parser.parseString(rssFeed, function(parsed){
                        //     console.log(parsed);
                        // })
                    });
                })
                .catch(e => {
                    console.log(e);
                });
        },

    },
    created: function() {
        // this.$store.dispatch('getRssResults');
        this.getRssResults();
    },
    computed: {
        // allRss() {
        //     return this.$store.state.rssFeedResults;
        // }
    }
};
</script>