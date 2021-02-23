<template>

  <b-modal  :active="show" full-screen :can-cancel="false">
      <div class="card" style="overflow: scroll;">
        <div class="card-content">

            <div class="media">
                <div class="media-content">
                  <p class="has-text-centered is-size-5 ml-5 mb-1">Оберіть фільтри</p>
                </div>
                <div class="media-right mt-1 is-clickable">
                    <span @click="$emit('close',false)">❌</span>
                </div>
            </div>

            <div class="content">
                <p class="is-size-5 has-text-success has-text-weight-medium mb-2">Магазин</p>

                  <b-radio v-if="store[city]" 
                    v-model="selectedStore" 
                    v-for="(store,i) in stores" :key="store.i" 
                    :native-value="store" 
                    class="mb-2 is-flex" 
                    style="width:180px"
                    type="is-success"
                  >
                    <figure class="image is-16x16 mx-2">
                      <img :src="store.img">
                    </figure>
                    <span class="has-text-weight-medium" >{{store.name}}</span>
                  </b-radio>

                <p class="is-size-5 has-text-success has-text-weight-medium mb-2">Товари</p>

                  <b-radio v-model="selectedCategory"
                    v-for="(category,i) in categories" :key="category.i" 
                    :native-value="category" 
                    class="mb-2 is-flex" 
                    style="width:200px"
                    type="is-success"
                  >
                    <b-icon class="mx-1" :icon="category.icon" />
                    <span class="has-text-weight-medium" style="white-space:pre">{{category.name}}</span>
                  </b-radio>

            </div>
        </div>
    </div>
  </b-modal>

</template>

<script>
export default {
  props: ['categories','stores','city','show'],
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