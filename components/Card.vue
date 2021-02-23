<template>

  <div class="card">

    <div class="card-image has-text-centered">
        <nuxt-picture :src="good.mainImage" width="350" height="350" v-if="store.name == 'Сільпо'" />
        <nuxt-picture :src="good.img" width="350" height="350" v-else />
    </div>

    <div class="card-content">

      <div class="media">
        <div class="media-content has-text-centered">
          <p id="name" class="has-text-weight-medium" v-if="store.name == 'Сільпо' ">{{good.name}}</p>
          <p id="name" class="has-text-weight-medium" v-else>{{good.title}}</p>
        </div>
      </div>

      <div class="content has-text-centered">

        <div v-if="store.name == 'Сільпо' ">

          <b-tag v-if="good.priceStopAfter" type="is-danger is-light">
            <span class="is-size-5">
              <грн>{{good.price}}<span class="is-size-6"> до {{ good.priceStopAfter }} </span> 
            </span>
          </b-tag>
      
          <b-tag v-else type="is-success is-light">
            <span class="is-size-5"><грн> {{good.price}}</span>
          </b-tag>
        
        </div>

        <div v-else>

          <b-tag v-if="good.discount.status" type="is-danger is-light">
            <span class="is-size-5"><грн> {{ good.price }}
              <span class="is-size-6"> до {{ good.discount.due_date }} </span>
            </span>
          </b-tag>

          <b-tag v-else type="is-success is-light">
            <span class="is-size-5"><грн> {{ good.price }}</span>
          </b-tag>

        </div>

      </div>

    </div>
  </div>


</template>

<script>
export default {
  props: ['good','store']
}

</script>

<style>

</style>