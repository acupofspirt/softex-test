<script>
  import Carousel
    from 'vue-carousel/src/Carousel.vue'
  import Slide from 'vue-carousel/src/Slide.vue'

  export default {
    components: {
      'c-carousel': Carousel,
      'c-slide': Slide
    }
  }
</script>

<template>
  <div class="p-index g-container">
    <c-carousel class="p-index__carousel"
                :perPage="1"
                :perPageCustom="[[600, 3]]"
                :navigationEnabled="false"
                :paginationEnabled="false"
                :scrollPerPage="false"
                :loop="true">
      <c-slide v-for="pic in 5" :key="pic">
        <div class="p-index__pic-wrap">
          <router-link class="p-index__pic"
                       to="#"
                       :style="`background-image: url('/img/fish/cat.jpg')`"></router-link>
        </div>
      </c-slide>
    </c-carousel>
  </div>
</template>