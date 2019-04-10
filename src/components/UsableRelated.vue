<template>
  <v-container>
    <v-layout class="text-xs-center">
      <img src="../assets/loading-gif.gif" alt="Loading Icon" class="loading-icon" v-if="iconShow">
      <v-flex xs12>
        <h1 class="grey--text darken-4 display-2 font-weight-light pb-3 pt-5">Create Tasks</h1>
        <p class="grey--text darken-4">
          Find related tests.
          <br>
        </p>
        <hr>
        <input type="text" name="webURL" value="http://riderjensen.com">
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      tasks: [
        {
          taskNumber: 1
        }
      ],
      taskArray: [],
      returnedURL: "",
      alert: false,
      iconShow: false,
      dialog: false,
      copied: false
    };
  },
  methods: {
    addTask() {
      if (this.tasks.length < 5) {
        this.tasks.push({ taskNumber: this.tasks.length + 1 });
      } else {
        this.alert = true;
        setTimeout(() => {
          this.alert = false;
        }, 3000);
      }
    },
    submitForm() {
      this.iconShow = true;
      this.copied = false;
      document.querySelector("#usable-home").style.filter = "brightness(50%)";

      axios
        .post("http://165.22.130.92", {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            questionArray: this.taskArray
          })
        })
        .then(resp => {
          this.iconShow = false;
          document.querySelector("#usable-home").style.filter =
            "brightness(100%)";
          this.dialog = true;
          this.returnedURL = resp.data.url;
        });
    },
    deleteTask(e) {
      this.tasks.splice(e.target, 1);
    },
    copyURL() {
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

.fas:hover {
  opacity: 0.8;
  cursor: pointer;
  transition: opacity 0.2s;
}

.fa-minus-circle {
  /* color: red; */
  color: #ccc;
  position: relative;
  z-index: 99;
  float: right;
  right: 25px;
  top: 10px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.5s;
}

.fa-copy {
  position: relative;
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

.fa-minus-circle:hover {
  opacity: 0.8;
  color: red;
}

textarea {
  color: #333 !important;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s;
}

.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(-30px);
}
</style>
