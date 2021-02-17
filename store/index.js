  export const state = () => ({
    store: {
      name: "Ашан",
      code: "auchan",
      img: "/images/auchanMini.png",
      Київ: "48246401",
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
      silpo: "378",
      icon: "🥔"
    },
    sort: 'price_asc',
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
        if(newSort == 'price_asc'){
          newSort = 'price-asc'
        }
        else if(newSort == 'price_desc'){
          newSort = 'price-desc'
        }
      }
      else{
        if(newSort == 'price-asc'){
          newSort = 'price_asc'
        }
        else if(newSort == 'price-desc'){
          newSort = 'price_desc'
        }
      }
      state.sort = newSort
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