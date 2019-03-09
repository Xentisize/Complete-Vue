Vue.component('folder', {
  template: `<li><strong>
  <a :href="f.path_lower" @click.prevent="navigate()">{{ f.name }}</a>
  </strong></li>`,

  props: {
    f: Object,
  },

  methods: {
    navigate() {
      this.$emit('path', this.f.path_lower)
    },
  },
})
