<template>
  <section class="section pt-0 pb-6">

    <div class="columns mt-5">

      <div v-if="$fetchState.pending" >
        <b-loading :active="true" />
      </div>

      <div v-else class="column is-offset-one-fifth is-three-fifths notification is-white p-5">

        <p class="is-size-4 has-text-dark has-text-centered mb-2">{{good.title}}</p>

        <div class="has-text-centered">
          <nuxt-picture :src="good.img" format="webp" width="300" height="300" />
        </div>
        
        <div v-if="good.country || good.producer">

          <b-icon icon="information-outline" />
          <span class="is-size-4 has-text-dark">Інформація</span>

          <nav class="level is-mobile is-size-5 notification is-light p-3 mb-2 mt-3" v-if="good.country">  
            <div class="level-left">
              <p class="level-item has-text-dark">
                Країна
              </p>
            </div>
            <div class="level-right">
              <p class="level-item has-text-dark">
                {{good.country}}
              </p>
            </div>
          </nav>

          <nav class="level is-mobile is-size-5 notification is-light p-3 mb-2 mt-3" v-if="good.producer">  
            <div class="level-left">
              <p class="level-item has-text-dark">
                ТМ
              </p>
            </div>
            <div class="level-right">
              <p class="level-item has-text-dark">
                {{good.producer}}
              </p>
            </div>
          </nav>

        </div>

        <div>

          <b-icon class="mt-3" icon="tag-outline" />
          <span class="is-size-4 has-text-dark">Ціни</span>

          <div class="mt-3">
            <nav class="level is-mobile is-size-5 notification is-light p-3 mb-3" v-for="(item,i) in pricesSort" :key="item.i">
              <div class="level-left">
                <div class="level-item has-text-dark">
                  <figure class="image is-24x24 mr-2">
                    <img :src="item.img">
                  </figure>
                  {{item.store}}
                </div>
              </div>
              <div class="level-right">
                <p class="level-item has-text-success-dark">
                  <грн> {{item.price}}
                </p>
              </div>
            </nav>
          </div>

        </div>

      </div>

    </div>
  </section>
</template>

<script>
import storesJSON from '~/static/stores.json'

export default {
  async fetch(){
    await this.scan()
  },
  data(){
    return{
      good: {},
      prices: [],
      store: this.$store.getters.getStore
    }
  },
  computed: {
    city(){
      return this.$store.getters.getCity
    },
    pricesSort(){
      return this.prices.sort((a,b) => a.price - b.price)
    },
    stores(){
      return storesJSON.filter(store => store.name !== 'Сільпо')
    }
  },
  watch: {
    city(){
      this.prices = []
      this.$fetch()
    }
  },
  methods:{
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
              img: res.img.s350x350
            }

            this.good = newGood

            var price = {
              logo: item.img,
              store: item.name,
              img: item.img,
              price: res.price.toString().substring(0, res.price.toString().length - 2) + '.' + res.price.toString().slice(-2)
            }

            this.prices.push(price)
        })
        .catch(err => {
          
        })
      }
      
    }
  }
}

</script>