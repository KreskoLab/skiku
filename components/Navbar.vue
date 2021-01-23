<template>

<div>
  <b-navbar :mobile-burger="false" fixed-top id="nav">
        
  <template slot="brand">

      <b-navbar-item style="padding-left:1rem" class="is-hidden-mobile" tag="router-link" :to="{ path: '/' }">
          <span>ЦІНННННИИИИИИИИ</span>
      </b-navbar-item>

      <b-navbar-item style="margin-left:-5px" class="is-hidden-tablet" tag="router-link" :to="{ path: '/' }">
          <span>ЦІНННННИИИИИИИИ</span>
      </b-navbar-item>

      <b-navbar-item style="margin-right:-10px;margin-left:auto" class="is-hidden-tablet">

        <b-dropdown v-model="city.data" aria-role="list" :mobile-modal="false" position="is-bottom-left"> 

          <div class="navbar-item" slot="trigger" role="button" style="cursor:pointer">
            <b-icon icon="map-marker"></b-icon>
            <span v-if="city.data == null">Місто</span>
            <span v-else>{{city.data}}</span>
          </div>

          <b-dropdown-item :focusable="false" :value="city2" v-for="city2 in cities" :key="city2">
            {{city2}}
          </b-dropdown-item>

        </b-dropdown>

      </b-navbar-item>


  </template>

  <template slot="end">
      <b-dropdown style="padding-right:1rem" class="is-hidden-mobile" v-model="city.data" aria-role="list" :mobile-modal="false" position="is-bottom-left"> 

          <div class="navbar-item" slot="trigger" role="button" style="cursor:pointer">
            <b-icon icon="map-marker"></b-icon>
            <span v-if="city.data == null">Місто</span>
            <span v-else>{{city.data}}</span>
          </div>

          <b-dropdown-item :focusable="false" :value="city2" v-for="city2 in cities" :key="city2">
            {{city2}}
          </b-dropdown-item>

      </b-dropdown>
  </template>

  </b-navbar>

</div>


</template>

<script>
export default {
  props: ['cities', 'city'],
  data() {
    return {
      
    }
  }
}

</script>