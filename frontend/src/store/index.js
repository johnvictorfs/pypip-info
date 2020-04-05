import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    packageList: JSON.parse(localStorage.getItem("packageList")) || [],
    packageDetails: JSON.parse(localStorage.getItem("packageDetails")) || {},
    selectedPackage:
      JSON.parse(localStorage.getItem("selectedPackage")) || null,
  },
  mutations: {
    SET_PACKAGES(state, payload) {
      localStorage.setItem("packageList", JSON.stringify(payload));
      state.packageList = payload;
    },
    CLEAR_PACKAGE_LIST(state) {
      state.packageList = [];
      localStorage.setItem("packageList", JSON.stringify([]));
    },
    SET_PACKAGE_DETAILS(state, { key, value }) {
      state.packageDetails[key] = value;

      localStorage.setItem(
        "packageDetails",
        JSON.stringify(state.packageDetails)
      );
    },
    CLEAR_PACKAGE_DETAILS_CACHE(state) {
      state.packageDetails = {};

      localStorage.setItem(
        "packageDetails",
        JSON.stringify(state.packageDetails)
      );
    },
    SET_SELECTED_PACKAGE(state, payload) {
      localStorage.setItem("selectedPackage", JSON.stringify(payload));
      state.selectedPackage = payload;
    },
    CLEAR_SELECTED_PACKAGE(state) {
      localStorage.setItem("selectedPackage", JSON.stringify(null));
      state.selectedPackage = null;
    },
  },
  actions: {
    updatePackages({ commit }, payload) {
      commit("SET_PACKAGES", payload);
    },
    clearPackageList({ commit }) {
      commit("CLEAR_PACKAGE_LIST");
    },
    updatePackageDetails({ commit }, payload) {
      commit("SET_PACKAGE_DETAILS", payload);
    },
    updateSelectedPackage({ commit }, payload) {
      commit("SET_SELECTED_PACKAGE", payload);
    },
    clearPackageDetailsCache({ commit }) {
      commit("CLEAR_PACKAGE_DETAILS_CACHE");
    },
    clearSelectedPackage({ commit }) {
      commit("CLEAR_SELECTED_PACKAGE");
    },
  },
  modules: {},
});
