import Vue from 'vue'
import Router from 'vue-router'
import Customers from './components/Customers.vue'

Vue.use(Router)

const router = new Router({
	routes:[
		{ path: '/customers', name: 'customers', component: Customers },
	]
})

export default router
