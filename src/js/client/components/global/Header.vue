<script>
  export default {}
</script>

<template>
  <header class="g-header">
    <nav class="g-header__nav g-container">
      <router-link class="g-header__nav-link g-link"
                   exact
                   to="/">
        Home
      </router-link>
      <router-link class="g-header__nav-link g-link"
                   exact
                   to="#about">
        About Us
      </router-link>
      <router-link class="g-header__nav-link g-link"
                   exact
                   to="#contacts">
        Contact Us
      </router-link>
    </nav>
  </header>
</template>