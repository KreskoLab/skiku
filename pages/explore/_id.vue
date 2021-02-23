<template>
    <b-modal 
      @close="back()" 
      :active="true" 
      :full-screen="opened ? false : true" 
      has-modal-card 
      scroll="clip"
    >
      <div class="card" :style="[ opened ? { 'width': '960px' } : '']">

        <div class="card-content">

          <div class="media">
              <div class="media-content">
                <p v-if="!$fetchState.pending" class="has-text-centered is-size-4">{{good.title}}</p>
              </div>
              <div @click="back()" class="media-right mt-1 is-clickable">
                  <span>❌</span>
              </div>
          </div>

          <div v-if="$fetchState.pending" class="content">
            <b-loading :is-full-page="false" :active="true" />
          </div>

          <div v-else class="content">

              <article class="media is-hidden-touch">

                <figure class="media-left">
                  <nuxt-picture :src="good.img" />
                </figure>

                <div class="media-content">
                  <div class="content">

                    <div class="mb-4" v-if="good.country || good.producer || good.weight">
                      <b-icon icon="information-outline" />
                      <span class="is-size-5">Інформація</span>

                      <b-taglist class="mt-2">
                          <b-tag v-if="good.country">
                            <span class="is-size-6">{{good.country}}</span>
                          </b-tag>
                          <b-tag v-if="good.producer">
                            <span class="is-size-6">{{good.producer}}</span>
                          </b-tag>
                          <b-tag v-if="good.weight">
                            <span class="is-size-6">{{good.weight}} г</span>
                          </b-tag>
                      </b-taglist>
                    </div>

                    <b-icon icon="tag-outline" />
                    <span class="is-size-5">Ціни</span>

                    <b-field class="mt-2" grouped group-multiline>
                      <div class="control" v-for="(item,i) in pricesSort" :key="item.i">
                        <b-taglist attached>
                          <b-tag >
                            <span class="is-size-6">{{item.store}}</span>
                          </b-tag>
                          <b-tag type="is-success is-light">
                            <span class="is-size-6"><грн> {{item.price}}</span>
                          </b-tag>
                        </b-taglist>
                      </div>
                    </b-field>     

                  </div>
                </div>

              </article>

              <div class="is-hidden-desktop">

                <nuxt-picture class="is-flex is-justify-content-center mb-2" :src="good.img" />

                <div class="mb-2" v-if="good.country || good.producer || good.weight">
                  <b-icon icon="information-outline" />
                  <span class="is-size-5">Інформація</span>

                  <b-taglist class="mt-2 is-centered">
                      <b-tag v-if="good.country">
                        <span class="is-size-6">{{good.country}}</span>
                      </b-tag>
                      <b-tag v-if="good.producer">
                        <span class="is-size-6">{{good.producer}}</span>
                      </b-tag>
                      <b-tag v-if="good.weight">
                        <span class="is-size-6">{{good.weight}} г</span>
                      </b-tag>
                  </b-taglist>
                </div>

                <b-icon icon="tag-outline" />
                <span class="is-size-5">Ціни</span>

                <div class="field is-grouped is-grouped-multiline mt-2 is-flex is-justify-content-center">
                  <div class="control" v-for="(item,i) in pricesSort" :key="item.i">
                      <div class="tags has-addons">
                        <span class="tag">
                          <span class="is-size-6">{{item.store}}</span>
                        </span>
                        <span class="tag is-success is-light">
                          <span class="is-size-6"><грн> {{item.price}}</span>
                        </span>
                      </div>
                  </div>
                </div>
              
              </div>
          </div>

        </div>       

      </div>
    </b-modal>
</template>

<script>
import storesJSON from '~/static/stores.json'

export default {
  async fetch(){
    await this.scan()
  },
  props: {
    opened: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return{
      good: {},
      prices: [],
      store: this.$store.getters.getStore,
      city: this.$store.getters.getCity
    }
  },
  computed: {
    pricesSort(){
      return this.prices.sort((a,b) => a.price - b.price)
    },
    stores(){
      return storesJSON.filter(store => store.name !== 'Сільпо')
    }
  },
  methods:{
    back(){
      if(!this.opened){
        this.$router.push('/')
      }
      else{
        this.$router.go(-1)
      }
    },
    async scan(){
      for(var item of this.stores)
      {
        await this.$axios.$get(`zakaz/stores/${item[this.city]}/products/${this.$route.params.id}`, {
          headers: {
            'Accept-Language': 'uk'
          }
        })
        .then((res) => {

            var newCountry
            if(res.country){
              newCountry = res.country[0].toUpperCase() + res.country.slice(1)
            }

            var newGood = {
              title: res.title,
              country: newCountry,
              producer: res.producer.trademark,
              weight: res.weight,
              img: res.img.s350x350
            }

            this.good = newGood

            var price = {
              logo: item.img,
              store: item.name,
              price: res.price.toString().substring(0, res.price.toString().length - 2) + '.' + res.price.toString().slice(-2)
            }

            this.prices.push(price)
        })
        .catch(err => {
          console.log(err);
        })
      }
      
    }
  }
}

</script>

<style>

</style>