import index from '@/components/index'
import excel from '@/components/excel'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: '/',
            name: 'index',
            component: index
        },
        {
            path: '/excel',
            name: 'excel',
            component: excel
        }
    ]
})
