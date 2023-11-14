// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head:{
      title:'Solor System and Zodiac Sign',
      meta:[
        {name:'description',content:'The site about the planets of the solar system and the twelve zodiac constellations.'}
      ]
    }
  },
  css : [
    '@/assets/css/style.css'
  ]
})
