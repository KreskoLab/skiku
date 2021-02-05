<template>

  <div class="card">

    <div class="card-image">
      <figure class="image is-1by1" style="padding-top:unset">
        <nuxt-picture placeholder :src="good.img.s350x350" v-if="store.name !== 'Сільпо' " />
        <nuxt-picture placeholder :src="good.mainImage" v-else />
      </figure>
    </div>

    <div style="margin-left:-10px" class="card-content">
      <div class="media">

        <div class="media-left" v-if="store.name == 'Сільпо' ">

          <b-taglist attached v-if="good.priceStopAfter !== null">
              <b-tag type="is-danger is-light">
                <b-icon icon="sale"></b-icon>
              </b-tag>
              <b-tag style="margin-left:-5px" type="is-danger is-light"><span class="is-size-6">{{good.price}} грн <span class="is-size-7">до {{ good.priceStopAfter.toString().substr(0, 5) }} </span> </span></b-tag>
          </b-taglist>

          <b-taglist attached v-else>
              <b-tag type="is-success is-light">
                <b-icon icon="cash"></b-icon>
              </b-tag>
              <b-tag style="margin-left:-5px" type="is-success is-light"><span class="is-size-6">{{good.price}} грн</span></b-tag>
          </b-taglist>

        </div>

        <div class="media-left" v-else>

          <b-taglist attached v-if="good.discount.status == true">
              <b-tag type="is-danger is-light">
                <b-icon icon="sale"></b-icon>
              </b-tag>
              <b-tag style="margin-left:-5px" type="is-danger is-light"><span class="is-size-6">{{ good.price.toString().substring(0, good.price.toString().length - 2) + '.' + good.price.toString().slice(-2) }} грн <span class="is-size-7">до {{ good.discount.due_date.toString().substr(8, 4) +'.'+ good.discount.due_date.substr(5, 2) }} </span> </span></b-tag>
          </b-taglist>

          <b-taglist attached v-else>
              <b-tag type="is-success is-light">
                <b-icon icon="cash"></b-icon>
              </b-tag>
              <b-tag style="margin-left:-5px" type="is-success is-light"><span class="is-size-6">{{ good.price.toString().substring(0, good.price.toString().length - 2) + '.' + good.price.toString().slice(-2) }} грн</span></b-tag>
          </b-taglist>

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