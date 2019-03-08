Vue.component('folder', {
  template: `<li><strong>{{ f.name }}</strong></li>`,

  props: {
    f: Object
  }
})