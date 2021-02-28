  export const state = () => ({
    store: {
      name: "Ашан",
      code: "auchan",
      img: "/images/auchan.png",
      Київ: "48246414",
      Львів: "48246409",
      Дніпро: "48246409",
      Одеса: "48246409",
      Харків: "48246409"
    },
    category: {
      name: "Овочі",
      novus: "vegetables",
      auchan: "vegetables-auchan",
      eko: "vegetables-ekomarket",
      metro: "vegetables-metro",
      varus: "vegetables-varus",
      silpo: "378",
      icon: "corn"
    },
    sort: {
      name: "популярні",
      code: "popularity_desc"
    },
    city: 'Київ'
  })
  
  export const mutations = {
    updateStore(state, newStore) {
      state.store = newStore
    },
    updateCategory(state, newCategory) {
        state.category = newCategory
    },
    updateSort(state, newSort) {
      if(state.store.name == 'Сільпо'){
        if(newSort.code == 'popularity_desc'){
          newSort.code = 'popular-asc'
        }
        newSort.code = newSort.code.replace('_','-')
        state.sort = newSort
      }
      else{
        if(newSort.code == 'popular-asc'){
          newSort.code = 'popularity_desc'
        }
        newSort.code = newSort.code.replace('-','_')
        state.sort = newSort
      }
    },
    updateCity(state, city){
      this.$cookies.set('city', city)
      state.city = city
    }
  }

  export const actions = {
    check ({ commit, state }) {
      if( !this.$cookies.get('city') ){
        commit('updateCity', state.city)
      }
      else{
        commit('updateCity', this.$cookies.get('city'))
      }
    }
  }

  export const getters = {
    getStore: (state) => {
      return state.store
    },
    getCategory: (state) => {
      return state.category
    },
    getSort: (state) => {
      return state.sort
    },
    getCity: (state) => {
      return state.city
    }
  }