<template>

  <div class="card">

    <div class="card-image has-text-centered">
      <figure class="image is-5by4 pt-0">
        <nuxt-picture placeholder :src="good.img.s350x350" v-if="store.name !== 'Сільпо' " />
        <nuxt-picture placeholder :src="good.mainImage" v-else />
      </figure>
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
              <грн>{{good.price}}<span class="is-size-6"> до {{ good.priceStopAfter.toString().substr(0, 5) }} </span> 
            </span>
          </b-tag>
      
          <b-tag v-else type="is-success is-light">
            <span class="is-size-5"><грн> {{good.price}}</span>
          </b-tag>
        
        </div>

        <div v-else>

          <b-tag v-if="good.discount.status" type="is-danger is-light">
            <span class="is-size-5"><грн> {{ good.price.toString().substring(0, good.price.toString().length - 2) + '.' + good.price.toString().slice(-2) }}
              <span class="is-size-6"> до {{ good.discount.due_date.toString().substr(8, 4) +'.'+ good.discount.due_date.substr(5, 2) }} </span>
            </span>
          </b-tag>

          <b-tag v-else type="is-success is-light">
            <span class="is-size-5"><грн> {{ good.price.toString().substring(0, good.price.toString().length - 2) + '.' + good.price.toString().slice(-2) }}</span>
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