<template>
  <v-card class="ma-1 rounded-card" elevation="2">
    <v-toolbar color="success" dark>
      <v-toolbar-title>{{ pack.name }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon @click="selectPackage" v-on="on" :disabled="hasNoReadme">
            <v-icon>mdi-information</v-icon>
          </v-btn>
        </template>

        <span>Readme</span>
      </v-tooltip>
    </v-toolbar>

    <v-row dense justify="center" v-if="error">
      <v-alert
        :value="noResults"
        type="error"
        transition="scale-transition"
        border="left"
        class="ma-2"
      >
        Error loading informations for package: {{ pack.name }}
      </v-alert>
    </v-row>

    <v-card-text v-if="loaded">
      <p v-if="packageData.description" class="package-description">
        {{ packageData.description }}
      </p>

      <v-row>
        <v-col cols="6" v-if="packageData.has_repository_data">
          <v-card class="rounded-card">
            <v-toolbar color="grey darken-1" class="white--text">
              <v-toolbar-title>
                <v-icon left color="white">
                  {{ getIcon(packageData.repository_type, "") }}
                </v-icon>
                {{ packageData.repository_type }}
              </v-toolbar-title>
            </v-toolbar>

            <v-card-text>
              <v-alert
                :value="!packageData.has_repository_data"
                type="error"
                transition="scale-transition"
                border="left"
                class="ma-2"
              >
                Couldn't get {{ packageData.repository_type }} Data
              </v-alert>

              <v-list flat>
                <v-list-item-group color="primary">
                  <v-list-item
                    :href="packageData.repository_url"
                    target="_blank"
                    v-if="packageData.repository_url"
                  >
                    <v-list-item-icon>
                      <v-icon>fab fa-github</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                      <v-list-item-title>
                        Repository Page
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item
                    :href="packageData.repository_url + '/stargazers'"
                    target="_blank"
                  >
                    <v-list-item-icon>
                      <v-icon>fas fa-star</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>
                        Stars: {{ commaSeparetedNumber(packageData.stars) }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item
                    :href="packageData.repository_url + '/network/members'"
                    target="_blank"
                  >
                    <v-list-item-icon>
                      <v-icon>fas fa-code-branch</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>
                        Forks: {{ commaSeparetedNumber(packageData.forks) }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item
                    :ref="packageData.repository_url + '/graphs/contributors'"
                    target="_blank"
                  >
                    <v-list-item-icon>
                      <v-icon>fas fa-user-friends</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>
                        Contributors: {{ packageData.contributors }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-card-text>

            <v-divider />

            <v-card-actions v-if="packageData.last_commit">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    <v-icon left>fab fa-github</v-icon>
                    Latest Commit
                  </v-list-item-title>
                  <v-list-item-subtitle class="ml-9">
                    {{ getDate(packageData.last_commit) }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col :cols="packageData.has_repository_data ? 6 : 12">
          <v-card class="rounded-card">
            <v-toolbar color="#0073B7" class="white--text">
              <v-toolbar-title>
                <v-icon left color="white">fab fa-python</v-icon>
                PyPi
              </v-toolbar-title>
            </v-toolbar>

            <v-card-text>
              <v-list v-if="packageData.project_urls.length > 0">
                <v-list-item-group>
                  <v-list-item
                    v-for="item in packageData.project_urls"
                    :key="item.name"
                    :href="item.url"
                    target="_blank"
                  >
                    <v-list-item-icon>
                      <v-icon v-text="getIcon(item.name, item.url)" />
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title v-text="item.name" />
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>

              <v-divider />

              <v-list v-if="packageData.project_urls.length > 0">
                <v-list-item-group>
                  <v-list-item
                    flat
                    v-if="packageData.python_versions.length > 0"
                  >
                    <v-list-item-icon>
                      <v-icon>fab fa-python</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>
                        Python Versions
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        {{ packageData.python_versions.join(", ") }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item flat>
                    <v-list-item-icon>
                      <v-icon>fas fa-upload</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>
                        Releases
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        {{ packageData.number_releases }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-dialog v-model="requirementsDialog" max-width="650">
                    <template v-slot:activator="{ on }">
                      <v-list-item
                        flat
                        v-if="packageData.requirements !== null"
                        v-on="on"
                      >
                        <v-list-item-icon>
                          <v-icon>fas fa-book</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title>
                            Requirements
                          </v-list-item-title>
                          <v-list-item-subtitle>
                            {{ packageData.requirements }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </template>

                    <v-card>
                      <v-toolbar color="primary" class="white--text">
                        <v-toolbar-title>
                          {{ packageData.name }} Requirements
                        </v-toolbar-title>

                        <v-spacer />
                        <v-btn
                          icon
                          color="white"
                          @click="requirementsDialog = false"
                        >
                          <v-icon>
                            fas fa-times
                          </v-icon>
                        </v-btn>
                      </v-toolbar>

                      <v-list>
                        <v-list-item-group>
                          <v-list-item
                            flat
                            v-for="requirement in packageData.requirements_list"
                            :key="requirement"
                          >
                            <v-list-item-ico>
                              <v-list-item-icon>
                                <v-icon>fas fa-book</v-icon>
                              </v-list-item-icon>
                            </v-list-item-ico>
                            <v-list-item-content>
                              {{ requirement }}
                            </v-list-item-content>
                          </v-list-item>
                        </v-list-item-group>
                      </v-list>
                    </v-card>
                  </v-dialog>
                </v-list-item-group>
              </v-list>
            </v-card-text>

            <v-divider v-if="packageData.last_update !== '0.0.0'" />

            <v-card-actions v-if="packageData.last_update !== '0.0.0'">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    <v-icon left>fab fa-python</v-icon>
                    Latest Release
                  </v-list-item-title>
                  <v-list-item-subtitle class="ml-9">
                    {{ packageData.last_update }} ({{
                      getDate(packageData.last_update_date)
                    }})
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>

    <v-fade-transition>
      <v-overlay v-if="loading" absolute color="#036358">
        <v-progress-circular indeterminate size="32"></v-progress-circular>
      </v-overlay>
    </v-fade-transition>
  </v-card>
</template>

<script>
import api from "@/api";

export default {
  name: "PackagePreview",
  props: {
    pack: Object,
  },
  data: () => ({
    requirementsDialog: false,
    loading: false,
    loaded: false,
    packageData: null,
    error: false,
    hasNoReadme: false,
  }),
  mounted() {
    this.loading = true;

    const existing = this.$store.state.packageDetails[this.pack.name];

    if (existing) {
      this.packageData = existing;
      this.loaded = true;
      this.loading = false;
      this.blankReadme();
    } else {
      this.setPackageData();
    }
  },
  computed: {},
  methods: {
    blankReadme() {
      if (!this.packageData) {
        this.hasNoReadme = true;
      }

      if (!this.packageData.pypi_readme && !this.packageData.homepage_readme) {
        this.hasNoReadme = true;
      }

      if (!this.packageData.pypi_readme.match(/^(?!\s*$).+/))
        this.hasNoReadme = true;

      this.hasNoReadme = false;
    },
    selectPackage() {
      this.$store.dispatch("updateSelectedPackage", this.packageData);
      this.$router.push("/details");

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    },
    async setPackageData() {
      try {
        const { data } = await api.get_package(this.pack.name);
        this.packageData = data;
        this.$store.dispatch("updatePackageDetails", {
          key: this.pack.name,
          value: data,
        });
        this.loaded = true;
      } catch (error) {
        this.error = true;
      } finally {
        this.loading = false;
        this.blankReadme();
      }
    },
    commaSeparetedNumber(number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    timeSince(date) {
      const seconds = Math.floor((new Date() - date) / 1000);

      let interval = Math.floor(seconds / 31536000);

      if (interval > 1) {
        return interval + " years";
      }

      interval = Math.floor(seconds / 2592000);
      if (interval > 1) {
        return interval + " months";
      }

      interval = Math.floor(seconds / 86400);
      if (interval > 1) {
        return interval + " days";
      }

      interval = Math.floor(seconds / 3600);
      if (interval > 1) {
        return interval + " hours";
      }

      interval = Math.floor(seconds / 60);
      if (interval > 1) {
        return interval + " minutes";
      }

      return Math.floor(seconds) + " seconds";
    },
    titleCase(text) {
      const sentence = text.toLowerCase().split(" ");

      for (let i = 0; i < sentence.length; i++) {
        sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
      }

      return sentence;
    },
    getDate(datetime) {
      const date = new Date(Date.parse(datetime));

      if (!date) return null;

      return `${date.toLocaleDateString()}, ${this.timeSince(date)} ago`;
    },
    getIcon(name_raw, url_raw) {
      const name = name_raw.toLowerCase();
      const url = url_raw.toLowerCase();

      if (name.includes("home")) {
        return "fas fa-home";
      } else if (
        url.includes("project page") ||
        name.includes("project page")
      ) {
        return "fab fa-python";
      } else if (url.includes("github") || name.includes("github")) {
        return "fab fa-github";
      } else if (url.includes("gitlab") || name.includes("gitlab")) {
        return "fab fa-gitlab";
      } else if (url.includes("bitbucket") || name.includes("bitbucket")) {
        return "fab fa-bitbucket";
      }
      return "fas fa-link";
    },
  },
};
</script>

<style scoped>
.package-description {
  font-size: 18px;
}
</style>
