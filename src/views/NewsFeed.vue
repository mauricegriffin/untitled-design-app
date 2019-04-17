<template>
    <main class="news">
        <!-- <v-container fluid grid-list-lg class="newsfeed"> -->
        <template v-if="loading">
            Loading
        </template>
        <template row wrap v-if="!loading">
            <article v-for="(item, index) in orderedRss" v-bind:key="item.link" v-bind:class="{ 'has-image': item.img }">
                <div class="article-img">
                    <img v-if="item.img" :src="item.img" alt="Image from article" />
                </div>

                <header>
                    {{item.title}}
                </header>
                <p class="snippet" v-html="item.contentSnippet"></p>

                <!-- <aside>
                </aside> -->
                <footer>
                    {{item.source}} / {{item.postAge}} 
                    <!-- <template v-if="item.creator"> / by {{item.creator}}</template> -->
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
        if (!this.orderedRss.length) {
            this.getRssResults();
        }
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
$blackish: #1E1C1C;
// ----------------

.news {
    padding: 1.5em 1em;
    article {
        // background-color: lighten($dust,20%);
        color: $blackish;
        color: #fff;
        margin-bottom: 1em;
        clear:both;
        // display: grid;
        // grid-template-columns: 40px 50px auto 50px 40px;
        // grid-template-rows: auto auto auto;
    }
    header {
        // background-color:  var(--v-secondary-base);
        // background-color: $greyBrown;
        font-size: 1.5rem;
        line-height: 1.75rem;
        font-family: $narrow;
                        // border-bottom: 1px solid $avocado;

        color: $avocado;
        // background-color: $greyBrown;
        // margin-bottom: 0.5em;
        // border-bottom: 1px solid $avocado;
        // padding-bottom: .5rem;
    }
    .snippet {
        // color: $blackish;
        // display: inline-block;
    }
    footer {
        text-align: right;
        // background-color: $avocado;
        // color: $blackish;
        // clear: both;
        font-size: .8rem;
        clear: both;
        color: $avocado;
    }
    .has-image {
        header {
            // padding-left: 1rem;
            // margin-left: 1rem;
        }
    }
    .article-img {
        float: left;
        margin-right: 1rem;

        // width: 25%;
        // max-width: 25%;
        // height: 100%;
        img {
            // width: 25%;
            height: 9rem;
            width: 9rem;
            max-width: 100%;
            object-fit: cover;
        }
        // width: 100%;
        // max-width: 25%;
    }   
    /* styles for '...' */ 
    .snippet {

// padding-bottom: 5rem;
        padding-top: 0.5rem;
        margin-bottom: 0;
    /* hide text if it more than N lines  */
    overflow: hidden;
    /* for set '...' in absolute position */
    position: relative; 
    /* use this value to count block height */
    line-height: 1.2em;
    /* max-height = line-height (1.2) * lines max number (3) */
    // max-height: 4.8em;
    max-height: 5.6rem;
    /* fix problem when last visible word doesn't adjoin right side  */
    // text-align: justify;  
    /* place for '...' */
    // margin-right: -1em;
    // padding-right: 1em;
    }
    /* create the ... */
    .snippet:before {
        content:'';
        width:100%;
        height:100%;    
        position:absolute;
        left:0;
        top:0;
        background:linear-gradient(transparent 70%, $background);
    }
}
</style>
