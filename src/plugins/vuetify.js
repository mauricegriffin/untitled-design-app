import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'vuetify/src/stylus/app.styl';
import VueLodash from 'vue-lodash';
import VueMoment from 'vue-moment';

Vue.use(
  Vuetify, {
    theme: {
      primary: '#283f3b',
      secondary: '#3b7080',
      accent: '#e4572e',
      error: '#461220',
      info: '#f6d8ae',
      success: '#ade25d',
      warning: '#4b3b40'
    },
    options: {
      customProperties: true
    },
    iconfont: 'md',
  },
  VueLodash,
  VueMoment
)
