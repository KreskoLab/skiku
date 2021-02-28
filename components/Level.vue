<template>

  <nav class="level is-mobile">

    <div class="level-left">
      <div class="level-item">
        <div class="is-size-5 has-text-dark">{{total}} товарів</div>
      </div>
    </div>

    <div class="level-right">
      <div class="level-item">
        <b-dropdown aria-role="list" position="is-bottom-left" >

            <template #trigger="{ active }">
                <p class="tag is-white is-clickable is-unselectable" role="button">
                    <span class="is-size-6 has-text-dark">{{sort.name}}</span>
                 </p>
            </template>

            <b-dropdown-item 
              v-for="(item,i) in sorts" 
              :key="item.i"
              @click="$store.commit('updateSort',item)" 
              aria-role="listitem" 
              :focusable="false">
              {{item.name}}
            </b-dropdown-item>

        </b-dropdown>
      </div>
    </div>

  </nav>
    
</template>

<script>
export default {
  props:{
    total:{
      type: Number,
      default: 0
    }
  },
  data(){ 
    return{
      sorts: [
        {
          name: 'популярні',
          code: 'popularity_desc'
        },
        {
          name: 'дешеві',
          code: 'price_asc'
        },
        {
          name: 'дорогі',
          code: 'price_desc'
        }
      ]
    }
  },
  computed:{
    sort(){
      return this.$store.getters.getSort
    }
  }
}

</script>