<script>
  import Footer from './global/Footer.vue'
  import Header from './global/Header.vue'

  export default {
    components: {
      'c-footer': Footer,
      'c-header': Header
    }
  }
</script>

<template>
  <div>
    <c-header />
    <main class="g-main">
      <router-view />
    </main>
    <c-footer />
  </div>
</template>