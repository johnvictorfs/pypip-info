import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    packageList: JSON.parse(localStorage.getItem("packageList")) || [],
  },
  mutations: {
    SET_PACKAGES(state, payload) {
      localStorage.setItem("packageList", JSON.stringify(payload));
      state.packageList = payload;
    },
  },
  actions: {
    updatePackages({ commit }, payload) {
      commit("SET_PACKAGES", payload);
    },
  },
  modules: {},
});
