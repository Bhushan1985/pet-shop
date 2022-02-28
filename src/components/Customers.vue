<template>
	<div>This is customer page</div>
</template>
<script>
import customerSvc from "../services/customer.service";

export default {
	mounted () {
		this.loadData();	
	},
	methods: {
		async loadData () {
			try {
				const output = await customerSvc.getCustomers();
				console.log('out', output.data)
			} catch (err) {
				console.log('Error', err)
			}
		}
	}
}
</script>
