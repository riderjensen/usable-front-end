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

/* input {
    border: 1px solid white;
    border-radius: 20px;
    color: white;
    padding: 10px 20px;
    width: 100%;
    background: #455A64;
    margin: 10px 0px;
  } */

::placeholder {
  color: #fff;
}

.or {
  text-align: center;
  color: #fff;
  position: relative;
  margin: 15px 0;
}

/* .or::before, .or::after {
    position: absolute; 
    width: 35%;
    height: 1px;
    top: 60%;
    background-color: #fff;
    content: '';
  } */
</style>

