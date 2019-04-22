<template>
    <!-- <v-container fluid> -->
        <!-- <v-layout> -->
            <!-- <h1>Colors Page</h1> -->
<v-layout>
    <v-flex xs12>

        <v-card tag="article" v-for="(item, index) in paletteList" class="elevation-5 palette-card">
            <v-card-text>
            <div class="color-palette" row fluid>
                 
                <div v-for="color in item" v-bind:style="{backgroundColor: color}" class="color-sample">
                    &nbsp;
                </div>

            </div>
            <p>
                <span v-for="color in item">
                    {{color}}
                </span>
            </p>
            </v-card-text>

        <!-- <div v-html="item['content:encoded']"> -->
            <!-- {{item}} -->
        <!-- </div> -->
        </v-card>





        <!-- <div class="primary">PRIMARY</div>
        <div class="secondary">SECONDARY</div>
        <div class="accent">ACCENT</div>
        <div class="error">ERROR</div>
        <div class="info">INFO</div>
        <div class="success">SUCCESS</div>
        <div class="warning">WARNING</div>
<br><br>
        <div class="new-primary">PRIMARY</div>
        <div class="new-secondary">SECONDARY</div>
        <div class="new-accent">ACCENT</div>
        <div class="new-error">ERROR</div>
        <div class="new-info">INFO</div>
        <div class="new-success">SUCCESS</div>
        <div class="new-warning">WARNING</div> -->
</v-flex>
</v-layout>
        <!-- </v-layout> -->
    <!-- </v-container> -->
</template>
<script>

import rssParser from 'rss-parser';
import _ from 'lodash';

export default {
    name: 'colors',
    data: () => {
        return {
            paletteList: [],
            loading: true
        };
    },
    methods: {
        async getColors() {
            // let self = this;
            // let rssColorRequests = [];
            // let colorFeeds = [
            //     'https://feeds.feedburner.com/Colorcomboscom',
            //     'https://feeds.feedburner.com/ColourloversPalettes/New'
            // ]
            // for (let i=0; i<colorFeeds.length; i++) {
            //     let parser = new rssParser();
            //     rssColorRequests.push(parser.parseURL(this.$store.state.corsProxy+colorFeeds[i]));
            // }
            // /* sets responses to variable once feeds have all been retrieved */
            // let results = await Promise.all(
            //     rssColorRequests.map(p => p.catch(e => e))    
            // );
            // /* filter out failed requests */   
            // results = results.filter(result => !(result instanceof Error));
            // this.paletteList = results;

            let parser = new rssParser();
            let results = await parser.parseURL(this.$store.state.corsProxy+'https://feeds.feedburner.com/Colorcomboscom')
            // this.paletteList = results.items;
            results['items'].forEach(e => {
                console.log(e)
                var contentString = e.content;
                let result = contentString.match(/[#]\b.{6}/g);
                this.paletteList.push(result)
                // console.log(result)
            });
            // console.log(results.items)
        }
    },
    created: function() {
        if (!this.paletteList.length) {
            this.getColors();
        }
    },
};
</script>

<style lang="scss">

.palette-card {
    // height: 300px;
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

.color-palette {
    height: 100%;
    // width: 16.66%;
    width: 100%;
    // display: grid;
    // grid-template-rows: auto;
    // grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
}

.color-sample {
    display: inline-block;
    height: 100%;
    min-height: 100px;
    width:16.66%;
}

.new-primary {
    background-color: #283f3b ;
}
.new-secondary {
    background-color: #3b7080;
}
.new-accent {
    background-color: #e4572e;
}
.new-error {
    background-color: #461220;
}
.new-info {
    background-color: #f6d8ae;
}
.new-success {
    background-color: #ade25d;
}
.new-warning {
    background-color: #4b3b40;
}
</style>