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
				<template v-slot:[`item.actions`]="{ item }">
					<div class="action-buttons" v-show="selectedId === item.id">
						<v-btn class="mr-1" fab x-small v-show="isDelete"> 
							<v-icon color="green">mdi-check</v-icon>
						</v-btn>
						<v-btn class="mr-1" fab x-small v-show="isDelete" @click="isDelete=false"> 
							<v-icon color="red">mdi-close</v-icon>
						</v-btn>
						<v-btn class="mr-1" fab x-small v-show="!isDelete" @click="isDelete=true"> 
							<v-icon color="#0000008a">mdi-pencil</v-icon>
						</v-btn>
						<v-btn class="mx-1" fab x-small> 
							<v-icon color="#0000008a">mdi-delete</v-icon>
						</v-btn>
						<v-btn fab x-small dark color="success" @click="selectedId = null"> 
							<v-icon>mdi-dots-vertical</v-icon>
						</v-btn>
					</div>
					<div class="action-buttons">
						<v-icon @click="selectedId = item.id" v-show="selectedId !== item.id">mdi-dots-vertical</v-icon>
					</div>					
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
				{ text: "Name", value: "firstName", width: '18%', sortable: false },
        { text: "Email", value: "email", sortable: false },
        { text: "Phone", value: "phoneNumber", sortable: false },
        { text: "Address", value: "address", sortable: false },
				{ text: "Date created", value: "createdAt", align: 'center', width: '11%', sortable: false },
				{ text: "Marketing preferences", value: "isMarketing", align: 'center', sortable: false },
        { text: "", value: "actions", sortable: false }
			],
			items: [],
			selectedId: null,
			isDelete: false
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
<style>
.card-border {
	border-width: 0 0 1px 0;
	border-style: solid;	
}
.action-buttons {
	display: flex;
	justify-content: flex-end;
	align-items: center;
}
.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
	background: rgb(208 232 221 / 30%) !important;
	cursor: pointer;
}
</style>
