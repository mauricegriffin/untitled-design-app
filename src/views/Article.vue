<template>
        <Flipped :flipId="theArticle.articleId" stagger="article">

  <v-container class="single-article-page" full-height>
                <!-- <Flipped :inverseFlipId="theArticle.articleId"> -->

    <v-layout full-height>
      <v-flex full-height>
          <main class="single-article">
                        <Flipped :inverseFlipId="theArticle.articleId" translate="true">

            <v-img class="featured-image" :src="theArticle.img" cover v-if="!theArticle.thumbnailFromArticle"></v-img>
                        </Flipped>

            <Flipped :flipId="`title-${theArticle.articleId}`" translate stagger="article">
              <h1 class="headline mb-3 mt-2">
                {{theArticle.title}}
              </h1>
            </Flipped>
            <v-divider></v-divider>
            <!-- <Flipped :flipId="`source-${theArticle.articleId}`">
          <img v-if="theArticle.source.image" :src="theArticle.source.image" :alt="theArticle.source.title"
              :width="theArticle.source.image.width" :height="theArticle.source.image.height" />
          <span class="source">
              {{theArticle.source.title}}&nbsp;
          </span>
          </Flipped> -->
          <!-- <v-layout> -->
            <!-- <v-flex row align-baseline class="source"> -->
                <section class="article-source py-2">
      <!-- <v-flex xs12> -->
            <Flipped :flipId="`source-img-${theArticle.articleId}`" stagger="article">
              <span>
              <img v-if="theArticle.source.image" :src="theArticle.source.image" :alt="theArticle.source.title"/>
            </span>
            </Flipped>
            <Flipped :flipId="`source-title-${theArticle.articleId}`" :key="`source-title-${theArticle.articleId}`" translate stagger="article">
              <span>
                {{theArticle.source.title}} / {{postDate}}<template v-if="theArticle.author"> / by {{theArticle.author}}</template>
              </span>
            </Flipped>
      <!-- </v-flex> -->
                </section>
                <v-divider class="mb-3"></v-divider>
<!-- </v-flex>
            </v-layout> -->
            <transition name="fade">
                                    <!-- <Flipped :inverseFlipId="theArticle.articleId"> -->
            <article class="single-article__content" v-html="theArticle.content"></article>
                                      </transition>
                                    <!-- </Flipped> -->
            <!-- </transition> -->
            <v-btn :href="theArticle.link" target="_blank" color="accent" round class="black--text">
             Read Original
            </v-btn>
            <!-- <h6>{{theArticle.source.title}}</h6> -->
          </main>
      </v-flex>
    </v-layout>
                <!-- </Flipped> -->

  </v-container>
        </Flipped>

</template>

<script>

import { Flipper, Flipped } from "vue-flip-toolkit";
import moment from 'moment';

export default {
  name: 'singleArticle',
  components: {
    Flipped,
    Flipper
  },
  data: function() {
    return {
      theArticle: this.$store.state.selectedArticle,
    };
  },
  methods: {
    fadeOut({ el }) {
      console.log(el)
      // this.slidePanelLoaded = true;
    },
  },
  created: function() {
    window.scrollTo(0, 0);
  },
  computed: {
    postDate() {
      return moment(this.$store.state.selectedArticle.pubDate).format('MMMM Do YYYY'); 
    }
  }
};</script>

<style lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
  .single-article-page {
        background: $darkBackground;
  }
  .article-source {
    display: table;
    vertical-align: middle;
    img {
      display: table-cell;
      // display: inline-block;
      max-height: 32px;
      max-width: 32px;
      margin-right: .75rem;
    }
    span {
      display: table-cell;
      vertical-align: middle;
      // display: inline-block;
      // line-height: 32px;
    }
    // line-height: 32px;
  }
  .single-article {
    & > .v-image {
      // max-width: 200px;
      // max-height: 200px;
      // border-radius: 50%;
    }
  }
.single-article__content {
  h1,h2,h3,h4 {
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    a {
      text-decoration: none;
    }
  }
 a {
   color: $avocado;
 }
  img {
    max-width: 100%;
    height: auto;
  }
  img[width="100%"] {
    margin-bottom: 1.5rem;
  }
  article {
    header {
      display: none;
    }
  }
}
</style>
