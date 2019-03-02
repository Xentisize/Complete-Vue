Vue.component('dropbox-viewer', {
  template: '#dropbox-viewer-template',

  data() {
    return {
      accessToken: 'sFpPbjQSFGAAAAAAAAAADMkVJUduzON1o1W05PkljiVHoe69ZXRdiXI7SaiwBC_d',
      structure: {},
      byteSizes: ['Bytes', 'KB', 'MB', 'GB', 'TB'],
      isLoading: true,
    }
  },

  methods: {
    dropbox() {
      return new Dropbox.Dropbox({
        accessToken: this.accessToken
      })
    },

    getFolderStructure(path) {
      this.dropbox().filesListFolder({
        path: path,
        include_media_info: true,
      })
        .then(response => {
          const structure = {
            folders: [],
            files: [],
          }
          for (let entry of response.entries) {
            if (entry['.tag'] === 'folder') {
              structure.folders.push(entry)
            } else {
              structure.files.push(entry)
            }
          }
          this.path = path
          this.structure = structure
          this.isLoading = false
        })
        .catch(error => {
          console.log(error)
        })
    },

    updateStructure(path) {
      this.isLoading = true
      this.getFolderStructure(path)
    }
  },

  created() {
    this.getFolderStructure('')
  },


})

Vue.component('folder', {
  template: `<li><strong><a :href="f.path_lower" @click.prevent="navigate()">{{ f.name }}</a></strong></li>`,

  props: {
    f: Object,
  },

  methods: {
    navigate() {
      this.$emit('path', this.f.path_lower)
    }
  }
})

Vue.component('file', {
  template: `<li><strong>{{ f.name }}</strong>
                    <span v-if="f.size"> - {{ bytesToSize(f.size) }}</span>
                </li>`,

  props: {
    f: Object,
  },

  data() {
    return {
      byteSizes: ['Bytes', 'KB', 'MB', 'GB', 'TB'],
    }
  },

  methods: {
    bytesToSize(bytes) {
      let output = '0 Byte'
      if (bytes > 0) {
        let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
        output = Math.round(bytes / Math.pow(1024, i), 2) + ' ' + this.byteSizes[i]
      }
      return output
    }
  }
})

Vue.component('breadcrumb', {
  template: `<div></div>`,

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
          'name': item,
          'path': slug
        })
        slug += '/'
      }
      return output
    }
  }
})

const vm = new Vue({
  el: '#app',
})