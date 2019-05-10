<template>
  <v-container class="single-article-page" full-height>
    <v-layout full-height>
      <v-flex full-height>
        <Flipped :flipId="(theArticle.articleId).toString()" stagger="article" @on-start="handleStart">
          <main class="single-article">
            <Flipped :inverseFlipId="(theArticle.articleId).toString()">

              <span>
                <a href="#" @click="goBack" class="accent--text">Back</a>
              <v-img class="featured-image" :src="theArticle.img" cover v-if="!theArticle.thumbnailFromArticle"></v-img>
              <Flipped :flipId="`title-${theArticle.articleId}`" stagger="article">
                <h1 class="headline mb-3 mt-2">
                  {{theArticle.title}}
                </h1>
              </Flipped>
              <transition name="fade">
              <v-divider class="warning"></v-divider>
              </transition>
              <section class="article-source py-2">
                <Flipped :flipId="`source-img-${theArticle.articleId}`" stagger="article">
                  <span>
                    <img v-if="theArticle.source.image" :src="theArticle.source.image" :alt="theArticle.source.title" />
                  </span>
                </Flipped>
                <Flipped :flipId="`source-title-${theArticle.articleId}`" :key="`source-title-${theArticle.articleId}`"
                  translate stagger="article">
                  <span>
                    {{theArticle.source.title}} / {{postDate}}<template v-if="theArticle.author"> / by
                      {{theArticle.author}}</template>
                  </span>
                </Flipped>
              </section>
              <transition name="fade">

                <v-divider class="mb-3 warning"></v-divider>
              </transition>
              <transition name="fade">
                <article class="single-article__content" v-html="theArticle.content"></article>
              </transition>
              <v-btn :href="theArticle.link" target="_blank" color="accent" round class="black--text">
                Read Original
              </v-btn>
              </span>
            </Flipped>
          </main>
        </Flipped>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

import {Flipped} from "vue-flip-toolkit";
import moment from 'moment';

export default {
  name: 'singleArticle',
  components: {
    Flipped
  },
  data: function() {
    return {
      theArticle: this.$store.state.selectedArticle,
    };
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    fadeOut({ el }) {
      console.log(el)
      // this.slidePanelLoaded = true;
    },
    
    handleStart({ el, id }) {
        // console.log("Started")
        // setTimeout(() => {
      el.classList.add("animated-in");
        // }, 600);
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
  // padding-top: 20em;
  transform: translate3d(0, 20rem, 0);
  opacity: 0;
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

.animated-in {
  .single-article__content {
  transform: translate3d(0, 0, 0);

  opacity: 1;
  transition: opacity transform 1s;
}}
</style>
