import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appTitle: "Untitled Design App",
    corsProxy: 'https://cors-anywhere.herokuapp.com/', //cors.io //
    defaultRSSFeeds: [
      'http://feeds.feedburner.com/webdesignerdepot/?format=xml',
      'https://thenextweb.com/dd/feed/'
    ],
    rssFeedResults: []
  },
  mutations: {
    // addRssResults(state, payload) {
    //   let rssFeed = {};
      // console.log(payload);
      // state.rssFeedResults += payload;
      // payload.forEach(function(result){
      //   // console.log(result.data)
      //   let rssFeed = result.data;

      //   // console.log(feed.title);
      //   // feed.items.forEach(function(entry) {
      //   //   console.log(entry.title + ':' + entry.link);
      //   // })
      //   let parser = new rssParser();

      //   parser.parseString(rssFeed, function(parsed){
      //     state.rssFeedResults += JSON.stringify(parsed);
      //     console.log(JSON.stringify(parsed));
      //   })
      // });
    // }
  },
  actions: {
    // async getRssResults({state, commit}) {
    //   let rssRequests = [];
    //   let rssResults = [];
    //   let feeds = state.defaultRSSFeeds;
    //   // const parser = new rssParser();

    //   for (let i=0; i<feeds.length; i++) {
    //     // rssResults.push('result'+i);
    //     // copy.push(items[i]);
    //     rssRequests.push(axios.get(state.corsProxy+feeds[i]));
    //   }

    //   Promise.all(rssRequests)
    //     .then(allResponses => {
    //       commit('addRssResults', allResponses);

    //     })
    // }
  }

      // state.defaultRSSFeeds.forEach(element => {
      //   rssRequests.push(axios.get(state.corsProxy+element));
      // });
    //   axios.all(rssRequests)
    //     .then(axios.spread(function(results) {
    //       let rssParse = new rssParser();

    //       results.forEach(function(e){
    //         let result = e.text();
    //         rssParse.parseString(result, function(parsed) {
    //           commit('addRssResults', parsed);
    //         });
    //       })
    //       console.log(results)
    //     }));
    // }
  // getters: {
  //   getRss: state => {
  //     return state.rssFeedResults;
  //   }
  // }
});