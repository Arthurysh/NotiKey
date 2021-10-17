<template>
  <my-section class="section-partners">
      <div class="benefit-title">
      <h2>Наши партнеры</h2>
    </div>
  <carousel :settings="propSettings" :breakpoints="breakpointsSlider">
    <slide v-for="slide in slideItems" :key="slide" class="item-slide">
       <img :src="getImgUrl(slide.img)" alt=""/>
    </slide>
    <template #addons>
      <navigation />
    </template>
  </carousel>
  </my-section>
</template>

<script>
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';

export default {
  name: 'App',
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  data () {
      return{
          slideItems: [
            {img: "bmw.png"},
            {img: "toyota.png"},
            {img: "lamba.png"},
            {img: "bmw.png"},
            {img: "toyota.png"},
            {img: "lamba.png"},
            {img: "bmw.png"},
            {img: "toyota.png"},
            {img: "lamba.png"},  
          ],
          propSettings: {
          itemsToShow: 6,
          },
          breakpointsSlider: {
             10: {
             itemsToShow: 1,
            },
            290: {
             itemsToShow: 2,
            },
            400: {
             itemsToShow: 3,
            },
            720: {
             itemsToShow: 5,
            },
            1024: {
              itemsToShow: 6,
            },
          },
      }
  },
   methods: {
    getImgUrl(pic) {
      return require("@/assets/" + pic);
    }    
  },
  
  
};
</script>
<style>
.section-partners{
    padding-bottom: 80px ;
}
.item-slide img{
    width: 90px;
}
.carousel__prev{
    color:#C4C4C4;
   height:40px ;
}
.carousel__next{
    color:#C4C4C4;
   height:40px ;
}
</style>