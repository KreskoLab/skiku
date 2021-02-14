<template>
  
<section class="hero is-fullheight">

  <div class="hero-body">
    <div class="container has-text-centered">

      <p class="is-size-1 has-text-weight-bold is-hidden-mobile" style="margin-top:-100px;color:#333333" >
        Перегляд цін у
      </p>

      <p class="is-size-2 has-text-weight-bold is-hidden-tablet" style="margin-top:-100px;color:#333333" >
        Перегляд цін у
      </p>

      <transition name="bounce" appear > 

        <div class="mt-5 has-image-centered" :key="stores[0]">
          <img width="200" :src="stores[0].img">
        </div>

      </transition>

      <b-button class="mt-6" rounded tag="nuxt-link" to="/explore/1" type="is-success" size="is-medium">
        Перейти
      </b-button>

    </div>
  </div>

</section>

</template>

<script>

export default {

  data() {
    return{
      stores: [
        {
          name: 'Сільпо',
          img: 'https://shop.silpo.ua/images/silpo/logo.svg'
        },
        {
          name: 'Ашан',
          img: 'https://img4.zakaz.ua/store_logos/auchan.svg'
        },
        {
          name: 'Novus',
          img: 'https://img4.zakaz.ua/store_logos/novus.svg'
        },
        {
          name: 'ЕКО',
          img: 'https://img4.zakaz.ua/store_logos/ekomarket.svg'
        }
      ]
    }
  },
  mounted(){
    window.setInterval(()=>{
      this.switchStores();
    }, 5000);
  },
  methods:{
    switchStores(){
      const first = this.stores.shift();
      this.stores = this.stores.concat(first);
    }
  }

}

</script>

<style>
.bounce-enter-active{animation:bounce-in .6s}.bounce-leave-active{animation:bounce-in .6s reverse}@keyframes bounce-in{0%{transform:scale(0)}50%{transform:scale(1.5)}100%{transform:scale(1)}}
.has-image-centered{margin-left:auto;margin-right:auto}
.hero-body{background: url('~assets/bg.png') repeat 0 0;
-webkit-animation:slide 50s linear infinite}@-webkit-keyframes slide{from{background-position:0 0}to{background-position:-400px 0}}
</style>