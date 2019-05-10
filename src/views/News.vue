<template>
<div>
    <Flipper :flipKey="key" scale>
      <router-view></router-view>
    </Flipper>
    </div>
</template>
<script>

import {Flipper} from "vue-flip-toolkit";

export default {
  components: {
    Flipper
  },
  data: function() {
    return {
      // theArticle: this.$store.state.selectedArticle,
    };
  },
  methods: {
    
  },
  created: function() {

  },
  computed: {
    key() {
      return this.$route.path;
    }
  }
};

</script>