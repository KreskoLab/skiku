<template>

  <div class="card px-6">

    <div class="card-image has-text-centered">
      <nuxt-picture :src="good.img" format="webp" width="350" height="350" />
    </div>

    <div class="media mb-0">
      <div class="media-content has-text-centered">
        <p class="has-text-dark">{{good.title}}</p>
      </div>
    </div>

    <div class="card-content">

      <div class="content has-text-centered">

        <span v-if="good.priceStopAfter" class="tag is-danger is-light">
          <span class="is-size-5">
            <грн> {{good.price}}<span class="is-size-6"> до {{ good.priceStopAfter }} </span> 
          </span>
        </span>
    
        <span v-else class="tag is-success is-light">
          <span class="is-size-5"><грн> {{good.price}}</span>
        </span>

      </div>

    </div>
  </div>


</template>

<script>
export default {
  props: ['good','store']
}

</script>