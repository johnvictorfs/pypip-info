<template>
  <v-toolbar color="primary" class="white--text">
    <v-btn text class="white--text" to="/">
      <v-icon left>fas fa-arrow-alt-circle-left</v-icon>
      Go Back
    </v-btn>
    <v-spacer />
    <v-icon left color="white">
      {{ icon }}
    </v-icon>
    {{ title }}
  </v-toolbar>
</template>

<script>
export default {
  name: "GoBackToolbar",
  props: {
    title: String,
    icon: String,
  },
};
</script>
