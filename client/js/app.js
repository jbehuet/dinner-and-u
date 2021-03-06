import Vue from 'vue'
import App from './components/app.vue'
import home from './components/home.vue';
import parties from './components/parties.vue';
import recipes from './components/recipes.vue';
import guests from './components/guests.vue';
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.use(VueRouter)

Vue.config.debug = true;

// Router options
export var router = new VueRouter({
    history: false,
    root: '/'
})

// Router map for defining components
router.map({
   '/': {
      component: home
   },
   '/parties': {
      component: parties
   },
   '/recipes/:party': {
      component: recipes
   },
   '/guests/:party': {
      component: guests
   }
});

// Redirect to the home route if any routes are unmatched
router.redirect({
  '*': '/'
})

router.start(App, '#app');