<template>
	<v-card-text class="pb-0">
		<v-layout class="pb-4">
			<v-flex sm="6"></v-flex>
			<v-flex sm="6">
				<v-avatar size="62">
					<img src="@/assets/bg.png" alt="" />
				</v-avatar>
			</v-flex>
		</v-layout>
		<v-layout>
			<v-flex sm="6" class="pr-4">
				<v-text-field v-model="dataModel.first_name" label="First name" outlined></v-text-field>
			</v-flex>
			<v-flex sm="6">
				<v-text-field v-model="dataModel.last_name" label="Last Name" outlined></v-text-field>
			</v-flex>
		</v-layout>
		<v-layout>	
			<v-flex sm="12">
				<v-text-field v-model="dataModel.email" label="Email Address" outlined></v-text-field>
				<v-text-field v-model="dataModel.phone_number" label="Phone Number" outlined></v-text-field>
				<v-text-field v-model="dataModel.address" label="Location" append-icon="mdi-map-marker" outlined></v-text-field>
				<v-text-field 
					v-model="dataModel.password" outlined
					:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
					:type="showPassword ? 'text' : 'password'"
					label="Password"
					class="input-group--focused"
					@click:append="showPassword = !showPassword"
				></v-text-field>
				<v-text-field 
					v-model="dataModel.password_confirmation" outlined
					:append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
					:type="showConfirmPassword ? 'text' : 'password'"
					label="Confirm Password"
					class="input-group--focused"
					@click:append="showConfirmPassword = !showConfirmPassword"
				></v-text-field>
			</v-flex>
		</v-layout>
	</v-card-text>
</template>
<script>
export default {
	props: {dataModel: Object},
	data () {
		return {
			showPassword: false,
			showConfirmPassword: false
		}
	}
}
</script>