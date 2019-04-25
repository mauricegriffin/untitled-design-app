<template>
    <v-layout fill-height row wrap>
        <v-layout fluid grid-list-lg v-if="!loading">
            <!-- <v-layout row wrap> -->
            <v-flex xs12>
                <v-card tag="article" v-for="(item, index) in articleList" v-bind:key="item.link" v-bind:class="{ 
                            'has-image': item.img, 
                            'feature-image': item.topImage 
                        }" class="elevation-5">

                    <!-- {{item.link}} -->
                    <v-layout v-if="item.img && !item.topImage">
                        <v-flex xs5 align-center row fill-height>
                            <v-img :src="item.img" height="125px" contain max-width="100%" max-height="100%"
                                justify-center></v-img>
                        </v-flex>
                        <v-flex xs7 align-end tag="header">
                            <h1>
                                <!-- <span class="headline"> -->
                                {{item.title}}
                                <!-- </span> -->
                            </h1>
                        </v-flex>
                    </v-layout>
                    <v-card-title v-if="!item.img">
                        <h1>{{item.title}}</h1>
                    </v-card-title>
                    <template v-if="item.topImage">
                        <v-img class="white--text" height="200px" :src="item.img">
                            <!-- <v-layout>
                                <v-container fluid> -->

                            <header>
                                <h1>{{item.title}}</h1>
                            </header>
                            <!-- </v-container>

                                    </v-layout> -->
                        </v-img>
                    </template>
                    <v-card-text class="content-snippet" v-html="item.description || item.contentSnippet"></v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions tag="footer">
                        <img v-if="item.source.image" :src="item.source.image.url" :alt="item.source.image.title"
                            :width="item.source.image.width" :height="item.source.image.height" />
                        <!-- {{item.source.link}} -->
                        <span class="source">
                            {{item.source.title}}&nbsp;
                        </span>
                        <v-spacer></v-spacer>
                        <span class="time">
                            {{item.postAge}}
                        </span>
                        <!-- {{item.source.description}} -->
                        <!-- {{item.source.image}} -->
                        <!-- 
                                    image:
                                        link
                                        url
                                        title
                                        width
                                        height 
                                -->
                        <!-- <v-btn flat dark :href="item.link" target="_blank">Read More</v-btn> -->
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    <v-layout v-if="loading" fill-height>
        <v-layout fill-height justify-center align-center>
            <!-- <v-progress-circular :size="60" :width="3" color="success" indeterminate> -->
            <v-progress-circular :size="55" :width="3" color="accent" indeterminate></v-progress-circular>
            <!-- </v-progress-circular> -->
        </v-layout>
    </v-layout>
    </v-layout>
</template>

<script>

import rssParser from 'rss-parser';
import moment from 'moment';
// TODO uninstall vue-lodash, just load individual functions
import _ from 'lodash';

export default {
    name: 'news',
    data: () => {
        return {
            rssItemList: [],
            loading: true
        };
    },
    methods: {
        async getRssResults() {
            let self = this;
            let rssRequests = [];
            // let newResults = [];
            let feeds = this.$store.state.defaultRSSFeeds;

            /*
                queue up rss-parser requests for feeds to be requested and parsed to JSON
            */
            for (let i=0; i<feeds.length; i++) {
                let parser = new rssParser();
                rssRequests.push(parser.parseURL(this.$store.state.corsProxy+feeds[i]));
            }

            /*
                sets responses to variable once feeds have all been retrieved
            */
            let results = await Promise.all(
                rssRequests.map(p => p.catch(e => e))    
            );

            /*
                filter out failed requests
            */   
            results = results.filter(result => !(result instanceof Error));

            results.forEach(function(result){
                // console.log(result);
                /*
                    grab the source title of the RSS response, for adding to each article object
                */ 
                let feedSource = {
                    description: result.description,
                    link: result.link,
                    title: result.title,
                    image: result.image
                }

                result.items.forEach(function(i){
                    /*
                        create unrendered div, pop content in as HTML, parse through to extract 1st image as a preview image 
                    */
                    let temporalDivElement = document.createElement("div");
                    temporalDivElement.innerHTML = i['content:encoded'];
                    let firstImg = temporalDivElement.getElementsByTagName('img')[0];
                    // * kill fake div with fire, hope it doesn't try to load a bunch of other images
                    temporalDivElement = null;

                    i.img = firstImg ? firstImg.getAttribute('src') : false;
                    i.topImage = false;


                    if (i.img) {
                        let imgWidth = firstImg.naturalWidth;
                        let imgHeight = firstImg.naturalHeight;
                        if (imgWidth>375 && (imgHeight<imgWidth)) {
                            i.topImage = true;
                        }
                    }
                    /*
                        set postAge to "X days/hours ago"
                        set unixTime to unix epoch time (sec) for sorting articles by time
                    */
                    let postDate = moment(i.pubDate);
                    i.postAge = postDate.fromNow();
                    i.unixTime = postDate.unix();
                    /*
                        add the title of the source to the article object
                    */
                    i.source = feedSource;

                    self.rssItemList.push(i);
                })
            });

            self.loading = false;
        }
    },
    created: function() {
        if (!this.rssItemList.length) {
            this.getRssResults();
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.getRssResults();
        })
    },
    computed: {
        articleList: function() {
            // let self = this;
            var filtered_array = [];
            if (this.rssItemList) {
                for(var i =0; i < this.rssItemList.length; i++) {
                    if(filtered_array.indexOf(this.rssItemList[i].link) === -1) {
                        filtered_array.push(this.rssItemList[i])
                    }
                }
            }
            return _.orderBy(filtered_array, 'unixTime').reverse();
        }
            // orderedRss: function () {
        //     // this.fullRssItems = _.differenceBy(this.fullRssItems, this.orderedRss, 'link');
        //     return _.orderBy(this.fullRssItems, 'unixTime').reverse();
        // }
    }
};
</script>
<style lang="scss"> // COPIED FOR REFERENCE
$tan: #f6d8ae;
$greyBrown: #5a5353;
$avocado: #ade25d;
$dust: #a0a083;
$teal: #3b7080;
$blackish: #1E1C1C;
// ----------------

.content-snippet {
    font-size: 14px;
    line-height: 21px;
    height: 56px;
    overflow: hidden;
    margin-bottom: 16px;
}

article {
    .source {
        max-width: 75%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
}

article.feature-image {
    header {
        height: 100%;
        width: 100%;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 1fr auto;
    }

    h1 {
        background:
            linear-gradient(rgba(0, 0, 0, 0),
            rgba(0, 0, 0, 0.30) 33%,
            rgba(0, 0, 0, 0.45) 66%,
            rgba(0, 0, 0, 0.60),
            );
        grid-column: 1 / 1;
        grid-row: 3 / 4;
        padding: 2rem 1rem 1rem;
    }
}

</style>