<template>
  <v-app>
    <AppNavigation v-if="!['home'].includes($route.name)"></AppNavigation>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import AppNavigation from "@/components/AppNavigation.vue";


export default {
  name: 'App',
  components: {
    AppNavigation,
  },
  data () {
    return {
      //
    }
  }
}
</script>

<style lang="scss">

</style>

