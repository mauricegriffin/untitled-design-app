import DesignQuotesApi from "@/services/DesignQuotesApi";

export default {
  getQuotes(num) {
    return DesignQuotesApi().get(
      "?filter[orderby]=rand&filter[posts_per_page]=" + num
    );
    // console.log(param)
    // return false;
  }
  // getWordDetails (params) {
  //   return Api().get('/entries/' + params)
  // }
};

// https://api.unsplash.com/search/photos?client_id=29517675ca2b6b0aae8795b6a3fb3bdc18f1f17521ca79e8af2017ee15778e3b&page=1&query=
