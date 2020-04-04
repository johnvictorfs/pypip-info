<template>
  <v-app-bar app color="primary" dark>
    <v-text-field v-model="searchInput" label="Search" persistent-hint></v-text-field>

    <v-spacer></v-spacer>

    <v-btn href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank" text>
      <span class="mr-2">Latest Release</span>
      <v-icon>mdi-open-in-new</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "NavBar",
  data: () => ({
    searchInput: ""
  }),
  methods: {
    search() {}
  }
};
</script>