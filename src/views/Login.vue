<template>
    <v-container fluid>
        <v-layout>
            <v-flex>
                <h1>Sign In Page</h1>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-btn v-on:click.stop="loginSuccess">
                LOGIN
            </v-btn>

        </v-layout>
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