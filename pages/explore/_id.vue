<template>

<div style="background-color:#F2F2F2">
   
    <Navbar :cities="cities" :city="city" />

    <div v-if="pending !== true" style="padding-left:10px;padding-right:10px" class="mobile is-hidden-tablet">
        
        <nav class="level is-mobile" style="margin-top:25px">

          <div class="level-left">
            <p class="has-text-weight-medium">{{count}} товарів</p>
          </div>

          <div class="level-right">

            <div class="level-item">
              <b-dropdown id="mobile_sort" v-model="by" :mobile-modal="false" position="is-bottom-left" :trap-focus="false" aria-role="list">
                  <b-button style="border-radius:5px!important;width:80.4px!important" size="is-small" slot="trigger">
                    <span v-if="by == 'price_asc'" class="has-text-weight-medium">Дешевше</span>
                    <span v-else class="has-text-weight-medium">Дорожче</span>
                  </b-button>
                  <b-dropdown-item class="has-text-weight-medium is-size-7" v-if="by !== 'price_asc'" value="price_asc" :focusable="false">Дешевше</b-dropdown-item>
                  <b-dropdown-item class="has-text-weight-medium is-size-7" v-else value="price_desc" :focusable="false">Дорожче</b-dropdown-item>
              </b-dropdown>
            </div>

            <div @click="open()" class="level-item"> <b-icon icon="tune"></b-icon> </div>

          </div>

        </nav>

        <div class="columns is-mobile is-multiline">

          <div class="column is-6" v-for="(good,index) in goods" :key="good.ean">
            <CardMobile :good="good" :store="storeSelect" />
          </div>

        </div>

        <PaginationMobile :count="count" :page="page" />

        <client-only>
          <swipeable-bottom-sheet ref="swipeableBottomSheet">

            <div style="margin-top:10px;margin-left:25px;margin-bottom:60px">

              <p class="is-size-5 has-text-success has-text-weight-medium"> Магазин </p>

              <div class="field" style="display:grid;margin-left:5px;margin-top:8px">

                <div v-for="(store,index) in stores" :key="store.name">
                <b-radio v-if="store[city.data]" v-model="storeSelect" :native-value="store" type="is-success" style="padding-bottom:10px">

                    <figure style="position:absolute;margin-left:27px;width:20px!important;height:20px!important">
                      <img :src="store.img">
                    </figure>

                    <span class="has-text-weight-medium" style="margin-left:32px;white-space:pre">{{store.name}}</span>

                </b-radio>
                </div>
              </div>

              <p style="margin-bottom:10px" class="is-size-5 has-text-success has-text-weight-medium"> Товари </p>

              <b-radio v-model="categoriesSelect" :native-value="category" type="is-success" style="display:flex;padding-bottom:10px;margin-left:5px" v-for="(category,index) in categories" :key="category.name">

                <b-icon :icon="category.icon" style="margin-left:5px;margin-right:3px"> </b-icon>

                <span class="has-text-weight-medium" style="white-space:pre">{{category.name}}</span>

              </b-radio>

            </div>
          </swipeable-bottom-sheet>
        </client-only>

    </div>

    <div class="desktop is-hidden-mobile" style="padding-left:250px">

    <div class="sidebar">

        <div style="padding: 15px 16px 16px 16px" id="Stores"> 

           <p class="is-size-5 has-text-success has-text-weight-medium"> Магазин </p>

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

           <p class="is-size-5 has-text-success has-text-weight-medium"> Товари </p>

            <div style="margin-top:8px;margin-left:5px;display:table-caption">

              <b-radio v-model="categoriesSelect" :native-value="category" type="is-success" style="display:flex;padding-bottom:10px" v-for="(category,index) in categories" :key="category.name">

                <b-icon :icon="category.icon" style="margin-left:7px;margin-right:5px"> </b-icon>

                <span class="has-text-weight-medium" style="white-space:pre">{{category.name}}</span>

              </b-radio>

            </div>

        </div>

    </div>

    <div class="main-content" style="margin-top:10px" v-if="pending == true">

      <b-skeleton width="10%"></b-skeleton>
      
      <div class="columns is-multiline" style="margin-top:10px">

        <div class="column is-3" v-for="n in 8">
          <div class="card">
            <div class="card-image">
              <b-skeleton width="250" height="255"></b-skeleton>
            </div>
            <div style="margin-left:-10px" class="card-content">
              <div class="content" style="margin-top:-10px">
                <b-skeleton width="40%"></b-skeleton>
                <b-skeleton width="80%"></b-skeleton>
              </div>
            </div>
          </div>
        </div>

      </div>
      
    </div>

    <div class="main-content" v-else>

      <nav class="level" style="margin-top:15px">

        <div class="level-left">
          <p class="has-text-weight-medium">{{count}} товарів</p>
        </div>

        <div class="level-right">
          <p @click="by = 'price_asc'" :class="{'has-text-success': by == 'price_asc' || by == 'price-asc'}" style="cursor:pointer" class="level-item has-text-weight-medium">Дешевші</p>
          <p @click="by = 'price_desc'" :class="{'has-text-success': by == 'price_desc' || by == 'price-desc'}" style="cursor:pointer" class="level-item has-text-weight-medium">Дорожчі</p>
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

  mounted(){
    if(process.browser){
      
      if (localStorage.getItem("city") == null)
      {
        localStorage.setItem("city", "Київ")
      }
      this.city.data = localStorage.getItem("city")
    }

  },
  watch: {
    'city.data'(val) {
      this.pending = true
      this.categoryGoods(this.storeSelect,this.categoriesSelect)

      if(process.browser){
       return localStorage.setItem("city", val)
      }
      
    },
    by() {
      this.pending = true
      this.categoryGoods(this.storeSelect,this.categoriesSelect)
    },
    categoriesSelect(category) {
      this.$store.commit('updateCategory', category)
      this.pending = true
      this.$router.push('/explore/1')
      this.categoryGoods(this.storeSelect,category)
    },
    storeSelect(store) {
      this.$store.commit('updateStore', store)
      this.pending = true
      this.$router.push('/explore/1')
      this.categoryGoods(store,this.categoriesSelect)
    }
  },
  methods: {
    open() {
      this.$refs.swipeableBottomSheet.setState("open")
    },
    categoryGoods(store,category){

      var a = category[this.$store.state.store.code] // Категория
      var b = store[this.city.data] // Город

      if (category.name !== 'Акційні' && store.name !== 'Сільпо')
      {
        this.$axios.$get(`https://api.skiku.online/store/${b}/category/${a}/page/${this.page}/sort/${this.by}`)
         .then((res) => {
          this.goods = res.goods
          this.count = res.count
          this.categoriesSelect = category
          this.pending = false
        })
      }
      else if (category.name !== 'Акційні' && store.name == 'Сільпо')
      { 
        var sort
        if (this.by == 'price_asc') {sort = 'price-asc'}
        else {sort = 'price-desc'}

        this.$axios.$get(`https://api.skiku.online/silpo/store/${b}/category/${a}/page/${this.page}/sort/${sort}`)
         .then((res) => {
          this.goods = res.goods
          this.count = res.count
          this.categoriesSelect = category
          this.pending = false
        })
      }
      else if (category.name == 'Акційні' && store.name !== 'Сільпо')
      { 
        this.$axios.$get(`https://api.skiku.online/promo/store/${b}/page/${this.page}/sort/${this.by}`)
         .then((res) => {
          this.goods = res.goods
          this.count = res.count
          this.pending = false
        })
      }
      else
      {
        var sort
        if (this.by == 'price_asc') {sort = 'price-asc'}
        else {sort = 'price-desc'}

        this.$axios.$get(`https://api.skiku.online/silpoPromo/store/${b}/page/${this.page}/sort/${sort}`)
         .then((res) => {
          this.goods = res.goods
          this.count = res.count
          this.pending = false
        })
      }
    }
  },
  data() {
    return{
      goods: [],
      cities: ['Київ', 'Львів', 'Дніпро', 'Одеса', 'Харків'],
      pending: true,
      count: null,
      by: 'price_asc',
      active: false,
      city: {
        data: null
      },
      page: Number(this.$route.params.id),
      storeSelect: this.$store.state.store,
      categoriesSelect: this.$store.state.category,
      stores: storesJson,
      categories: categoriesJson
    }
  }

}

</script>

<style>
body { overflow-x: hidden; }
.dropdown-content{font-size:.875rem;padding-bottom:.5rem;padding-top:.5rem;border:1px solid #dbdbdb;border-radius:6px}.dropdown-menu{min-width:110px!important;transition-duration:86ms;transition-property:opacity,transform}.dropdown-item{padding:.375rem 1rem;padding-right:3rem;white-space:nowrap}.sidebar{background-color:#F2F2F2;border-width:0 1px 0 0;position:fixed;top:50px;left:0;bottom:0;width:250px;overflow:auto}.main-content{max-width:100%;padding:16px 32px;margin:0 auto;display:block}span.icon.is-left{margin:16px}span.control-label{display:contents}::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:#f1f1f1}::-webkit-scrollbar-thumb{background:#888}.card[data-state="open"][data-v-5d6b6420]{top:100px!important}#mobile_sort .dropdown-content{width:83px;border-radius:0!important;border-bottom-left-radius:6px!important;border-bottom-right-radius:6px!important}#mobile_sort .dropdown-menu{right:unset!important;margin-left:-1px;margin-top:-7px}#mobile_sort .dropdown-item{padding:0 .8rem!important}#mobile_sort .button:focus,.button.is-focused{border-color:transparent!important;color:#363636}#nav{padding:.25rem;background-color:hsla(0,0%,100%,.75);backdrop-filter:blur(12px)}.card{height:100%}
</style>