<template>
  <v-container>
    <v-layout class="text-xs-center">
      <img src="../assets/loading-gif.gif" alt="Loading Icon" class="loading-icon" v-if="iconShow">
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="grey--text darken-4 display-2 font-weight-light pb-3 pt-5">{{item._id}}</h1>
        <v-card>
          <v-card-title primary-title>
            <div style="width: 100%;" class="text-xs-center">
              <h3 class="headline mb-0">Initial Information</h3>
              <br>
              <p>User Browser: {{item.initInformation.browserType}}</p>
              <p>User Browser Height: {{item.initInformation.windowHeight}}px</p>
              <p>User Browser Width: {{item.initInformation.windowWidth}}px</p>
              <br />
              <p v-if="item.questionsAnswered">Question presented to the user: {{item.questionsAnswered.question}}</p>
              <p v-if="item.questionsAnswered">User answer: {{item.questionsAnswered.answer}}</p>
            </div>
          </v-card-title>
        </v-card>
        <br />
        <p class="grey--text">User viewed the page at: {{new Date(item.createdAt).toLocaleString()}}</p>
        <v-btn color="cyan" @click="openModal(item._id)">Get the code for a replay</v-btn>
      </v-flex>
    </v-layout>

<!-- copy code modal -->
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
            >Click the code below! Then paste it into the console of the page where you are monitoring users. Also make sure that your test is removed from the page before you go to it or else it will track you.</v-card-text>

            <v-text-field @click="copyCode" v-model="codeSnippet" class="ma-3" color="cyan"></v-text-field>
            <p v-if="copied" class="text-xs-center title pb-4">COPIED!</p>
            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="cyan" flat @click="dialog = false">Got it!</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>

  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      dialog: false,
      copied: false,
      iconShow: false,
      testID: "",
      codeSnippet: "",
      item: {
        initInformation:{
          browserType: 'Unknown',
          windowHeight: 'Uknown',
          windowWidth: 'Uknown'
        },
        createdAt: '0'
      }
    };
  },
  created: function() {
    axios
      .get(
        "https://intense-plains-47179.herokuapp.com/replay/findOne/" +
          this._routerRoot._route.params.id,
        {
          method: "GET",
          mode: "cors",
          cache: "no-cache",
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      .then(resp => {
        this.item = resp.data.item;
      });
  },
  methods: {
        openModal(id) {
      this.userSelectedId = id;
      this.codeSnippet = "const theID='" + this.userSelectedId + "', usableURL='https://intense-plains-47179.herokuapp.com',usableBody=document.getElementsByTagName('body')[0];function createScript(e){let t=document.createElement('script');t.src=e,document.getElementsByTagName('body')[0].appendChild(t)}let svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox','0 0 186.93 295.78'),svg.id='box',svg.setAttribute('style','z-index: 100; position:fixed; top: 0px; left: 0px; width: 20px; height: 20px;');let defs=document.createElement('defs'),ourStyle=document.createElement('style');function createPath(e,t,c){let l=document.createElementNS('http://www.w3.org/2000/svg','path');return l.setAttribute('class',e),l.setAttribute('d',t),l.setAttribute('transform',c),l}ourStyle.id='svgStlyes',ourStyle.innerHTML='.cls-1{fill:#fff;}.cls-2{fill:#000;}',defs.appendChild(ourStyle),svg.appendChild(defs),svg.appendChild(createPath('cls-1','M7.8,0H.25C-.11,57.62.11,115.25,0,172.86c.11,30.56-.22,61.12.2,91.67,10.37,0,20.74.08,31.1,0,.27-4.44.34-8.93.35-13.42v-2h2c4.41,0,8.81,0,13.2-.05a102.42,102.42,0,0,0-.07-13.57L46.53,233l2.53.33c4.54.57,9.13.19,13.67.1.09-4.36.18-8.71.23-13v-2h2c3.43,0,6.87,0,10.33-.2l2.27-.12-.17,2.27c-.72,9.51.89,19,.37,28.55,4.49.15,9,.21,13.48.25h2v2c.09,9.64.07,19.27.23,28.92q6.64.13,13.32.15h2v2q.12,6.75.1,13.48c10.44.14,20.89.11,31.33.05a87.15,87.15,0,0,0,.22-13.42l-.15-2.21,2.2.05c4.43.13,8.87.09,13.25,0,.15-10.39.1-20.78,0-31.18-4.47-.12-8.92-.17-13.38-.22h-1.95v-1.95c-.16-9.65-.08-19.28-.13-28.95-4.47-.16-9-.24-13.47-.12l-2.13,0,.08-2.13c.15-3.72.21-7.43.2-11.12v-2h2c20,0,39.9,0,59.87-.25.13-10.35.17-20.7,0-31q-6.74,0-13.45-.1h-2v-1.95c-.06-4.48-.1-9-.07-13.47-4.47-.11-8.93-.14-13.4-.15h-2v-2c0-4.45-.09-8.89-.18-13.35-4.46-.19-8.94-.31-13.45-.27h-2v-2q0-6.76-.08-13.5c-4.49,0-9,0-13.47-.1h-2v-2c0-4.41,0-8.8-.18-13.2-4.43-.24-8.88-.28-13.35-.3h-2v-2c-.07-4.49-.12-9-.1-13.47-4.5,0-9,0-13.47-.13h-1.9l-.08-1.9c-.16-4.49-.34-9-.35-13.5-4.39-.1-8.77-.12-13.17-.13h-2l0-2c-.11-4.47-.17-9-.13-13.45-4.49,0-9-.08-13.47-.15h-1.9l-.08-1.9c-.18-4.49-.24-9-.25-13.5-4.47-.1-8.92-.13-13.4-.15h-2v-2c0-4.46-.05-8.94-.15-13.4-4.49,0-9,0-13.5-.07h-2v-2c0-4.47-.07-9-.08-13.47-4.49-.13-9-.1-13.55-.08h-2v-2c0-4.51-.11-9-.3-13.5H7.72Z','translate(0.02 -0.01)')),svg.appendChild(createPath('cls-2','M.25,0H15.36q.33,7.73.34,15.45c5.17,0,10.34,0,15.5.11,0,5.14,0,10.28.08,15.41H15.65q0,108.88.09,217.75c5.15.06,10.29.07,15.44,0-.05-5.13,0-10.25,0-15.38,5.15-.09,10.35-.53,15.45.39.84,5.08.36,10.24.24,15.36-5,.06-10.11.11-15.17.05,0,5.14-.08,10.29-.4,15.42-10.36.08-20.73,0-31.1,0C-.22,234.05.12,203.49,0,172.93.11,115.27-.11,57.65.25,0Z','translate(0.02 -0.01)')),svg.appendChild(createPath('cls-2','M31.28,31c5.15,0,10.31.07,15.46.1.11,5.12.15,10.24.18,15.36,5.13,0,10.26,0,15.39.17,0,5.13,0,10.27.27,15.41,5.14.09,10.28.11,15.42.17q-.07,7.68.14,15.37,7.59,0,15.17.16c0,5.13.22,10.26.4,15.39,5.12.1,10.25.12,15.38.14q0,7.7.11,15.4c5.12,0,10.25.07,15.36.35.15,5.06.2,10.12.2,15.19,5.13.13,10.26.16,15.39.13,0,5.15.09,10.3.09,15.45-5.2.26-10.4.22-15.6.08V124.43c-5.22-.07-10.44-.06-15.65,0,.07-5.21.08-10.41,0-15.61H93.53V93.33c-5.22-.12-10.43-.11-15.64,0V77.7H62.43c-.07-5.19,0-10.38-.11-15.57-5.18,0-10.36,0-15.53-.11V46.6c-5.13-.06-10.26-.05-15.39,0-.16-5.19-.14-10.38-.12-15.57Z','translate(0.02 -0.01)')),svg.appendChild(createPath('cls-2','M140.24,139.79c5.16-.14,10.31.09,15.46.32.1,5.1.14,10.2.2,15.3,5.13,0,10.25,0,15.38.17q0,7.71.09,15.43c5.13.09,10.27.12,15.41.12.19,10.35.16,20.69,0,31-20.63.23-41.25.23-61.87.27,0,5.07,0,10.15-.23,15.22-5.2.26-10.41.2-15.61.16q-.22-15.57,0-31.13c20.73-.13,41.47.06,62.2,0q.1-7.78,0-15.58c-5.18,0-10.37,0-15.55-.1V155.52q-7.69-.08-15.4,0c-.19-5.25-.19-10.5-.09-15.75Z','translate(0.02 -0.01)')),svg.appendChild(createPath('cls-2','M62.38,202.11H77.83a92.94,92.94,0,0,1-.3,16c-4.84.38-9.69.33-14.53.28,0,5-.14,10-.24,15-5.15.11-10.37.64-15.47-.33-1.08-5.05-.56-10.25-.47-15.36H62.3c0-5.19,0-10.39.08-15.58Z','translate(0.02 -0.01)')),svg.appendChild(createPath('cls-2','M77.5,218.09a125.65,125.65,0,0,1,16-.31c.11,10.34,0,20.69.07,31,5.19,0,10.37,0,15.56.1,0,10.3-.09,20.6.07,30.91,10.39.16,20.8-.33,31.18.28a78,78,0,0,1-.16,15.58c-10.44.06-20.87.1-31.31,0q0-7.72-.13-15.44-7.65,0-15.31-.16c-.17-10.3-.13-20.6-.24-30.89-5.14,0-10.28-.11-15.42-.28.56-10.27-1.48-20.54-.28-30.78Z','translate(0.02 -0.01)')),svg.appendChild(createPath('cls-2','M124.71,217.66c5.17-.24,10.35-.1,15.53.09,0,10.3-.07,20.6.13,30.91,5.12.05,10.23.11,15.35.25.12,10.39.18,20.78,0,31.17-5.12.13-10.25.26-15.37,0-.58-10.35-.1-20.73-.2-31.09-5.21-.11-10.42-.09-15.62-.13,0-10.4-.12-20.82.15-31.22Z','translate(0.02 -0.01)'));const pointed=document.createElement('div');function getData(e,t){return fetch(`${e}${t}`,{mode:'cors',cache:'no-cache',headers:{'Content-Type':'application/json'}}).then(e=>e.json())}pointed.id='pointer',pointed.setAttribute('style','z-index: 100; position:absolute; height: 30px; width: 30px; background-color: #666; border-radius: 50%; display: inline-block;'),usableBody.insertAdjacentElement('afterbegin',svg),usableBody.insertAdjacentElement('afterbegin',pointed),getData(`${usableURL}/replay/findOne/`,theID).then(e=>{let t=e.item.recMoves;const c=document.getElementById('pointer');let l=[];t.forEach((e,t)=>{'object'==typeof e.ev&&l.push(t)});let n=0,a=-1,s=0,o=setInterval(function(){++a>=t.length-1&&(clearInterval(o),alert('Test is complete'));TweenLite.to('#box',1,{ease:Power2.easeNone,left:t[a].x+'%'}),TweenLite.to('#box',1,{ease:Power2.easeNone,top:t[a].y+'%'}),'clicked'==t[a].ev&&(c.style.left=t[a].x+'%',c.style.top=t[a].y+'%',c.style.transform=`translateY(${n}px)`);if('blur'==t[a].ev){let e=document.createElement('div');e.style.cssText='position: fixed; width: 100vw; height: 100vh; top: 0; left: 0; background-color: rgba(0,0,0,0.8)';let t=document.createElement('h1');t.style.cssText='top: 30vh; position: absolute; width: 100%; text-align: center; color: #fff; z-index: 100;',t.innerText='The user window has lost focus',e.appendChild(t),e.id='ourBlurDiv',usableBody.appendChild(e)}if('focus'==t[a].ev){let e=document.getElementById('ourBlurDiv');e&&e.parentNode.removeChild(e)}if('object'==typeof t[a].ev){let e=t[a].ev;if('start'==e.type){let e=t[l[s+1]].ev;n=e.eScroll,window.scrollTo(0,e.eScroll),s+=2}}},100)});'";
      this.dialog = true;
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
