<template>
	<v-navigation-drawer app clipped permanent width="220" color="lighten1">
		<v-list-item-group
        v-model="selectedItem"
				active-class="bg-active"
      >
			<v-list-item v-for="item in navItems" :key="item.title" :href="item.link">
				<v-list-item-icon>
					<v-icon>{{item.icon}}</v-icon>
				</v-list-item-icon>
				<v-list-item-content>
					<v-list-item-title class="lighten2--text" v-text="item.title"></v-list-item-title>
				</v-list-item-content>
			</v-list-item> 
		</v-list-item-group>
	</v-navigation-drawer>
</template>
<script>
export default {
	data() {
		return {
			navItems:[
				{title: 'Dashboard', icon: 'mdi-tune', link: '#/'},
				{title: 'All tickets', icon: 'mdi-subtitles', link: '#/tickets'},
				{title: 'Shipment Locator', icon: 'mdi-map-marker', link: '#/locator'},
				{title: 'Customers', icon: 'mdi-account-multiple', link: '#/customers'},
				{title: 'Products', icon: 'mdi-folder-outline', link: '#/products'},
			],
			selectedItem: 0
		}
	}
}
</script>
<style scoped>
.bg-active, .bg-active i, .bg-active .v-list-item__title {
	color: white!important;
	background: var(--v-dark-base);
}
</style>
