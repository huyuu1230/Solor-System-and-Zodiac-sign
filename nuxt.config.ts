// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head:{
      title:'Solor System and Zodiac Sign',
      meta:[
        {name:'description',content:'The site about the planets of the solar system and the twelve zodiac constellations.'}
      ],
      link:[
        {
          rel:"preconnect",
          href:"https://fonts.googleapis.com"
        },
        {
          rel:"preconnect",
          href:"https://fonts.gstatic.com",
          crossorigin:"",
        },
        {
          rel:"stylesheet",
          href:"https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;700&family=Shippori+Mincho:wght@400;700&display=swap",
        },
      ]
    }
  },
  css : [
    '~/assets/css/style.css'
  ]
})
