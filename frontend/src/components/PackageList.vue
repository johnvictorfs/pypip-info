<template>
  <v-row justify="center">
    <v-col cols="11">
      <v-card class="rounded-card" :loading="loading" elevation="4">
        <v-toolbar dense floating class="ma-4">
          <v-text-field
            v-model="searchInput"
            prepend-inner-icon="mdi-text-box-search-outline"
            single-line
            hide-details
            label="Search Packages"
            persistent-hint
            @keyup.enter.native="search"
          />

          <v-btn
            color="green"
            class="ml-2 white--text"
            @click="search"
            :disabled="!searchInput"
          >
            <v-icon left>fas fa-search</v-icon>Search
          </v-btn>

          <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </v-toolbar>

        <v-row dense justify="center" class="ma-2">
          <v-col
            :key="pack.name"
            v-for="pack in packages"
            :cols="12"
            :xs="12"
            :md="6"
          >
            <v-card class="ma-1" elevation="2">
              <v-card-title>
                {{ pack.name }}
              </v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import api from "@/api";

export default {
  name: "PackageList",
  data: () => ({
    searchInput: "",
    loading: false,
    noResults: false,
  }),
  methods: {
    async search() {
      // Don't search without input
      if (!this.searchInput) return;

      this.loading = true;
      this.noResults = false;

      try {
        const { data } = await api.pypi_search(this.searchInput);
        this.$store.dispatch("updatePackages", data);
        if (data.length === 0) {
          this.noResults = true;
        }
      } catch (error) {
        this.$toast.error("There was an error looking for packages");
      } finally {
        this.loading = false;
      }
    },
  },
  computed: {
    packages() {
      return this.$store.state.packageList;
    },
  },
};
</script>
