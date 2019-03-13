Vue.component('file', {
  template: `<li>
  <strong>{{ f.name }}</strong>
  <span v-if="f.size"> - {{ bytesToSize(f.size) }}</span>
  <span v-if="link"> - <a :href="link">Download</a></span>
  </li>`,

  data() {
    return {
      byteSizes: ['Bytes', 'KB', 'MB', 'GB', 'TB'],
      link: '',
    }
  },

  props: {
    f: Object,
    d: Object,
  },

  methods: {
    bytesToSize(bytes) {
      let output = '0 Byte'

      if (bytes > 0) {
        let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
        output =
          Math.round(bytes / Math.pow(1024, i), 2) + ' ' + this.byteSizes[i]
      }
      return output
    },
  },

  created() {
    this.d
      .filesGetTemporaryLink({
        path: this.f.path_lower,
      })
      .then(data => {
        this.link = data.link
      })
  },
})
