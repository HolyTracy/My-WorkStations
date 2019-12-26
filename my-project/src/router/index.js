Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: '/',
            name: 'index',
            component: resolve => require(['@/components/index'], resolve)
        },
        {
            path: '/excel',
            name: 'excel',
            component: resolve => require(['@/components/excel'], resolve)
        }
    ]
})
