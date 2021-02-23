<template>
  <div>
   
    <Navbar />

    <NuxtChild 
      v-if="$route.params.id" 
      :opened="open" 
    />

    <div v-if="$fetchState.pending && !modal">
      <b-loading :active="true" />
    </div>

    <div v-if="!$fetchState.pending" class="is-hidden-desktop px-4">
        
        <nav class="level is-mobile mt-5 mb-4 mx-2">

          <div class="level-left mt-4">
            <p>{{count}} товарів</p>
          </div>

          <div class="level-right mt-4">
            <p 
              @click="$store.commit('updateSort', 'price_asc')"
              :class="{'has-text-success': sort == 'price_asc' || sort == 'price-asc'}" 
              class="level-item is-clickable is-size-5"
            >
              <грн>^-
            </p>
            <p 
              @click="$store.commit('updateSort', 'price_desc')" 
              :class="{'has-text-success': sort == 'price_desc' || sort == 'price-desc'}" 
              class="level-item is-clickable is-size-5"
            >
              <грн>-^
            </p>
            <div @click="modal = true" class="level-item">
              <b-icon icon="tune" />
            </div>
          </div>

        </nav>

        <div class="columns is-multiline">

          <div class="column px-4" v-for="(good,index) in goods" :key="good.ean">

            <Card 
              v-if="storeSelect.name == 'Сільпо'" 
              :good="good" 
              :store="storeSelect" 
            />

            <NuxtLink v-else @click.native="open = true" :to="`explore/${good.ean}`">
              <Card class="px-6" id="good" :good="good" :store="storeSelect" />
            </NuxtLink>
            
          </div>

        </div>

        <Pagination :count="count" />

    </div>

    <Modal v-if="modal"
      @close="modal = $event" 
      @newStore="storeSelect = $event" 
      @newCategory="categorySelect = $event" 
      :categories="categories" 
      :stores="stores" 
      :city="city" 
      :show="modal"
    />

    <div v-if="!$fetchState.pending" class="columns is-hidden-touch">

      <Sidebar 
        @newStore="storeSelect = $event" 
        @newCategory="categorySelect = $event" 
        :categories="categories" 
        :stores="stores" 
        :city="city" 
      />

      <div class="column mx-5 mt-1">

        <nav class="level mt-5">

          <div class="level-left">
            <p class="level-item">{{count}} товарів</p>
          </div>

          <div class="level-right">
            <p 
              @click="$store.commit('updateSort', 'price_asc')"
              :class="{'has-text-success': sort == 'price_asc' || sort == 'price-asc'}" 
              class="level-item is-clickable"
            >
              Дешевші
            </p>

            <p 
              @click="$store.commit('updateSort', 'price_desc')" 
              :class="{'has-text-success': sort == 'price_desc' || sort == 'price-desc'}" 
              class="level-item is-clickable"
            >
              Дорожчі
            </p>
          </div>

        </nav>

        <div class="columns is-multiline">
          <div class="column is-3" v-for="(good,i) in goods" :key="good.i">

            <Card v-if="storeSelect.name == 'Сільпо'" :good="good" :store="storeSelect" />

            <NuxtLink v-else @click.native="open = true" :to="`explore/${good.ean}`">
              <Card id="good" :good="good" :store="storeSelect" />
            </NuxtLink>

          </div>
        </div>

        <Pagination :count="count" />
      </div>

    </div>

  </div>
</template>

<script>
import categoriesJson from '~/static/categories.json'
import storesJson from '~/static/stores.json'

export default {
  
  async fetch(){

    if(!this.$route.params.id){

      var storeID = this.storeSelect[this.city] // Город
      var categoryID = this.categorySelect[this.storeSelect.code] // Категория

      var end = 30 * Number(this.$route.query.page)
      var start = end - 30 + 1

      if (this.storeSelect.name == 'Сільпо'){ 
        await this.$axios.$post('silpo/api/2.0/exec/EcomCatalogGlobal', {
          method: "GetSimpleCatalogItems",
          data: {
            "categoryId": categoryID,
            "filialId": storeID,
            "From": start,
            "To": end,
            "sortBy": this.sort
          }
        })
        .then( (res) => {
          this.goods = res.items.map( item => ({
            name: item.name,
            ean: item.id,
            mainImage: item.mainImage,
            price: item.price,
            priceStopAfter: item.priceStopAfter ? item.priceStopAfter.toString().substr(0, 5) : item.priceStopAfter
          }))
          this.count = res.itemsCount
        })

      }
      else{
        await this.$axios.$get(`zakaz/stores/${storeID}/categories/${categoryID}/products/?page=${Number(this.$route.query.page)}&sort=${this.sort}`, {
          headers: {
            'Accept-Language': 'uk'
          }
        })
        .then((res) => {
          this.goods = res.results.map( item => ({
            title: item.title,
            slug: item.slug,
            ean: item.ean,
            img: item.img.s350x350,
            price: item.price.toString().substring(0, item.price.toString().length - 2) + '.' + item.price.toString().slice(-2),
            discount: {
              status: item.discount.status,
              due_date: item.discount.due_date ? item.discount.due_date.toString().substr(8, 4) +'.'+ item.discount.due_date.substr(5, 2) : item.discount.due_date
            } 
          }))
          this.count = res.count
        })
      }
      
    }
  },
  computed: {
    sort(){
      return this.$store.getters.getSort
    },
    city(){
      return this.$store.getters.getCity
    }
  },
  watch: {
    city(){
      if ( !Object.keys(this.storeSelect).includes(this.city) ){ 
        this.storeSelect = this.stores.find(item => Object.keys(item).includes(this.city) )
      }
      this.$fetch()
    },
    sort(){
      this.$fetch()
    },
    $route(to, from) {
      if (to.params.id == undefined && from.params.id == undefined)
      {
        this.$fetch()
      }
      else if(from.params.id){
        //this.$fetch()
        //this.$router.push('/explore')
        this.$router.push({ name: 'explore-id', query: { page: Number(this.$route.query.page) } })
        if(!this.count){
          this.$fetch()
        }

      }
    },
    storeSelect(store){
      this.$store.commit('updateStore', store)
      this.$store.commit('updateSort', this.sort)
      
      if(this.$route.query.page == 1){
        this.$fetch()
      }
      else{
        this.$router.push('/explore?page=1')
        this.$route.query.page = 1
      }
    },
    categorySelect(category){
      this.$store.commit('updateCategory', category)
      if(this.$route.query.page == 1){
        this.$fetch()
      }
      else{
        this.$router.push('/explore?page=1')
        this.$route.query.page = 1
      }
    }
  },
  data() {
    return{
      goods: [],
      count: null,
      modal: false,
      open: false,
      storeSelect: this.$store.getters.getStore,
      categorySelect: this.$store.getters.getCategory,
      stores: storesJson,
      categories: categoriesJson
    }
  }

}

</script>

<style>
.dropdown-content{font-size:.875rem;padding-bottom:.5rem;padding-top:.5rem;border:1px solid #dbdbdb;border-radius:6px}
.dropdown-menu{min-width:110px!important;transition-duration:86ms;transition-property:opacity,transform}
.dropdown-item{padding:.375rem 1rem;padding-right:3rem;white-space:nowrap}
span.icon.is-left{margin:16px}span.control-label{display:contents}
.card{height:100%}

#good{
  transition: 0.5s ease box-shadow, 0.3s ease transform;
}

#good:hover{
  box-shadow: 0px 10px 10px rgba(0,0,0,0.15); 
  transform: scale(1.02);
}

</style>