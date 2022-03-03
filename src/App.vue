<template>
  <v-app>
    <the-header></the-header>
    <the-sidebar></the-sidebar>
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>  
    </v-main>
  </v-app>
</template>

<script>
import TheHeader from "./components/core/TheHeader"
import TheSidebar from "./components/core/TheSidebar"
import identitySvc from "./services/identity.service"

export default {
  name: 'App',
  components: {
    TheHeader,
    TheSidebar
  },
  async mounted() {
    try {
      await identitySvc.logIn()
    } catch (err) {
      console.log('Error', err)
    }
  }
};
</script>
