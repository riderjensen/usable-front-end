<template>
  <v-layout align-center class="navbar">
    <v-flex xs8>
      <router-link to="/">
        <img class="logo" src="../assets/usable_logo.svg" alt="Usable Logo">
      </router-link>
    </v-flex>

    <v-flex xs4 class="text-xs-right">
      <router-link to="/related">
        <span class="font-weight-bold title contact">RELATED</span>
      </router-link>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      checkbox: false,
      email: "",
      password: ""
    };
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: #fff;
}

.navbar {
  padding: 24px;
}

.logo {
  cursor: pointer;
}

.login,
.contact {
  cursor: pointer;
}

.login:hover,
.contact:hover,
.forgot:hover {
  color: #00bcd4;
  cursor: pointer;
}
::placeholder {
  color: #fff;
}

.or {
  text-align: center;
  color: #fff;
  position: relative;
  margin: 15px 0;
}
.navbar{
  background-color: #000;
  background-size: cover;
}
</style>

