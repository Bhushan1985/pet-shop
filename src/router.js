import Vue from 'vue'
import Router from 'vue-router'
import Customers from './components/Customers'
import Dashboard from './components/Dashboard'
import PageNotFound from './components/PageNotFound'

Vue.use(Router)

const router = new Router({
	routes:[
		{ path: '/', name: 'home', component: Dashboard },
		{ path: '/customers', name: 'customers', component: Customers },
		{ path: '*', component: PageNotFound }
	]
})

export default router
