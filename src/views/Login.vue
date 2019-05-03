<template>
    <v-container fill-height fluid>
        <v-layout row wrap>
            <v-flex xs12 class="text-xs-center">
                <h1>Sign In Page</h1>
            </v-flex>

        <!-- </v-layout>
        <v-layout> -->
            <v-flex xs12 align-self-end class="text-xs-center">
                <v-btn v-on:click.stop="loginSuccess" color="accent" round class="black--text">
                    Continue without Signing In
                </v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
export default {
    name: 'login',
    methods: {
        loginSuccess: function(){
            this.$store.dispatch('getRss')
            this.$router.push('news/latest');
        }
    }
};
</script>