import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import rssParser from 'rss-parser';

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export default new Vuex.Store({
  state: {
    appTitle: "Untitled Design App",
    corsProxy: 'https://cors-anywhere.herokuapp.com/', //cors.io //
    defaultRSSFeeds: [
      'https://feeds.feedburner.com/webdesignerdepot/?format=xml',
      'https://thenextweb.com/dd/feed/',
      'https://www.smashingmagazine.com/feed',
      'https://webdesign.tutsplus.com/posts',
      'https://www.awwwards.com/blog/feed',
      'https://www.creativebloq.com/feed',
      'https://www.hongkiat.com/blog/category/design/feed/',
      'https://feeds.feedburner.com/tympanus'
    ],
    rssFeedArticles: [],
    rssColorPalettes: [],
    imageSearches: []
  },
  actions: {
    getColors() {
      let parser = new rssParser();
      parser.parseURL(this.$store.state.corsProxy + 'https://feeds.feedburner.com/Colorcomboscom')
        .then(r => r.data)
        .then(colors => {
          commit('SET_COLORS', colors)
        })
    }
  },
  mutations: {
    SET_COLORS(state, colors) {
      let colorResults = [];
      colors['items'].forEach(e => {
        console.log(e)
        // var contentString = e.content;
        let result = contentString['content'].match(/[#]\b.{6}/g);
        colorResults.push(result)
      });
      state.rssColorPalettes = colorResults;
    }
  }
});