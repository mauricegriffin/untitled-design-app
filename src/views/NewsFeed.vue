<template>
    <v-container fluid grid-list-lg>
        <v-layout v-if="!loading" fill-height row wrap>
            <v-flex xs12>
                <Flipped v-for="(item, index) in orderedRss" v-bind:key="item.articleId" :flipId="item.articleId" stagger="article">
                    <v-card tag="article" v-bind:class="{ 
                                'has-image': item.img, 
                                'has-feature-image': item.topImage 
                            }" class="elevation-10"
                            >


                             <!-- v-for="(item, index) in orderedRss" v-bind:key="item.articleId" -->



                            <!-- <Flipped :inverseFlipId="item.article"> -->
                        <span @click="handleNavigate(item.articleId)">

                            <!-- <v-layout v-if="item.img && !item.topImage">
                                <v-card-title class="pb-0" tag="header">
                                    <v-flex xs5 align-center row>
                                        <v-img :src="item.img" contain max-width="125px" max-height="125px"
                                            justify-center class="pb-0"></v-img>
                                    </v-flex>
                                    <v-flex xs7 align-end tag="header">
                                        <h1>
                                            {{item.title}}
                                        </h1>
                                    </v-flex>
                                </v-card-title>
                            </v-layout> -->
                            <!-- has no image for article -->
                            <!-- <v-card-title v-if="!item.img" class="darken-3 pb-0" tag="header">
                                <h1>{{item.title}}</h1>
                            </v-card-title> -->

                            <!-- has featured-image / topImage -->
                                        <Flipped :inverseFlipId="item.articleId" translate opacity stagger="article">

                            <v-img class="white--text feature-image" :src="item.img" v-if="item.topImage"></v-img>
                                        </Flipped>
                                <!-- <header> -->
                                    <Flipped :flipId="`title-${item.articleId}`" translate stagger="article">

                                        <h1>{{item.title}}</h1>
                                    </Flipped>
                                <!-- </header> -->

                        </span>
                        <Flipped :inverseFlipId="item.articleId">
                            <v-card-text class="content-snippet">
                                {{(item.description ? item.description : item.contentSnippet) | striphtml}}
                            </v-card-text>
                        </Flipped>

                        <v-divider></v-divider>


                        <v-card-actions class="px-3 pb-2 caption">
                            <Flipped :flipId="`source-${item.articleId}`" stagger="article">
                                <img v-if="item.source.image" :src="item.source.image" :alt="item.source.title"
                                    :width="item.source.image.width" :height="item.source.image.height" />
                            </Flipped>
                            <Flipped :flipId="`source-title-${item.articleId}`" stagger="article">
                                <span class="source">
                                    {{item.source.title}}&nbsp;
                                </span>
                            </Flipped>
                            <v-spacer></v-spacer>
                            <span class="time">
                                {{item.postAge}}
                            </span>
                        </v-card-actions>
                            <!-- </Flipped> -->
                    </v-card>
                </Flipped>
            </v-flex>
        </v-layout>
        <v-layout v-if="loading" fill-height row wrap>
            <v-layout fill-height justify-center align-center>
                <v-progress-circular :size="55" :width="3" color="accent" indeterminate></v-progress-circular>
            </v-layout>
        </v-layout>
    </v-container>
</template>

<script>

import Vuex from 'vuex';
import _ from 'lodash';
import { Flipper, Flipped } from "vue-flip-toolkit";

export default {
    name: 'news',
    components: {
        Flipped,
        Flipper
    },
    data: () => {
        return {
            articleSelected: this.$store.state.selectedArticle
            // loading: false
            // loading: 
        }
    },
    methods: {
        handleNavigate(id) {
            id = parseInt(id)
            for (let i = 0; i < this.orderedRss.length; i++) {
                if (this.orderedRss[i].articleId == id) {
                    this.$store.state.selectedArticle = this.orderedRss[i];
                }
            }            
            this.$router.push(`article/${id}`);
        }
    },
    created: function() {
        if (this['rssFeed'].length < 1) {
            this.$store.dispatch('getRss')
        }
    },
    computed: {
        orderedRss() {
            return _.orderBy(this.rssFeed, 'unixTime').reverse()
        },
        ...Vuex.mapGetters(['rssFeed']),
        loading() {
            return this.$store.state.rssFeedArticlesLoading
        }
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
    font-size: 13px;
    line-height: 17px;
    height: 52px;
    overflow: hidden;
    margin-bottom: 12px;
}

article {
    .source {
        max-width: 70%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    span.time {
        width: 12rem;
        text-align: right;
    }
    
}

article.has-feature-image {

    .feature-image {
        max-height: 225px;
        border-top-left-radius: 1.5rem;
        border-top-right-radius: 1.5rem;
    }

    header {
        height: 100%;
        width: 100%;
        // display: grid;
        // grid-template-columns: 1fr;
        // grid-template-rows: 1fr 1fr auto;
    }

    h1 {
        // background:
        //     linear-gradient(rgba(0, 0, 0, 0),
        //     rgba(0, 0, 0, 0.30) 33%,
        //     rgba(0, 0, 0, 0.45) 66%,
        //     rgba(0, 0, 0, 0.60),
        //     );
        // grid-column: 1 / 1;
        // grid-row: 3 / 4;
        padding: 1rem 1rem 0;
    }
}

</style>

