<template>
  <v-app>
    <NavBar />

    <v-content>
      <v-container fluid>
        <transition name="fade" mode="out-in">
          <router-view />
        </transition>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {
    NavBar: () => import("@/components/NavBar"),
  },
};
</script>

<style>
.rounded-card {
  border-radius: 8px !important;
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
