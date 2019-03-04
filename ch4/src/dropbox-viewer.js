Vue.component('dropbox-viewer', {
  template: '#dropbox-viewer-template',

  data() {
    return {
      accessToken: 'sFpPbjQSFGAAAAAAAAAADMkVJUduzON1o1W05PkljiVHoe69ZXRdiXI7SaiwBC_d',
      structure: {},
      byteSizes: ['Bytes', 'KB', 'MB', 'GB', 'TB'],
      isLoading: true,
      path: '',
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