<template>
  <v-app>
    <NavBar />

    <v-content></v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {
    NavBar: () => import("@/components/NavBar")
  }
};
</script>
