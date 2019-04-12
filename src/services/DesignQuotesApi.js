import axios from "axios";

export default () => {
  return axios.create({
    baseURL: `https://quotesondesign.com/wp-json/posts`,
    withCredentials: false,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });
};

// https://api.unsplash.com/search/photos?client_id=29517675ca2b6b0aae8795b6a3fb3bdc18f1f17521ca79e8af2017ee15778e3b&page=1&query=
