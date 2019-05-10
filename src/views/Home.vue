<template>
  <main class="home-page">
    <div class="cb cband1" v-bind:style="{ backgroundColor: '#' + colors[0] }"></div>
    <div class="cb cband2" v-bind:style="{ backgroundColor: '#' + colors[1] }"></div>
    <div class="cb cband3" v-bind:style="{ backgroundColor: '#' + colors[2] }"></div>
    <div class="cb cband4" v-bind:style="{ backgroundColor: '#' + colors[3] }"></div>

<!-- filter: drop-shadow(30px 10px 0); -->
        <!-- textShadow: '-1px -1px 0 rgba(0,0,0,0.1),1px -1px 0 rgba(0,0,0,0.1),-1px 1px 0 rgba(0,0,0,0.1),1px 1px 0 rgba(0,0,0,0.1)', -->

    <h1 class="app-title" 
      v-bind:style="{ 
        color: '#' + colors[4]
      }"
    >
    <!-- , 
        filter: 'drop-shadow(3px -3px 0 #'+colors[2]+')' -->
      Untitled Design App
    </h1>

    <div class="home-btns">
      <a @click="switchImage" class="refresh-palettes">
          <!-- text-shadow:  -1px -1px 0 #000,  
    1px -1px 0 #000,
    -1px 1px 0 #000,
     1px 1px 0 #000; -->
        <v-icon 
          v-bind:style="{
            color: '#' + colors[4]
          }"
        >
        <!-- , 
            textShadow: 
              '-1px 1px 0 #'+colors[2]+
              ', 1px -1px 0 #'+colors[2]+
              ', -1px -1px 0 #'+colors[2]+
              ',1px 1px 0 #'+colors[2] -->
            <!-- filter: 'drop-shadow(-3px 3px 0 #'+colors[3]+')' -->

          refresh
        </v-icon>
      </a>
    </div>
    <router-link 
      to="/login" 
      class="start-btn" 
      v-bind:style="{
        color: '#' + colors[0]
      }"
    >
<!-- 
    ,
        borderColor: '#' + colors[0],
        textShadow: 
          '-1px 1px 0 #'+colors[4]+
          ', 1px -1px 0 #'+colors[4]+
          ', -1px -1px 0 #'+colors[4]+
          ',1px 1px 0 #'+colors[4]
           -->
      START
    </router-link>
  </main>
</template>

<script>
import colorpallettes from "@/data/palettes.json";

export default {
  data: function() {
    return {
      colors: [],
      // imgUrl: 'https://unsplash.it/1900/1900/?random&featured',
      // bg1: true,
      // bg2: false,
      // switchingImg: false
    };
  },
  methods: {
    mixColors: function() {
      var item = colorpallettes[Math.floor(Math.random() * colorpallettes.length)];
      this.colors = item.colors;
    },
    switchImage: function() {
      let self = this;

      // setTimeout(function(){
        self.mixColors();
        // self.$refs.disintegrateFilter.beginElement();
        // setTimeout(function(){

          if (self.bg1) {
              // self.$refs.disintegrateFilter.beginElement();
              // self.$once('hook:animationEnd', function() {
              //   self.$nextTick(function(){
                  self.bg1 = false;
                // }).then(function(){
                  self.bg2 = true;
                // })
              // });
          } else {
            self.bg1 = true;
            self.bg2 = false;
          }
        //   self.$refs.reintegrateFilter.beginElement();
        //   setTimeout(function(){
        //     self.switchImage;
        //   },15000)

        // },2000)
    }
  },
  created: function() {
    this.mixColors();
  }
};
</script>

<style lang="scss" scoped>


.home-page {
  // width: 100vw;
  // height: 100vh;
  // grid-column: 1 / -1;
  // grid-row: 1 / -1;
}

.home-page {

  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
  grid-template-rows: 25vh 25vh 25vh 25vh;

  background: black url(http://unsplash.it/1900/1900/?random&featured);
  background-size: 300%;
  background-repeat: no-repeat;
  // max-height: 100vh;
  animation: panning 50s infinite linear;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: inherit;
    /*grayscale for background image*/
    -webkit-filter: grayscale(1);
    -webkit-filter: grayscale(100%);
    -moz-filter: grayscale(100%);
    filter: gray;
    filter: grayscale(100%);
    filter: url("data:image/svg+xml;utf8,<svg version='1.1' xmlns='http://www.w3.org/2000/svg' height='0'><filter id='greyscale'><feColorMatrix type='matrix' values='0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0' /></filter></svg>#greyscale");
  }

}

$colorTransition: 3s ease;


.cb {
  // mix-blend-mode: difference;
  opacity: 0.5;
  // grid-auto-rows: auto;
  transition: background-color $colorTransition;
  grid-column-start: 1;
  grid-column-end: -1;
}

.cband1 {
  grid-row-start: 1;
  grid-row-end: 2;
}
.cband2 {
  grid-row-start: 2;
  grid-row-end: 3;
}
.cband3 {
  grid-row-start: 3;
  grid-row-end: 4;
}
.cband4 {
  grid-row-start: 4;
  grid-row-end: 5;
}

.app-title {
  // margin-left: 1.3rem;
  // margin-top: 1.3rem;
  // transform: ;

  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 4;

  // mix-blend-mode: difference;
  // filter: drop-shadow(30px 10px 0);


  text-align: right;
  text-transform: uppercase;
  font-weight: bolder;
  font-size: 80px;
  line-height: 80px;
  transition: color $colorTransition;
  // position: fixed;
  // left: 1rem;
  // top: 1.3rem;
  // height: 70%;
  transform: scaleX(-1) scaleY(-1) translate3d(-1.3rem, -1.3rem, 0);
  writing-mode: vertical-rl;
}

.start-btn {
  align-self: center;
  // background-blend-mode: darken;
  // mix-blend-mode: difference;

  font-size: 40px;
  line-height: 40px;
  font-weight: bolder;
  border: 5px solid;
  padding: 10px;
  border-radius: 3px;
  text-decoration: none;
  grid-column: 2 /5;
  grid-row-start: 4;
  margin: 0 auto;
  z-index: 9;
}

@keyframes rotation {
		from {
				-webkit-transform: rotate(0deg);
		}
		to {
				-webkit-transform: rotate(359deg);
		}
}

.home-btns {
  // margin: 1.3rem 1.3rem 0 0;
  transform: translate3d(-1.3rem, 1.3rem, 0);
  grid-row-start: 1;
  grid-column-start: 5;
  text-align: right;
  z-index: 9;
  // mix-blend-mode: difference;

  .refresh-palettes {
    .v-icon {
      font-size: 80px;
      transition: transform 0.3 ease;
      transition: color $colorTransition;
      // mix-blend-mode: difference;
      animation: rotation 7s infinite linear; 
      // alternate;

    }
  }
}

@keyframes panning {
  0% {
    background-position: 0% 0%;
  }
  25% {
    background-position: 100% 100%;
  }
  50% {
    background-position: 100% 0%;
  }
  75% {
    background-position: 0% 100%;
  }
  100% {
    background-position: 0% 0%;
  }
}
</style>
