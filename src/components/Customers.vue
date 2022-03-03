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
				<template v-slot:top>
					<v-toolbar flat>
						<v-toolbar-title>All Customers</v-toolbar-title>
						<v-spacer></v-spacer>
						<v-btn color="base" dark class="mb-2" @click="openDialog">
							<v-icon>mdi-plus</v-icon> ADD NEW CUSTOMER
						</v-btn>
						<customer-dialog :title="editedItem.id ? 'Edit customer' : 'Add new customer'" v-model="isDialogOpen">
							<customer-edit :data-model="editedItem" v-if="editedItem"></customer-edit>
							<v-card-actions slot="footer">
								<v-btn color="base" dark block @click="save">
									Save
								</v-btn>
							</v-card-actions>
						</customer-dialog>
						
						<v-divider class="mx-4" vertical></v-divider>
						<v-btn text @click="overlay = !overlay">
							FILTER
							<v-icon>mdi-chevron-down</v-icon>
						</v-btn>	
					</v-toolbar>
					<customer-filter-bar v-if="overlay" @change="updateFilter"></customer-filter-bar>
					<v-divider></v-divider>
				</template>
				<template v-slot:[`item.first_name`]="{ item }">
					<v-avatar size="44" class="mr-1">
						<img src="@/assets/bg.png" alt="" />
					</v-avatar>
					<span>{{ item.first_name + ' ' + item.last_name }}</span>
				</template>
				<template v-slot:[`item.createdAt`]="{ item }">
					<div>
						<span>{{ item.createdAt | formatDate(true)  }}</span>
					</div>
					<span class="grey--text">{{ item.createdAt | formatDate  }}</span>
				</template>
				<template v-slot:[`item.is_marketing`]="{ item }">
					<v-avatar v-if="item.is_marketing" color="green" size="33">
						<span class="white--text">Yes</span>
					</v-avatar>
					<v-avatar v-else color="orange" size="33">
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
						<v-btn class="mr-1" fab x-small v-show="!isDelete" @click="editCustomer(item)"> 
							<v-icon color="#0000008a">mdi-pencil</v-icon>
						</v-btn>
						<v-btn class="mx-1" fab x-small @click="isDelete=true"> 
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
import { CustomerModel } from '../models/customer.model';
import customerSvc from '../services/customer.service';

export default {
  components: {
    'customer-edit': () => import('../components/CustomerEdit.vue'),
		'customer-dialog': () => import('../components/Dialog.vue'),
		'customer-filter-bar': () => import('../components/FilterBar.vue')
  },
	data () {
		return {
			headers: [
				{ text: "Name", value: "first_name", width: '18%', sortable: false },
        { text: "Email", value: "email", sortable: false },
        { text: "Phone", value: "phone_number", sortable: false },
        { text: "Address", value: "address", sortable: false },
				{ text: "Date created", value: "createdAt", align: 'center', width: '11%', sortable: false },
				{ text: "Marketing preferences", value: "is_marketing", align: 'center', sortable: false },
        { text: "", value: "actions", sortable: false }
			],
			items: [],
			selectedId: null,
			isDelete: false,
			editedItem: new CustomerModel(),
			isDialogOpen: false,
			filter: {},
			overlay: false
		}
	},
	created () {
		this.loadData();	
	},
	methods: {
		async loadData () {
			try {
				const output = await customerSvc.getCustomers(this.filter);
				this.items = output.data;
			} catch (err) {
				console.log('Error', err)
			}
		},
		openDialog() {
      this.editedItem = new CustomerModel();
      this.isDialogOpen = true;
    },
		close () {
			this.isDialogOpen = false
			this.$nextTick(() => {
				this.editedItem = Object.assign({}, new CustomerModel())
			})
		},
		async save () {
			try {
				await customerSvc.saveCustomer(this.editedItem);
				this.close()
				this.loadData()
			} catch (err) {
				console.log('Error', err)
			}			
		},
		editCustomer (item) {
			this.editedItem = Object.assign({}, item)
			this.isDialogOpen = true
		},
		async updateFilter (filter) {
			this.filter = filter
			await this.loadData()
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
