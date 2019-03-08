Vue.component('dropbox-viewer', {
  template: '#dropbox-viewer-template',

  data() {
    return {
      accessToken:
        'sFpPbjQSFGAAAAAAAAAADMkVJUduzON1o1W05PkljiVHoe69ZXRdiXI7SaiwBC_d',
      structure: {
        files: [],
        folders: [],
      },
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
          for (let entry of response.entries) {
            if (entry['.tag'] === 'folder') {
              this.structure.folders.push(entry)
            } else {
              this.structure.files.push(entry)
            }
          }
          this.isLoading = false
        })
        .catch(error => {
          console.log(error)
        })
    },
  },

  created() {
    this.getFolderStructure('')
  },
})
