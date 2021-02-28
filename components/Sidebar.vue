<template>

  <div class="notification is-white">

    <p class="is-size-5 has-text-success mb-2">Магазин</p>

    <b-radio v-if="store[city]" v-model="selectedStore" :native-value="store" class="mb-2 is-flex" type="is-success" v-for="(store,i) in stores" :key="store.i">
        <figure class="image is-16x16 mx-2">
          <img :src="store.img">
        </figure>
        <span class="has-text-dark" style="white-space:pre">{{store.name}}</span>
    </b-radio>

    <p class="is-size-5 has-text-success mb-2">Товари</p>

    <b-radio v-model="selectedCategory" :native-value="category" class="mb-2 is-flex" type="is-success" v-for="(category,i) in categories" :key="category.i">
      <b-icon type="is-dark" class="mx-1" :icon="category.icon" />
      <span class="has-text-dark" style="white-space:pre">{{category.name}}</span>
    </b-radio>

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