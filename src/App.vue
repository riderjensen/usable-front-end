<template>
  <v-app id="usable-home" dark>
    <v-container fluid>
      <!-- Navbar -->
      <usable-navbar />
      <!-- Main Section  -->
      <transition name="component-fade" mode="out-in">
      <router-view></router-view>
      </transition>
      <!-- Footer -->
      <!-- <usable-footer /> -->
     
    </v-container>
  </v-app>
    

</template>

<script>
import UsableNavbar from "./components/UsableNavbar";


export default {
  name: "App",
  components: {
    UsableNavbar
  }
};
</script>

<style scoped>
#usable-home {
    background-image: none;
  background-color: #fff;
}

.container {
  padding: 0;
}

.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>
