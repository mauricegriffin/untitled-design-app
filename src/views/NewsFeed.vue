<template>
    <v-container fluid grid-list-lg class="newsfeed">
        <v-layout v-if="loading">
            Loading
        </v-layout>
        <v-layout row wrap v-if="!loading">
            <v-flex xs12 v-for="(item, index) in orderedRss">
                <v-card :class="'rss-card-'+index">
                    <!-- <v-layout row wrap> -->
                            <v-card-title class="error darken-2 article_title">

                                <h1 class="headline">
                                    {{item.title}}
                                </h1>
                                <p class="caption">
                                    {{item.source}} / {{item.postAge}} <template v-if="item.creator">by {{item.creator}}</template>
                                </p>
                                <!-- <p class="caption" style="float:right;">
                                    {{item.creator}}
                                </p> -->
                            </v-card-title>
                            <v-card-text>
                                <v-img v-if="item.img" :src="item.img" alt="" class="article_img"></v-img>
                                <p v-html="item.contentSnippet"></p>
                            </v-card-text>
                            <!-- <v-layout row> -->
                                <!-- <v-flex xs5> -->
                                     <!-- v-if="item.img"> -->
                                <!-- </v-flex> -->
                                <!-- <v-flex xs7> -->
                                    <v-card-text></v-card-text>
                                <!-- </v-flex> -->
                            <!-- </v-layout> -->
                        <v-card-actions>
                        </v-card-actions>
                    <!-- </v-layout> -->
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

import rssParser from 'rss-parser';
import moment from 'moment';

export default {
    name: 'news',
    data: () => {
        return {
            fullRssItems: [],
            loading: true
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

            const results = await Promise.all(
                rssRequests.map(p => p.catch(e => e))    
            );
            const validResults = results.filter(result => !(result instanceof Error));

            // Promise.all(rssRequests)
            //     .then(allResponses => {

            //         console.log(allResponses)
                    validResults.forEach(function(result){
                        let feedTitle = result.title;
                        // let feedImg = (result.image && result.img.url) ? result.image.url : false;
                        result.items.forEach(function(i){
                            console.log(i)
                            let postDate = moment(i.pubDate);
                            i.postAge = postDate.fromNow();
                            i.unixTime = postDate.unix();
                            i.source = feedTitle;

                            let temporalDivElement = document.createElement("div");
                            temporalDivElement.innerHTML = i['content:encoded'];
                            // console.log(temporalDivElement)
                            // console.log(i)
                            let firstImg = temporalDivElement.getElementsByTagName('img')[0]
                            // console.log();
                            i.img = firstImg ? firstImg.getAttribute('src') : false;

                            // console.log(i.img)

                            // i.previewImg = firstImg;
                            // i.sourceImg = feedImg;
                            self.fullRssItems.push(i);
                        })
                    });
                // })
                // .catch(e => {
                //     // self.loading = false;
                //     console.log(e);
                // });
            // console.log(self.fullRssItems)
            self.loading = false;
        }
    },
    created: function() {
        // this.$store.dispatch('getRssResults');
        // this.getRssResults();
    },
    beforeRouteEnter (to, from, next) {
        // console.log(to, from, next)
        // vm.loading = 
        next(vm => {
            vm.getRssResults();
        })
    },
    computed: {
        orderedRss: function () {
            return _.orderBy(this.fullRssItems, 'unixTime').reverse();
        }
    }
};
</script>

<style lang="scss">
.newsfeed {
    background-color: #000;
}
.v-card__title {
    // font-weight: bold;

    h1 {
    }
}
.v-card__text {
    // img {
    //     max-width: 100%;
    //     height: auto;
    // }
}
.v-card__actions {
    // background-color: darken($error,10);
}
.article_img {
    img {
        max-width: 100%;
    }
}
</style>
