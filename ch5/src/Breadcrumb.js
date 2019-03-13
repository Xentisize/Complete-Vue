Vue.component('breadcrumb', {
  template: `<div>
    <span v-for="(f, i) in folders">
      <a :href="f.path">{{ f.name }}</a>
      <span v-if="i !== (folders.length - 1)"> > </span>
    </span>
  </div>`,

  props: {
    p: String,
  },

  computed: {
    folders() {
      let output = [],
        slug = '',
        parts = this.p.split('/')
      for (let item of parts) {
        slug += item
        output.push({
          name: item || 'home',
          path: '#' + slug,
        })
        slug += '/'
      }
      return output
    },
  },

  methods: {
    navigate(folder) {
      this.$emit('path', folder.path)
    }
  }
})
