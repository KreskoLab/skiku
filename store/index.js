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
        icon: "food-apple",
        name: "Фрукти",
        novus: "fruits",
        auchan: "fruits-auchan",
        eko: "fruits-ekomarket",
        silpo: "381"
    },
    sort: 'price_asc'
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
    }
  }