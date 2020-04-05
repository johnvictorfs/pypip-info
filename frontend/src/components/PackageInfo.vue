<template>
  <v-row justify="center">
    <v-col cols="11" v-if="selectedPackage">
      <v-card class="rounded-card" elevation="4">
        <ToolBar
          :title="
            selectedPackage.homepage_readme ? 'GitHub Readme' : 'PyPi Readme'
          "
          :icon="
            selectedPackage.homepage_readme ? 'fab fa-github' : 'fab fa-python'
          "
        />

        <v-card-text v-if="selectedPackage.homepage_readme">
          <span v-html="htmlDescriptionHomepage"></span>
        </v-card-text>
        <v-card-text v-else-if="selectedPackage.pypi_readme">
          <span v-html="htmlDescription"></span>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="6" v-else>
      <v-card>
        <v-toolbar color="error" class="white--text">
          <v-icon left color="white">
            fas fa-exclamation-triangle
          </v-icon>
          <strong>You don't have any packages selected.</strong>
        </v-toolbar>

        <v-card-text class="text-center">
          <v-btn color="light-blue" to="/" right class="white--text">
            <v-icon left color="white">
              fa-home
            </v-icon>
            Go Back
          </v-btn>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
const marked = require("marked");
const hljs = require("highlight.js");

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function (code, language) {
    const validLanguage = hljs.getLanguage(language) ? language : "python";
    return hljs.highlight(validLanguage, code).value;
  },
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false,
});

export default {
  name: "PackageInfo",
  components: {
    ToolBar: () => import("@/components/GoBackToolbar"),
  },
  computed: {
    selectedPackage() {
      return this.$store.state.selectedPackage;
    },
    htmlDescription() {
      return marked(this.selectedPackage.pypi_readme);
    },
    htmlDescriptionHomepage() {
      return marked(this.selectedPackage.homepage_readme);
    },
  },
};
</script>
