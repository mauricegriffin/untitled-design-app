import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'vuetify/src/stylus/app.styl';
import VueMoment from 'vue-moment';

Vue.use(
  Vuetify, {
    theme: {
      primary: '#3b7080', //teal
      secondary: '#5a5353', //greyBrown
      accent: '#ade25d', //avocado
      error: '#461220',
      info: '#f6d8ae', //tan
      success: '#a0a083', //dust
      warning: '#FF715B', //coral
      teal: '#3b7080' //teal
    },
    options: {
      customProperties: true
    },
    iconfont: 'md',
  },
  VueMoment
)
