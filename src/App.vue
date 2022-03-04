<template>
  <v-app>
    <the-header></the-header>
    <the-sidebar></the-sidebar>
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>  
    </v-main>
    <v-snackbar v-model="alert.show" :color="alert.color"> {{alert.message}} </v-snackbar>
  </v-app>
</template>
<script>
import TheHeader from "./components/core/TheHeader"
import TheSidebar from "./components/core/TheSidebar"
import identitySvc from "./services/identity.service"
import alertMixin from './mixins/alert.mixin'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'App',
  mixins: [alertMixin],
  components: {
    TheHeader,
    TheSidebar
  },
  created() {
    this.authenticateUser()
  },
  async mounted() {
    if (this.$route.path != '/customers') {
      this.$router.push("customers")
    }    
  },
  methods: {
    ...mapMutations(['setIdentity']),

   async authenticateUser() {
     try {
       // This should come from login form
      const params = {isNew:true, email: 'admin@buckhill.co.uk', password: 'admin'}
      const { data } = await identitySvc.logIn(params)
      
      localStorage.setItem('accesstoken', data.token)
      this.setIdentity(data.token)

     } catch(err) {
       localStorage.setItem('accesstoken', null);
      this.showAlertError('Error authenticating user', err)
     }  
   }
  },
  computed: {
    ...mapState(['alert', 'accesstoken'])
  }
};
</script>
