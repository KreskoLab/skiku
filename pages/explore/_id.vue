<template>
  <div>
   
    <Navbar />

    <div v-if="!$fetchState.pending" class="is-hidden-desktop px-4">
        
        <nav class="level is-mobile mt-5 mb-4 mx-2">

          <div class="level-left mt-4">
            <p class="has-text-weight-medium">{{count}} товарів</p>
          </div>

          <div class="level-right mt-4">
            <div @click="modal = true" class="level-item">⚙️</div>
          </div>

        </nav>

        <div class="columns is-multiline">

          <div class="column px-4" v-for="(good,index) in goods" :key="good.ean">
            <Card :good="good" :store="storeSelect" />
          </div>

        </div>

        <Pagination :count="count" :page="page" />

    </div>

    <b-modal class="is-hidden-desktop" :active="modal" full-screen :can-cancel="false">
        <div class="card" style="overflow: scroll;">
          <div class="card-content">

              <div class="media">
                  <div class="media-content">
                    <p class="has-text-centered is-size-5 ml-5 mb-1">Оберіть фільтри</p>
                  </div>
                  <div class="media-right mt-1 is-clickable">
                      <span @click="modal = false">❌</span>
                  </div>
              </div>

              <div class="content">
                  <p class="is-size-5 has-text-success has-text-weight-medium mb-2">Магазин</p>

                    <b-radio v-if="store[city]" 
                      v-for="(store,i) in stores" :key="store.i" 
                      v-model="storeSelect" 
                      :native-value="store" 
                      class="mb-2 is-flex" 
                      style="width:180px"
                      type="is-success"
                    >
                      <figure class="image is-16x16 mx-2 ">
                        <img :src="store.img">
                      </figure>
                      <span class="has-text-weight-medium" >{{store.name}}</span>
                    </b-radio>

                  <p class="is-size-5 has-text-success has-text-weight-medium mb-2">Товари</p>

                    <b-radio v-model="categorySelect"
                      v-for="(category,i) in categories" :key="category.i" 
                      :native-value="category" 
                      class="mb-2 is-flex" 
                      style="width:200px"
                      type="is-success"
                    >
                      <span class="mx-2">{{category.icon}}</span>
                      <span class="has-text-weight-medium" style="white-space:pre">{{category.name}}</span>
                    </b-radio>

              </div>
          </div>
      </div>
    </b-modal>

    <div class="columns is-hidden-touch">

      <div class="column is-2">

          <div class="mt-5 px-4"> 

            <p class="is-size-5 has-text-success has-text-weight-medium">Магазин</p>

            <div class="mt-2 ml-1">

              <b-radio v-if="store[city]" v-model="storeSelect" :native-value="store" class="mb-2" type="is-success" v-for="(store,i) in stores" :key="store.i">
                  <figure class="image is-16x16 mx-2">
                    <img :src="store.img">
                  </figure>
                  <span class="has-text-weight-medium" style="white-space:pre">{{store.name}}</span>
              </b-radio>

            </div>

          </div>

          <div class="px-4">

            <p class="is-size-5 has-text-success has-text-weight-medium">Товари</p>

              <div class="mt-2 ml-1">

                <b-radio v-model="categorySelect" :native-value="category" class="mb-2 is-flex" type="is-success" v-for="(category,i) in categories" :key="category.i">
                  <span class="mx-2">{{category.icon}}</span>
                  <span class="has-text-weight-medium" style="white-space:pre">{{category.name}}</span>
                </b-radio>

              </div>

          </div>

      </div>

      <div class="column ml-6 mr-5 mt-1" v-if="!$fetchState.pending">

        <nav class="level mt-5">

          <div class="level-left">
            <p class="level-item has-text-weight-medium">{{count}} товарів</p>
          </div>

          <div class="level-right">
            <p @click="$store.commit('updateSort', 'price_asc')" :class="{'has-text-success': sort == 'price_asc' || sort == 'price-asc'}" class="level-item is-clickable has-text-weight-medium">Дешевші</p>
            <p @click="$store.commit('updateSort', 'price_desc')" :class="{'has-text-success': sort == 'price_desc' || sort == 'price-desc'}"  class="level-item is-clickable has-text-weight-medium">Дорожчі</p>
          </div>

        </nav>

        <div class="columns is-multiline">
          <div class="column is-3" v-for="(good,i) in goods" :key="good.i">
            <Card :good="good" :store="storeSelect" />
          </div>
        </div>
        <Pagination :count="count" :page="page" />
      </div>

    </div>

  </div>
</template>

<script>
import categoriesJson from '~/static/categories.json'
import storesJson from '~/static/stores.json'

export default {
  
  async fetch(){

    var storeID = this.storeSelect[this.city] // Город
    var categoryID = this.categorySelect[this.storeSelect.code] // Категория

    var end = 30 * this.page
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
          mainImage: item.mainImage,
          price: item.price,
          priceStopAfter: item.priceStopAfter
        }))
        this.count = res.itemsCount
      })

    }
    else{
      await this.$axios.$get(`zakaz/stores/${storeID}/categories/${categoryID}/products/?page=${this.page}&sort=${this.sort}`, {
        headers: {
          'Accept-Language': 'uk'
        }
      })
      .then((res) => {
        this.goods = res.results.map( item => ({
          title: item.title,
          img: item.img.s350x350,
          price: item.price,
          discount: {
            status: item.discount.status,
            due_date: item.discount.due_date
          } 
        }))
        this.count = res.count
      })
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
    storeSelect(store){
      this.$store.commit('updateStore', store)
      this.$store.commit('updateSort', this.sort)
      this.$router.push('/explore/1')
      this.$fetch()
    },
    categorySelect(category){
      this.$store.commit('updateCategory', category)
      this.$router.push('/explore/1')
      this.$fetch()
    }
  },
  data() {
    return{
      goods: [],
      count: null,
      modal: false,
      page: Number(this.$route.params.id),
      storeSelect: this.$store.getters.getStore,
      categorySelect: this.$store.getters.getCategory,
      stores: storesJson,
      categories: categoriesJson
    }
  }

}

</script>

<style>
::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:#f1f1f1}::-webkit-scrollbar-thumb{background:#888}
.dropdown-content{font-size:.875rem;padding-bottom:.5rem;padding-top:.5rem;border:1px solid #dbdbdb;border-radius:6px}
.dropdown-menu{min-width:110px!important;transition-duration:86ms;transition-property:opacity,transform}
.dropdown-item{padding:.375rem 1rem;padding-right:3rem;white-space:nowrap}
span.icon.is-left{margin:16px}span.control-label{display:contents}
.card{height:100%}
</style>