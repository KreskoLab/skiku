<template>
  <div>

    <div v-if="$fetchState.pending">
      <b-loading :active="true" />
    </div>

    <section class="section pb-0" v-if="!$fetchState.pending">

      <div class="columns">

        <div class="column is-3-desktop">

          <Sidebar class="sidebar is-hidden-mobile" 
            @newStore="storeSelect = $event" 
            @newCategory="categorySelect = $event" 
            :categories="categories" 
            :stores="stores" 
            :city="city" 
          />

          <b-collapse :open="false" class="is-hidden-tablet">

            <template #trigger>
                <b-button
                  label="Фільтри"
                  type="is-white"
                  expanded
                />
            </template>

            <Sidebar 
              @newStore="storeSelect = $event" 
              @newCategory="categorySelect = $event" 
              :categories="categories" 
              :stores="stores" 
              :city="city" 
            />

          </b-collapse>

        </div>

        <div class="column is-9-desktop is-8-tablet">

          <div class="columns is-multiline">

            <div class="column is-12">
              <Level :total="count" />
            </div>
            
            <div class="column is-12-mobile is-6-tablet is-4-desktop" v-for="(good,i) in goods" :key="good.i">

              <Card v-if="storeSelect.name == 'Сільпо'" :good="good" :store="storeSelect" />

              <NuxtLink v-else :to="`explore/${good.ean}`">
                <Card id="good" :good="good" :store="storeSelect" />
              </NuxtLink>

            </div>
          
            <div class="column is-12">
              <Pagination :count="count" />
            </div>

          </div>

        </div>

      </div>

    </section>

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
            "sortBy": this.sort.code
          }
        })
        .then( (res) => {
          this.goods = res.items.map( item => ({
            title: item.name,
            ean: item.id,
            img: item.mainImage,
            price: item.price,
            priceStopAfter: item.priceStopAfter ? item.priceStopAfter.toString().substr(0, 5) : item.priceStopAfter
          }))
          this.count = res.itemsCount
        })

      }
      else{
        await this.$axios.$get(`zakaz/stores/${storeID}/categories/${categoryID}/products/?page=${Number(this.$route.query.page)}&sort=${this.sort.code}`, {
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
            priceStopAfter: item.discount.due_date ? item.discount.due_date.toString().substr(8, 4) +'.'+ item.discount.due_date.substr(5, 2) : item.discount.due_date
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
      this.$fetch()
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
span.icon.is-left{margin:16px}span.control-label{display:contents}
.card{height:100%}

.sidebar{
  position: sticky;
  position: -webkit-sticky;
  top: 0;
}

#good{
  transition: 0.5s ease box-shadow, 0.3s ease transform;
}

#good:hover{
  box-shadow: 0px 10px 10px rgba(0,0,0,0.15); 
  transform: scale(1.02);
}

</style>