const app = new Vue({
  el: '#app',

  data: {
    path: '',
  },

  methods: {
    updateHash() {
      let hash = window.location.hash.substring(1)
      this.path = hash || ''
    },
  },

  created() {
    this.updateHash()
    //   window.onhashchange = () => {
    //     let hash = window.location.hash.substring(1)
    //     app.path = hash || ''
    //   }
    window.onhashchange = () => {
      app.updateHash()
    }
  },
})
