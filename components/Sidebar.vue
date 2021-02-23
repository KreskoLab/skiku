<template>

  <div class="column is-2 mr-2">

      <div class="mt-5 px-4"> 

        <p class="is-size-5 has-text-success has-text-weight-medium">Магазин</p>

        <div class="mt-2 ml-1">

          <b-radio v-if="store[city]" v-model="selectedStore" :native-value="store" class="mb-2" type="is-success" v-for="(store,i) in stores" :key="store.i">
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

            <b-radio v-model="selectedCategory" :native-value="category" class="mb-2 is-flex" type="is-success" v-for="(category,i) in categories" :key="category.i">
              <b-icon class="mx-1" :icon="category.icon" />
              <span class="has-text-weight-medium" style="white-space:pre">{{category.name}}</span>
            </b-radio>

          </div>

      </div>

  </div>

</template>

<script>
export default {
  props: ['categories','stores','city'],
  data(){
    return{
      selectedStore:this.$store.getters.getStore,
      selectedCategory: this.$store.getters.getCategory,
    }
  },
  watch:{
    selectedStore(val){
      this.$emit('newStore',val)
    },
    selectedCategory(val){
      this.$emit('newCategory',val)
    }
  }
}

</script>