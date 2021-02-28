<template>
  <div>
    <Navbar v-if="$route.name == 'explore' || $route.name == 'explore-id'" />
    <Nuxt/>
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}
</style>
