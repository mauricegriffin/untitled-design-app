import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
// import rssParser from 'rss-parser'
import UnsplashService from "@/services/UnsplashService";
import UnsplashJson from "@/services/unsplash.json";
import moment from 'moment';
// TODO uninstall vue-lodash, just load individual functions
// import _ from 'lodash';

import stringHash from 'string-hash'
// import pathify from 'vuex-pathify'


Vue.use(Vuex)
Vue.use(VueAxios, axios)

export default new Vuex.Store({
  state: {
    appTitle: "Untitled Design App",
    // corsProxy: 'https://cors-anywhere.herokuapp.com/', //cors.io //
    rss2jsonUrl: 'https://api.rss2json.com/v1/api.json?rss_url=',
    rss2jsonApiKey: '2dmmy94izwcwtfmneqscejmhbrl8m1taptujijgy',

    // corsProxy: 'https://api.rss2json.com/v1/api.json?rss_url=',
    defaultRSSFeeds: [
      'https://feeds.feedburner.com/webdesignerdepot/?format=json',
      'https://thenextweb.com/dd/feed/',
      'https://www.smashingmagazine.com/feed',
      'https://webdesign.tutsplus.com/posts',
      'https://www.awwwards.com/blog/feed',
      'https://www.creativebloq.com/feed',
      'https://www.hongkiat.com/blog/category/design/feed/',
      'https://feeds.feedburner.com/tympanus'
    ],
    rssFeedArticles: [],
    rssFeedArticlesLoading: false,
    rssResultsAge: false,
    trendingColors: [],
    imageSearches: [],
    selectedArticle: false,
    selectedArticleId: false
  },
  actions: {
    getColors({commit}) {
      axios.get(this.state.rss2jsonUrl+encodeURIComponent('https://feeds.feedburner.com/Colorcomboscom')+'&api_key='+this.state.rss2jsonApiKey)
        .then(function (e) {


          let colorResults = [];
          let feed = e.data.feed;
          e.data['items'].forEach(i => {
            let result = {};
            // * add feed data to item, will be more useful when other palette sources are added
            result.feed = feed;
            // * result.open set for triggering Flipped animation
            result.open = false;
            // * make a hash for unique key
            result.paletteId = stringHash(i.content);
            // * extract palette colors from content 
            result.colors = i['content'].match(/[#]\b.{6}/g);
            // console.log(result)
            colorResults.push(result);
          });
          // return colorResults;

          // console.log(e.data)
          commit('SET_COLORS', colorResults)
        })
    },
    imageSearch({commit}, searchQuery) {
      if (searchQuery) {
        UnsplashService.getSearchResults(searchQuery)
          .then(function (e) {
            commit('SET_PHOTOS', e.data.results)
          })
      } else {
        commit('SET_PHOTOS', UnsplashJson.results)
      }
    },
    getRss({commit}) {
      let rssRequests = [];
      let rssUrl = '';
      for (let i = 0; i < this.state['defaultRSSFeeds'].length; i++) {
        rssUrl = encodeURIComponent(this.state.defaultRSSFeeds[i])
        rssRequests.push(axios.get(this.state.rss2jsonUrl+rssUrl+'&api_key='+this.state.rss2jsonApiKey))
      }

      Promise.all(
        rssRequests.map(p => p.catch(e => e))
      ).then(function (e) {
        return e.filter(result => !(result instanceof Error));
      }).then(function (e) {
        commit('SET_RSS', e)
      })

    }

  },
  mutations: {
    SET_COLORS(state, colors) {
      state.trendingColors = colors;
    },
    SET_PHOTOS(state, results) {
      state.imageSearches = results;
    },
    SET_RSS(state, results) {
      state.rssFeedArticles = results;
    }
  },
  getters: {
    rssFeed: function (state) {
      let rssItemList = [];
      state['rssFeedArticles'].forEach(function (result) {
        result = result.data;
        /*
            grab the source title of the RSS response, for adding to each article object
        */
        let feedSource = result.feed;

        result.items.forEach(function (i) {
          i.source = feedSource;
          i.articleId = stringHash(i.link);

          let thumbnailUrl = i.thumbnail ? i.thumbnail : false;

          i.topImage = false;
          let articleImg = false;

          const parser = new DOMParser();
          let temporalDivElement = parser.parseFromString((i['content:encoded'] ? i['content:encoded'] : i.content), 'text/html');
          articleImg = temporalDivElement.querySelector('img') ? temporalDivElement.querySelector('img') : false;

          i.thumbnailFromArticle = false;

          if (thumbnailUrl && articleImg) {
            if (thumbnailUrl === articleImg.getAttribute('src')) {
              i.thumbnailFromArticle = true;
            }
          }
          if (thumbnailUrl) {
            i.img = thumbnailUrl;
            i.topImage = true;
          }
          if (articleImg && !i.thumbnail) {

            let imgWidth = Number.parseInt(articleImg.getAttribute('width'));
            let imgHeight = Number.parseInt(articleImg.getAttribute('height'));
            i.topImage = true ? ((Number.isInteger(imgWidth) && Number.isInteger(imgHeight)) && (imgWidth > imgHeight) && (imgWidth > 299)) : false;

            // if there is no rss feed icon, and the image is icon sized, use as feed icon
            if ((!i.source.image) && (imgWidth < 50)) {
              i.source.image = {
                url: articleImg.getAttribute('src'),
                title: i.source.title
              }
            } else {
              i.img = articleImg.getAttribute('src')
            }
          }
          /*
              set postAge to "X days/hours ago"
              set unixTime to unix epoch time (sec) for sorting articles by time
          */
          let postDate = moment(i.pubDate);
          i.postAge = postDate.fromNow();
          i.unixTime = postDate.unix();

          rssItemList.push(i);
        })
      });
      return rssItemList;
    },
    // ! figure this one out
    articleById: (getters) => id => {

    },
    rssColorPalettes: function (state) {
      let colorResults = [];
      let feed = state.trendingColors.feed;
      state.trendingColors['items'].forEach(e => {
        let result = {};
        // * add feed data to item, will be more useful when other palette sources are added
        result.feed = feed;
        // * result.open set for triggering Flipped animation
        result.open = false;
        // * make a hash for unique key
        result.paletteId = stringHash(e.content);
        // * extract palette colors from content 
        result.colors = e['content'].match(/[#]\b.{6}/g);
        // console.log(result)
        colorResults.push(result);
      });
      return colorResults;
    }
  }
});