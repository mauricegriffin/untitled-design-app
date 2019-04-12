<template>
    <v-container fluid>
        <v-layout>
            <h1>Sign In Page</h1>
        </v-layout>
        <v-btn v-on:click.stop="loginSuccess">
            LOGIN
        </v-btn>
    </v-container>
</template>
<script>
export default {
    name: 'login',
    methods: {
        loginSuccess: function(){
            // this.$store.dispatch('getRssResults');
            this.$router.push('news');
        }
    }
};
</script>