<template>
    <v-container fluid grid-list-lg>
        <v-layout v-if="!loading" fill-height row wrap>
            <v-flex xs12>
                <Flipped v-for="(item, index) in orderedRss" v-bind:key="(item.articleId).toString()" :flipId="(item.articleId).toString()" stagger="article" @on-start="animateOut">
                    <v-card tag="article" v-bind:class="{ 
                                'has-image': item.img, 
                                'has-feature-image': item.topImage 
                            }" class="elevation-10">
                        <Flipped :inverseFlipId="(item.articleId).toString()">
                            <span>
                                <span @click="handleNavigate(item.articleId)">
                                                            <!-- <Flipped :inverseFlipId="(item.articleId).toString()"> -->
                                    <transition name="fade">
                                    <v-img class="white--text feature-image" :src="item.img" v-if="item.topImage">
                                    </v-img>
                                    </transition>  <!-- </Flipped> -->
                                    <Flipped :flipId="`title-${item.articleId}`" stagger="article">
                                        <h1>{{item.title}}</h1>
                                    </Flipped>
                                </span>
                                <v-card-text class="content-snippet">
                                    {{(item.description ? item.description : item.contentSnippet) | striphtml}}
                                </v-card-text>
                                <v-divider></v-divider>
                                <v-card-actions class="px-3 pb-2 caption">
                                    <Flipped :flipId="`source-img-${item.articleId}`" stagger="article"
                                        v-if="item.source.image">
                                        <img :src="item.source.image" :alt="item.source.title"
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
                            </span>
                        </Flipped>
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
import {Flipped} from "vue-flip-toolkit";

export default {
    name: 'news',
    components: {
        Flipped
    },
    data: () => {
        return {
            // loading: false
            // loading: 
        }
    },
    methods: {
        animateOut({el}){
            // alert('animate-out')
            el.classList.add('animate-out');
        },
        handleNavigate(id) {
            let self = this
            id = parseInt(id)
            for (let i = 0; i < this.orderedRss.length; i++) {
                if (this.orderedRss[i].articleId == id) {
                    self.$store.state.selectedArticle = this.orderedRss[i];
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
        articleSelected() {
            return this.$store.state.selectedArticle
        },
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

    &.animate-out {
        .feature-image {
            // opacity: 0;
            // transition: opacity 1s;
        }
    }

    header {
        height: 100%;
        width: 100%;
    }
    h1 {
        padding: 1rem 1rem 0;
    }
}

</style>

