<template>
    <v-container fluid grid-list-lg>
        <v-layout row wrap tag="main">
            <v-flex>
                <v-card tag="article" class="palette-card elevation-10" v-for="(item, index) in rssColorPalettes">
                    <v-card-text>
                        <div class="palette" row fluid>
                            <span v-for="color in item" v-bind:style="{backgroundColor: color}" class="palette-color">
                                &nbsp;
                            </span>
                        </div>
                        <p>
                            <span v-for="color in item">
                                {{color}}
                            </span>
                        </p>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

// import mapState from 'vuex';
import Vuex from 'vuex';
// import _ from 'lodash';

export default {
    name: 'colors',
    data: () => {
        return {
            loading: true
        }
    },
    methods: {

    },
    created: function() {
        this.$store.dispatch('getColors');
    },
    mounted: function() {

    },
    computed: {
        // this.$store.getters.doneTodosCount;
        ...Vuex.mapGetters(['rssColorPalettes'])
    }
}
</script>

<style lang="scss">

.palette-card {
    width: 100%;
    p {
        span {
            display: inline-block;
            font-size: 94%;
            width: 16.66%;
            text-align: center;
        }
    }
}

.palette {
    display: table;
    height: 100%;
    width: 100%;
}

.palette-color {
    display: table-cell;
    height: 80px;
}

</style>

// EPD incident 19-103925