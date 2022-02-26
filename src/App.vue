<template>
  <v-app>
    <the-header>
    </the-header>
    <v-main>
    </v-main>
  </v-app>
</template>

<script>
import TheHeader from "./components/TheHeader.vue"

export default {
  name: 'App',
  components: {
    TheHeader
  },

  data: () => ({
    //
  }),
};
</script>
