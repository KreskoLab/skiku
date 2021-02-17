<template>

<div>
  <b-navbar class="p-1" :mobile-burger="false" fixed-top id="nav">
        
  <template slot="brand">

      <b-navbar-item class="is-hidden-touch" tag="nuxt-link" :to="{ path: '/' }">
          <span>ЦІНННННИИИИИИИИ</span>
      </b-navbar-item>

      <b-navbar-item class="is-hidden-desktop ml-2" tag="nuxt-link" :to="{ path: '/' }">
          <span>ЦІНННННИИИИИИИИ</span>
      </b-navbar-item>

      <b-navbar-item tag="div" style="margin-right:-10px;margin-left:auto" class="is-hidden-desktop">

        <b-dropdown v-model="city" aria-role="list" :mobile-modal="false" position="is-bottom-left"> 

          <div class="navbar-item" slot="trigger" role="button">
            <span v-if="city == null"><span class="is-size-5">🏡</span> Місто</span>
            <span v-else><span class="is-size-5">🏡</span> {{city}}</span>
          </div>

          <b-dropdown-item :focusable="false" :value="item" v-for="item in cities" :key="item">
            {{item}}
          </b-dropdown-item>

        </b-dropdown>

      </b-navbar-item>


  </template>

  <template slot="end">
      <b-dropdown class="is-hidden-touch pr-2" v-model="city" aria-role="list" position="is-bottom-left"> 

          <div class="navbar-item" slot="trigger" role="button" style="cursor:pointer">
            <span v-if="city== null"><span class="is-size-5">🏡</span> Місто</span>
            <span v-else><span class="is-size-5">🏡</span> {{city}}</span>
          </div>

          <b-dropdown-item :focusable="false" :value="item" v-for="item in cities" :key="item">
            {{item}}
          </b-dropdown-item>

      </b-dropdown>
  </template>

  </b-navbar>

</div>


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
</style>