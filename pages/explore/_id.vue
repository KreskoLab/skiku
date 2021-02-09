<template>

<div>
   
    <Navbar :cities="cities" :city="city" />

    <div v-if="!$fetchState.pending" class="mobile is-hidden-tablet px-2">
        
        <nav class="level is-mobile" style="margin-top:25px">

          <div class="level-left">
            <p class="has-text-weight-medium">{{count}} товарів</p>
          </div>

          <div class="level-right">
            <div class="level-item"> <b-icon icon="tune"></b-icon> </div>
          </div>

        </nav>

        <div class="columns is-multiline">

          <div class="column px-4" v-for="(good,index) in goods" :key="good.ean">
            <CardMobile :good="good" :store="storeSelect" />
          </div>

        </div>

        <PaginationMobile :count="count" :page="page" />

    </div>

    <div class="desktop is-hidden-mobile" style="padding-left:250px">

    <div class="sidebar">

        <div style="padding: 15px 16px 16px 16px" id="Stores"> 

           <p class="is-size-5 has-text-success has-text-weight-medium">Магазин</p>

            <div class="field" style="display:table-caption;margin-left:5px;margin-top:8px">

              <b-radio v-if="store[city.data]" v-model="storeSelect" :native-value="store" type="is-success" style="padding-bottom:10px" v-for="(store,index) in stores" :key="store.name">
                  <figure style="margin-left:10px;margin-right:5px" class="image is-16x16">
                    <img :src="store.img">
                  </figure>
                  <span class="has-text-weight-medium" style="white-space:pre">{{store.name}}</span>
              </b-radio>

            </div>

        </div>

        <div style="padding: 0 16px 16px 16px;margin-top:-10px">

           <p class="is-size-5 has-text-success has-text-weight-medium">Товари</p>

            <div style="margin-top:8px;margin-left:5px;display:table-caption">

              <b-radio v-model="categorySelect" :native-value="category" type="is-success" style="display:flex;padding-bottom:10px" v-for="(category,index) in categories" :key="category.name">

                <b-icon :icon="category.icon" style="margin-left:7px;margin-right:5px"> </b-icon>

                <span class="has-text-weight-medium" style="white-space:pre">{{category.name}}</span>

              </b-radio>

            </div>

        </div>

    </div>

    <div v-if="!$fetchState.pending" class="main-content">

      <nav class="level" style="margin-top:15px">

        <div class="level-left">
          <p class="has-text-weight-medium">{{count}} товарів</p>
        </div>

        <div class="level-right">
          <p @click="$store.commit('updateSort', 'price_asc')" :class="{'has-text-success': sort == 'price_asc' || sort == 'price-asc'}" style="cursor:pointer" class="level-item has-text-weight-medium">Дешевші</p>
          <p @click="$store.commit('updateSort', 'price_desc')" :class="{'has-text-success': sort == 'price_desc' || sort == 'price-desc'}" style="cursor:pointer" class="level-item has-text-weight-medium">Дорожчі</p>
        </div>

      </nav>

      <div class="columns is-multiline" style="margin-top:-10px">
        <div class="column is-3" v-for="(good,index) in goods" :key="good.ean">
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

    var storeID = this.storeSelect[this.city.data] // Город
    var categoryID = this.categorySelect[this.storeSelect.code] // Категория

    if (this.storeSelect.name == 'Сільпо'){ 
      await this.$axios.$get(`https://api.skiku.online/silpo/store/${storeID}/category/${categoryID}/page/${this.page}/sort/${this.sort}`)
        .then((res) => {
          this.goods = res.goods
          this.count = res.count
      })
    }
    else{
      await this.$axios.$get(`https://api.skiku.online/store/${storeID}/category/${categoryID}/page/${this.page}/sort/${this.sort}`)
        .then((res) => {
          this.goods = res.goods
          this.count = res.count
      })
    }
  },
  mounted(){
    if (this.$cookies.get("city") == null){
      this.$cookies.set("city", "Київ")
      this.city.data = this.$cookies.get("city")
    }
  },
  computed: {
   sort(){
     return this.$store.state.sort
   }
  },
  watch: {
    'city.data'(val){
      this.$cookies.set("city", val)
      if ( !Object.keys(this.storeSelect).includes(this.city.data) ){
        var newStore = this.stores.find(item => Object.keys(item).includes(this.city.data) ) 
        this.storeSelect = newStore
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
      cities: ['Київ', 'Львів', 'Дніпро', 'Одеса', 'Харків'],
      city: {
        data: this.$cookies.get("city")
      },
      count: null,
      page: Number(this.$route.params.id),
      storeSelect: this.$store.state.store,
      categorySelect: this.$store.state.category,
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
.sidebar{background-color:#F2F2F2;border-width:0 1px 0 0;position:fixed;top:50px;left:0;bottom:0;width:250px;overflow:auto}
.main-content{max-width:100%;padding:16px 32px;margin:0 auto;display:block}
span.icon.is-left{margin:16px}span.control-label{display:contents}
.card{height:100%}
</style>