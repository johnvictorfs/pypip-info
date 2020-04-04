<template>
  <v-row justify="center">
    <v-col cols="11">
      <v-card class="rounded-card" :loading="loading" elevation="4">
        <v-container>
          <v-row justify="center">
            <v-col cols="12" md="6" sm="12" xs="12" offset-md="3" offset-sm="0">
              <v-toolbar dense floating class="ma-4">
                <v-text-field
                  v-model="searchInput"
                  prepend-inner-icon="mdi-text-box-search-outline"
                  single-line
                  hide-details
                  label="Search Packages"
                  persistent-hint
                  @keyup.enter.native="search"
                  :size="30"
                />

                <!-- Desktop Search Button -->
                <v-btn
                  color="success"
                  class="ml-2 white--text hidden-sm-and-down"
                  @click="search"
                  :disabled="!searchInput"
                >
                  <v-icon left>fas fa-search</v-icon>Search
                </v-btn>

                <!-- Mobile Search Button -->
                <v-btn
                  color="success"
                  small
                  fab
                  class="ml-2 white--text hidden-md-and-up"
                  @click="search"
                  :disabled="!searchInput"
                >
                  <v-icon small>fas fa-search</v-icon>
                </v-btn>

                <v-btn icon>
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </v-toolbar>
            </v-col>

            <v-col cols="3">
              <v-alert
                :value="packages.length > 0"
                type="info"
                dense
                transition="scale-transition"
                border="left"
                class="mt-6 hidden-sm-and-down"
              >
                {{ packages.length }} results found
              </v-alert>
            </v-col>
          </v-row>
        </v-container>

        <v-row dense justify="center">
          <v-alert
            :value="noResults"
            type="error"
            transition="scale-transition"
            border="left"
            class="ma-2"
          >
            No packages found for search '{{ noResultsString }}'
          </v-alert>
        </v-row>

        <v-row dense justify="center" class="ma-2">
          <v-col
            :key="pack.name"
            v-for="pack in packages"
            :cols="12"
            :xs="12"
            :md="6"
          >
            <PackagePreview :pack="pack" />
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
  components: {
    PackagePreview: () => import("@/components/PackagePreview"),
  },
  data: () => ({
    searchInput: "",
    loading: false,
    noResults: false,
    noResultsString: "",
  }),
  methods: {
    async search() {
      // Don't search without input
      if (!this.searchInput) return;

      this.loading = true;
      this.noResults = false;
      this.noResultsString = "";

      try {
        const { data } = await api.pypi_search(this.searchInput);
        this.$store.dispatch("updatePackages", data);
        if (data.length === 0) {
          this.noResults = true;
          this.noResultsString = this.searchInput;
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
