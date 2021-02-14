export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Skiku - ціни на продукти онлайн',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '@/assets/main.scss'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    {src: '@/plugins/buefy.js'}
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    '@nuxt/image'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    'cookie-universal-nuxt'
  ],

  axios: {
    proxy: true
  },

  proxy: {
    '/zakaz/': { target: 'https://stores-api.zakaz.ua/', pathRewrite: {'^/zakaz/': ''}, changeOrigin: true },
    '/silpo/': { target: 'https://api.catalog.ecom.silpo.ua/', pathRewrite: {'^/silpo/': ''}, changeOrigin: true }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  }
}
