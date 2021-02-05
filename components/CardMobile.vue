<template>

  <div class="card">

    <div class="card-image has-text-centered">
      <figure class="image is-128x128 is-inline-block" style="padding-top:unset">
        <nuxt-picture placeholder :src="good.img.s350x350" v-if="store.name !== 'Сільпо' " />
        <nuxt-picture placeholder :src="good.mainImage" v-else />
      </figure>
    </div>

    <div class="card-content">
      <div class="media">
         
        <div class="media-left" v-if="store.name == 'Сільпо' ">

          <b-tag v-if="good.promotion == null" style="margin-left:-5px" type="is-success is-light"><span class="is-size-6">{{good.price}} грн</span></b-tag>

          <b-tag v-else style="margin-left:-5px" type="is-danger is-light"><span class="is-size-6">{{good.price}} грн <span class="is-size-7">до {{ good.priceStopAfter.toString().substr(0, 5) }} </span> </span></b-tag>

        </div>

        <div class="media-left" v-else>

          <b-tag v-if="good.discount.status == true" style="margin-left:-5px" type="is-danger is-light"><span class="is-size-6">{{ good.price.toString().substring(0, good.price.toString().length - 2) + '.' + good.price.toString().slice(-2) }} грн <span class="is-size-7">до {{ good.discount.due_date.toString().substr(8, 4) +'.'+ good.discount.due_date.substr(5, 2) }} </span> </span></b-tag>

          <b-tag v-else style="margin-left:-5px" type="is-success is-light"><span class="is-size-6">{{ good.price.toString().substring(0, good.price.toString().length - 2) + '.' + good.price.toString().slice(-2) }} грн</span></b-tag>

        </div>

      </div>

      <div class="content" style="margin-top:-10px">
        <span class="has-text-weight-medium" v-if="store.name == 'Сільпо' ">{{good.name}}</span>
        <span class="has-text-weight-medium" v-else>{{good.title}}</span>
      </div>

    </div>

  </div>


</template>

<script>
export default {
  props: ['good','store']
}

</script>