<template>
    <v-container fluid grid-list-lg>
        <Flipper :flipKey="focused" :staggerConfig="staggerConfig">
            <v-layout row wrap tag="main">
                <v-flex>
                    <span v-for="(item, index) in colorPalettes" v-bind:key="item.paletteId" @click="toggleItem(index)">
                        <Flipped v-if="index !== focused" :flipId="`palette-${item.paletteId}`" stagger="card"
                            :shouldInvert="shouldFlip(item.paletteId)">
                            <!--  -->

                            <v-card tag="article" class="palette-card elevation-10">
                                <Flipped :inverseFlipId="`palette-${index}`">
                                    <div class="palette" row fluid>

                                        <!-- <div class="palette" row fluid> -->
                                            <Flipped v-for="(color, colorIndex) in item.colors" :key="color"
                                                :flipId="`color-${item.paletteId}-${colorIndex}-${color}`"
                                                stagger="card-content" :shouldFlip="shouldFlip(item.paletteId)">

                                                <span class="palette-color"
                                                    v-bind:style="{backgroundColor: color}">&nbsp;</span>

                                            </Flipped>
                                                                                <!-- <v-card-actions>
                                        <v-btn>
                                            <v-icon>heart</v-icon>
                                        </v-btn>
                                    </v-card-actions> -->
                                        <!-- </div> -->
                                    </div>

                                </Flipped>
                            </v-card>
                        </Flipped>

                        <Flipped 
                            v-else
                            @on-start="handleStart" 
                            :flipId="`palette-${index}`" stagger="card">
                            <!-- ! @on-complete="handleComplete" -->

                            <v-card tag="article" class="palette-card palette-card-expanded elevation-10">
                                <Flipped :inverseFlipId="`palette-${index}`">
                                    <span>
                                        <!-- <h1>Expanded</h1> -->

                                        <div class="palette" row fluid>
                                            <Flipped v-for="(color, colorIndex) in item.colors" :key="color"
                                                :flipId="`color-${item.paletteId}-${colorIndex}-${color}`"
                                                stagger="card-content">
                                                 <!-- :shouldFlip="shouldFlip(item.paletteId)"> -->

                                                <span class="palette-color"
                                                    v-bind:style="{backgroundColor: color}">{{color}}</span>

                                            </Flipped>
                                        </div>
                                    </span>
                                </Flipped>
                            </v-card>
                        </Flipped>
                    </span>


                </v-flex>
            </v-layout>
          
          
 

        </Flipper>

    </v-container>
</template>

<script>

// import mapState from 'vuex';
// import Vuex from 'vuex';
import { Flipper, Flipped } from "vue-flip-toolkit";

// import _ from 'lodash';
export default {
    name: 'colors',
    components: {
        Flipped,
        Flipper
    },
    data: () => {
        return {
            loading: true,
            focused: null
        }
    },
    methods: {
        handleStart(e) {
            // console.log("Started")
            // setTimeout(() => {
                e.classList.add("animated-in");
            // }, 600);
        },
        // handleComplete({ el, id }) {
        //     console.log(el, id)
        // },
        shouldFlip(index) {
            return (prev, current) => {
                // console.log(prev,current)
                return index === prev || index === current;
            };
        },
        toggleItem(index) {
            if (this.focused === index) {
                this.focused = null;
            } else {
                this.focused = index;
            }
            // console.log(this.colorPalettes[index].open)

            this.colorPalettes[index].open = !this.colorPalettes[index].open;
            // console.log(this.colorPalettes[index].open)

        }
    },
    created: function () {
        this.$store.dispatch('getColors');
    },
    mounted: function () {

    },
    computed: {

        colorPalettes() {
            return this.$store.state.trendingColors
        },

        // this.$store.getters.doneTodosCount;
        // ...Vuex.mapGetters(['rssColorPalettes']),
        staggerConfig() {
            return {
                card: {
                    reverse: this.paletteSelected !== null ? true : false,
                    speed: 0.85
                }
            };
        },
        key() {
            return this.$store.state.trendingColors.map(item => item.open.toString()).join("");
        }
    }
}
</script>

<style lang="scss">

.palette-card {
    padding: 1rem;
    width: 100%;

}

.palette {
    display: table;
    height: 100%;
    width: 100%;
}

    .palette-color {
        display: table-cell;
        height: 80px;
        max-width: 80px;
        &:first-child {
            border-top-left-radius: 1rem;
            border-bottom-left-radius: 1rem;
        }
        &:last-child {
            border-top-right-radius: 1rem;
            border-bottom-right-radius: 1rem;
        }
    }

.palette-card-expanded {
        .palette {
            display: block;
            height: auto;
            width: auto;
        }
        .palette-color {
            display: block;
                height: 60px;
            &:first-child {
                border-top-left-radius: 1rem;
                border-top-right-radius: 1rem;
                border-bottom-left-radius: 0;
            }
            &:last-child {
                border-bottom-left-radius: 1rem;
                border-bottom-right-radius: 1rem;
                            border-top-right-radius: 0;

            }
        }
    }

@keyframes growColor {
  0% {
    // opacity: 0;
    // max-width: 
    max-width: 80px;
    // transform: translateY(20px);
  }
  100% {
      max-width: 100%;
      width: 100%;
    // opacity: 1;
  }
}

.animated-in {
    .palette-color {
      animation: growColor 0.4s forwards;
      &:nth-of-type(2) {
          animation-delay: 0.1s;
      }
      &:nth-of-type(3) {
          animation-delay: 0.15s;
      }
      &:nth-of-type(4) {
          animation-delay: 0.2s;
      }
      &:nth-of-type(5) {
          animation-delay: 0.25s;
      }
      &:nth-of-type(6) {
          animation-delay: 0.3s;
      }
    }
}
</style>

// EPD incident 19-103925