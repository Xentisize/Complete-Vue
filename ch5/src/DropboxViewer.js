Vue.component('dropbox-viewer', {
  template: '#dropbox-viewer-template',

  data() {
    return {
      accessToken: 'sFpPbjQSFGAAAAAAAAAADMkVJUduzON1o1W05PkljiVHoe69ZXRdiXI7SaiwBC_d',
      structure: [],
      byteSizes: ['Bytes', 'KB', 'MB', 'GB', 'TB'],
      isLoading: true,
    }
  },

  methods: {
    dropbox() {
      return new Dropbox.Dropbox({
        accessToken: this.accessToken,
        fetch: fetch,
      })
    },

    getFolderStructure(path) {
      this.dropbox()
        .filesListFolder({
          path: path,
          include_media_info: true,
        })
        .then(response => {
          console.log(response.entries)
          this.structure = response.entries
          this.isLoading = false
        })
        .catch(error => {
          console.log(error)
        })
    },

    bytesToSize(bytes) {
      let output = '0 Byte'

      if (bytes > 0) {
        let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
        output = Math.round(bytes / Math.pow(1024, i), 2) + ' ' + this.byteSizes[i]
      }
      return output
    },
  },

  created() {
    this.getFolderStructure('')
  },
})
