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
        icon: "sale",
        name: "Акційні"
    }
  })
  
  export const mutations = {
    updateStore(state, newStore) {
      state.store = newStore
    },
    updateCategory(state, newCategory) {
        state.category = newCategory
    }
  }

  export const getters = {
    getStore: (state) => {
      return state.store
    },
    getCategory: (state) => {
      return state.category
    }
  }