<template>
  <v-container>
    <v-layout class="text-xs-center">
      <img src="../assets/loading-gif.gif" alt="Loading Icon" class="loading-icon" v-if="iconShow">
      <v-flex xs12>
        <h1 class="grey--text darken-4 display-2 font-weight-light pb-3 pt-5">Create Tasks</h1>
        <p class="grey--text darken-4">
          Add custom tasks to have your Testers accomplish to get more data to help you better your sites navigation and usability. Press the (+) icon to add more than one task.
          <br>
          <strong class="red--text">A MAXIMUM OF 5 TASKS MAY BE USED BUT NONE ARE REQUIRED</strong>
        </p>
        <hr>
        <ul>
          <transition-group name="list" tag="div">
            <li v-for="(task, i) in tasks" :key="i + task" class="list-item">
              <h2 class="cyan--text mt-3">Task {{ i + 1 }}</h2>
              <i class="fas fa-minus-circle" @click="deleteTask(i)"></i>
              <v-textarea
                light
                box
                color="cyan"
                v-model="taskArray[i-1]"
                :name="'task' + i++"
                placeholder="Enter your task here..."
                :value="task.value"
              ></v-textarea>
            </li>
          </transition-group>
        </ul>
        <hr>
        <i
          @click="addTask()"
          class="mt-3 fas fa-plus-circle fa-2x green--text d-block text-xs-center"
        ></i>
        <v-alert
          class="mt-3 black--text"
          :value="alert"
          type="warning"
          color="yellow"
          transition="scale-transition"
        >
          You may only have a maximum of
          <strong>5</strong> tasks.
        </v-alert>
        <p
          class="text-xs-center grey--text darken-4 mt-5"
        >Submit tasks then receive a new link that you will send to your testers.</p>
        <v-btn
          class="d-block mt-3 ma-auto pl-5 pr-5"
          round
          color="cyan"
          type="submit"
          @click="submitForm()"
        >CREATE TEST</v-btn>
      </v-flex>
      <!-- URL Modal -->
      <div class="text-xs-center">
        <v-dialog v-model="dialog" width="500">
          <v-card>
            <v-card-title
              class="headline grey"
              primary-title
              style="display: flex; align-items: center; justify-content: center;"
            >
              Your
              <span>
                <img class="ml-2 mr-2" src="../assets/usable_logo.svg" alt>
              </span>URL
            </v-card-title>

            <v-card-text
              class="text-xs-center"
            >Click the link below to copy it to your clipboard and then send it to your testers!</v-card-text>

            <v-text-field @click="copyURL" :value="returnedURL" class="ma-3" color="cyan"></v-text-field>
            <p v-if="copied" class="text-xs-center title pb-4">COPIED!</p>
            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="cyan" flat @click="dialog = false">Got it!</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
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
        .post("https://intense-plains-47179.herokuapp.com", {questionArray: this.taskArray})
        .then(resp => {
          this.iconShow = false;
          document.querySelector("#usable-home").style.filter =
            "brightness(100%)";
            let string = '<script src="'+resp.data.url+'" id="usable"><\/script>'
          this.dialog = true;
          this.returnedURL = string;
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