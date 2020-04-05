<template>
  <v-app-bar app color="primary" dark>
    <v-toolbar-title class="title app-title">
      <v-icon left>mdi-information</v-icon>
      PyPip Info
    </v-toolbar-title>
  </v-app-bar>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style scoped>
.app-title {
  font-size: 26px !important;
}
</style>
