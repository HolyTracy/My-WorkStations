import App from './App'
import router from './router'
import store from './store'
import utils from './plugin/utils.js'

Vue.use(utils)
Vue.use(ELEMENT)
Vue.use(VueLazyload)

Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
