<template>
    <main class="news">
        <!-- <v-container fluid grid-list-lg class="newsfeed"> -->
        <template v-if="loading">
            Loading
        </template>
        <template row wrap v-if="!loading">
            <article v-for="(item, index) in orderedRss" v-bind:key="item.link">
                <header>
                    {{item.title}}
                </header>
                <p class="snippet" v-html="item.contentSnippet"></p>
                <v-img class="article-img" v-if="item.img" :src="item.img" alt=""></v-img>
                <!-- <aside>
                </aside> -->
                <footer>
                    {{item.source}} / {{item.postAge}} <template v-if="item.creator">by {{item.creator}}</template>
                </footer>
            </article>
        </template>
    </main>
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
// COPIED FOR REFERENCE
$tan: #f6d8ae;
$greyBrown: #5a5353;
$avocado: #ade25d;
$dust: #a0a083;
$teal: #3b7080;
// ----------------

.news {
    article {
        background-color: $tan;
    }
    header {
        // background-color:  var(--v-secondary-base);
        background-color: $greyBrown;
    }
    .snippet {

    }
    footer {

    }
    .article-img {

    }
}
</style>
