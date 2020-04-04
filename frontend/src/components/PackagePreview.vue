<template>
  <v-card class="ma-1" elevation="2">
    <v-toolbar color="indigo" dark>
      <v-toolbar-title>{{ pack.name }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-information</v-icon>
      </v-btn>
    </v-toolbar>

    <v-card-text>
      <v-row>
        <v-col cols="6">
          <v-card>
            <v-toolbar color="grey darken-1" class="white--text">
              <v-toolbar-title>
                <v-icon left color="white">fab fa-github</v-icon>
                GitHub
              </v-toolbar-title>
            </v-toolbar>

            <v-card-text>
              <v-list flat v-if="mockPackage.stars || mockPackage.forks">
                <v-subheader>Repository Information</v-subheader>

                <v-list-item-group color="primary">
                  <v-list-item v-if="mockPackage.stars">
                    <v-list-item-icon>
                      <v-icon>mdi-star</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>
                        GitHub Stars: {{ mockPackage.stars }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item v-if="mockPackage.forks">
                    <v-list-item-icon>
                      <v-icon>fas fa-code-branch</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>
                        GitHub Forks: {{ mockPackage.forks }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-card-text>

            <v-divider />

            <v-card-actions>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    <v-icon left>fab fa-github</v-icon>
                    Last Commit
                  </v-list-item-title>
                  <v-list-item-subtitle class="ml-9">
                    {{ mockPackage.last_commit }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col cols="6">
          <v-card>
            <v-toolbar color="#0073B7" class="white--text">
              <v-toolbar-title>
                <v-icon left color="white">fab fa-python</v-icon>
                PyPi
              </v-toolbar-title>
            </v-toolbar>

            <v-card-text>
              <v-list flat v-if="mockPackage.project_urls.length > 0">
                <v-subheader>Project Links</v-subheader>

                <v-list-item-group color="primary">
                  <v-list-item
                    v-for="item in mockPackage.project_urls"
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
            </v-card-text>

            <v-divider />

            <v-card-actions>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    <v-icon left>fab fa-python</v-icon>
                    Last Release
                  </v-list-item-title>
                  <v-list-item-subtitle class="ml-9">
                    {{ mockPackage.last_update }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import mockPackage from "@/data/packageMock.json";

export default {
  name: "PackagePreview",
  props: {
    pack: Object,
  },
  data: () => ({
    mockPackage,
  }),
  methods: {
    getIcon(name_raw, url_raw) {
      const name = name_raw.toLowerCase();
      const url = url_raw.toLowerCase();

      if (name.includes("home")) {
        return "fas fa-home";
      } else if (url.includes("github")) {
        return "fab fa-github";
      } else if (url.includes("gitlab")) {
        return "fab fa-gitlab";
      } else if (url.includes("bitbucket")) {
        return "fab fa-bitbucket";
      }
      return "fas fa-link";
    },
  },
};
</script>
