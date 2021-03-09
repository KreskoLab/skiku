<template>

<b-navbar class="py-1 px-2" :mobile-burger="false" id="nav">    

  <template slot="brand">

      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img src="/logo.svg">
        <span class="is-size-5 ml-2">Skiku</span>
      </b-navbar-item>

      <b-navbar-item tag="div" style="margin-left:auto" class="is-hidden-desktop">
        <b-dropdown v-model="city" aria-role="list" :mobile-modal="false" position="is-bottom-left"> 

          <div class="navbar-item is-clickable" slot="trigger" role="button">
            <b-icon icon="map-marker" />
            <span class="is-unselectable">{{city}}</span>
          </div>

          <b-dropdown-item :focusable="false" :value="item" v-for="item in cities" :key="item">
            {{item}}
          </b-dropdown-item>

        </b-dropdown>
      </b-navbar-item>

  </template>

  <template slot="end">

      <b-dropdown class="pr-2" v-model="city" aria-role="list" position="is-bottom-left"> 
          <div class="navbar-item is-clickable" slot="trigger" role="button">
            <b-icon icon="map-marker" />
            <span class="is-unselectable">{{city}}</span>
          </div>

          <b-dropdown-item :focusable="false" :value="item" v-for="item in cities" :key="item">
            {{item}}
          </b-dropdown-item>
      </b-dropdown>

  </template>

</b-navbar>

</template>

<script>
export default {
  data(){
    return{
      cities: ['Київ', 'Львів', 'Дніпро', 'Одеса', 'Харків'],
      city: this.$store.getters.getCity
    }
  },
  created(){
    this.$store.dispatch('check')
  },
  watch: {
    city(val){
      this.$store.commit('updateCity', val)
    }
  }
}

</script>

<style>
#nav{
  background-color:hsla(0,0%,100%,.75);
  backdrop-filter:blur(12px)
}

.dropdown-content{font-size:.875rem;padding-bottom:.5rem;padding-top:.5rem;border:1px solid #dbdbdb;border-radius:6px}
.dropdown-menu{min-width:110px!important;transition-duration:86ms;transition-property:opacity,transform}
.dropdown-item{padding:.375rem 1rem;padding-right:3rem;white-space:nowrap}

</style>