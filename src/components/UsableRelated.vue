<template>
  <v-container>
    <v-layout class="text-xs-center">
      <img src="../assets/loading-gif.gif" alt="Loading Icon" class="loading-icon" v-if="iconShow">
      <v-flex xs12>
        <h1 class="grey--text darken-4 display-2 font-weight-light pb-3 pt-5">Find Tests</h1>
        <hr>
        <v-textarea
                light
                box
                color="cyan"
                v-model="testID"
                placeholder="Enter your ID here..."
              ></v-textarea>
                    <v-btn
          class="d-block mt-3 ma-auto pl-5 pr-5"
          round
          color="cyan"
          type="submit"
          @click="submitForm()"
        >SUBMIT TASKS</v-btn>
        <br />
        <v-list light>
          <li v-for="(task, i) in testArray" :key="task">
            <p><router-link :to="testArray[i]">{{testArray[i]}}</router-link></p>
          </li>
        </v-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      testArray: [],
      iconShow: false,
      testID: '',
      codeSnippet: "test",
      userSelectedId: ''

    };
  },
  methods: {
    submitForm() {
      axios
        .get("https://intense-plains-47179.herokuapp.com/replay/" + this.testID, {
          method: "GET",
          mode: "cors",
          cache: "no-cache",
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(resp => {
          this.testArray = resp.data.tests;
        });
    },
    copyCode() {
      document.querySelector("input").select();
      document.execCommand("copy");
      this.copied = true;
      setTimeout(() => {
        this.dialog = false;
      }, 5000);
    }
  }
};
</script>

<style scoped>
.task-name {
  width: 50%;
  display: block;
  margin: 0 auto;
}






.loading-icon {
  width: 100px;
  height: auto;
  position: fixed;
  z-index: 99;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}


textarea {
  color: #333 !important;
}

</style>
