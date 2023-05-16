let Vue;
class VueRouter {
  constructor(options) {
    this.$options = options;
    this.current = '/'
    Vue.util.defineReactive(this, 'current', window.location.hash.slice(1)|| '/')
    window.addEventListener('hashchange', ()=>{
      this.current = window.location.hash.slice(1)
    })
  }
}

VueRouter.install = function (_vue) {
  Vue = _vue;
  console.log('Vue:', Vue);
  Vue.mixin({
    beforeCreate() {
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router;
      }
    },
  });
  Vue.component('router-link', {
    props: {
      to: {
        type: String,
        require: true,
      },
    },
    render(h) {
      return h(
        'a',
        {
          attrs: {
            href: '#' + this.to,
          },
        },
        this.$slots.default
      );
    },
  });
  Vue.component('router-view', {
    render(h) {
      let c = null
      let route = this.$router.$options.routes.find(r => r.path === this.$router.current)
      console.log('route:', route)
      if(route){
        c = route.component
      }
      return h(c);
    },
  });
};
export default VueRouter;
