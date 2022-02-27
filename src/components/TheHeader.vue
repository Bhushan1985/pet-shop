<template>
	<v-app-bar app dark clipped-left color="base">
		<v-spacer></v-spacer>
		<v-app-bar-nav-icon>
			<img src="@/assets/Vector.svg" width="31px" height="29px" alt="" />
		</v-app-bar-nav-icon>
		<span>petson.</span>
		<v-spacer></v-spacer>
		<v-btn text>
			PRODUCTS 
			<v-icon>mdi-chevron-down</v-icon>
		</v-btn>
		<v-btn text>
			PROMOTIONS
		</v-btn>
		<v-btn text>
			BLOG
		</v-btn>
		<v-spacer></v-spacer>
		<v-btn class="ma-2" outlined>
			<v-icon>mdi-cart</v-icon>
			CART (0)
		</v-btn>
		<v-btn class="ma-2" outlined>
			LOGOUT
		</v-btn>
		<v-avatar size="48" class="bg-img">
      <img src="@/assets/bg.png" alt="" />
    </v-avatar>
		
	</v-app-bar>
</template>
<style scoped>
.bg-img {
	border: 1px solid;
}
</style>