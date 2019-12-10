import root from './root'

Vue.use(Vuex)

const store = new Vuex.Store({
    ...root,
    modules: {}
})

export default store
