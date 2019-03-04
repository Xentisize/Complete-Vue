Vue.component('breadcrumb', {
  template: `<div>
              <span v-for="(f, i) in folders">
                <a :href="f.path" @click.prevent="navigate(f)">
                  {{ f.name || 'Home' }}
                </a>
                <span v-if="i !== (folders.length - 1)"> o </span>
              </span>  
            </div>`,

  props: {
    p: String,
  },

  methods: {
    navigate(folder) {
      this.$emit('path', folder.path)
    }
  },

  computed: {
    folders() {
      let output = [],
        slug = '',
        parts = this.p.split('/')
      for (let item of parts) {
        slug += item
        output.push({
          'name': item,
          'path': slug
        })
        slug += '/'
      }
      return output
    }
  }
})