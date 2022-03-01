<template>
	<div class="mx-2">
		<v-card outlined class="card-border">
			<v-card-title>Customers</v-card-title>
			<v-card-subtitle>
				<a href="#" class="primary--text">Dashboard</a> /
			</v-card-subtitle>
		</v-card>
		<v-card outlined class="mt-5">
			<v-data-table :headers="headers" :items="items">
				<template v-slot:[`item.firstName`]="{ item }">
					<v-avatar size="44" class="mr-1">
						<img src="@/assets/bg.png" alt="" />
					</v-avatar>
					<span>{{ item.firstName + ' ' + item.lastName }}</span>
				</template>
				<template v-slot:[`item.createdAt`]="{ item }">
					<div>
						<span>{{ item.createdAt | formatDate(true)  }}</span>
					</div>
					<span class="grey--text">{{ item.createdAt | formatDate  }}</span>
				</template>
				<template v-slot:[`item.isMarketing`]="{ item }">
					<v-avatar color="green" size="33" v-if="item.isMarketing">
						<span class="white--text">Yes</span>
					</v-avatar>
					<v-avatar color="orange" size="33" v-else>
						<span class="white--text">No</span>
					</v-avatar>
				</template>
			</v-data-table>
		</v-card>
	</div>
</template>
<script>
import customerSvc from "../services/customer.service";

export default {
	data () {
		return {
			headers: [
				{ text: "Name", value: "firstName", width: '200px' },
        { text: "Email", value: "email" },
        { text: "Phone", value: "phoneNumber" },
        { text: "Address", value: "address" },
				{ text: "Date created", value: "createdAt", width: '150px' },
				{ text: "Marketing preferences", value: "isMarketing" },
        { text: "", value: "actions"}
			],
			items: []
		}
	},
	created () {
		this.loadData();	
	},
	methods: {
		async loadData () {
			try {
				const output = await customerSvc.getCustomers();
				this.items = output.data;
			} catch (err) {
				console.log('Error', err)
			}
		}
	},
	filters: {
    formatDate: function (value, isDate) {
      if (!value) return
			if(isDate) {
				return new Date(value).toLocaleString("default", {year: 'numeric', month: 'short', day: 'numeric'})
			} else {
				return new Date(value).toLocaleString("default", {hour: '2-digit', minute: '2-digit'})
			}			
    }
  }
}
</script>
<style scoped>
.card-border {
	border-width: 0 0 1px 0;
	border-style: solid;	
}
</style>
