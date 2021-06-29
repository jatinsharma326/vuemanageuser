<template>
     <div>
    <v-overlay :opacity="1" :value="loaderDialog" :z-index="100">
      <v-progress-circular
        color="primary"
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
    <app @userHasLoggedOut="clearTimeoutAfterLogout" v-if="showApp"></app>
    <auth @startSession="startRefreshCycle" v-else></auth>
  </div>
</template>

<script>
import Auth from "./Auth.vue";
import lt from "long-timeout";
import jwt from "jsonwebtoken";
import { mapActions, mapMutations, mapGetters } from "vuex";
import App from './App.vue';

export default {
  name: "Provider",
  components: {
    Auth,
    App,
  },
  //Find install the jwt token
    created() {
    this.expiryBuffer = 60 * 1000;
    let id = setTimeout(function() {}, 0); // This Clear all references to any previous timeouts
    console.log("In memory timeouts", id);
    while (id--) {
      clearTimeout(id); // Will do nothing if no timeout with id is present
    }
    this.checkUserSession();
  },
//   created() {
//     this.expiryBuffer = 60 * 1000;
//     let id = setTimeout(function() {}, 0); //Where this function comes
//     console.log("In memory Timeouts", id);
//     while (id--) {
//       clearTimeout(id);
//     }
//     this.checkUserSession();
//   },
  data() {
    return {
        expiryBuffer: 60 * 1000,
    refreshTokenTimeoutRef: 0,
    loaderDialog: true,
    };
  },
  methods: {
    ...mapMutations([
          "openLoaderDialog",
      "closeLoaderDialog",
      "typeTenLogin",
      "typeTwentyLogin",
      "typeThirtyLogin",
      "typeFourtyLogin",
    ]),
    ...mapActions([
      "extendUserSession", //also supports payload `this.nameOfAction(amount)`
    ]),
       async checkUserSession() {
      let currentState = JSON.parse(localStorage.getItem("userState"));
      let existingToken = localStorage.getItem("auth");
      if (existingToken) {
        let decodedAuthToken = jwt.decode(existingToken);
        let decodedRefreshToken = jwt.decode(currentState.refreshToken);
        if (this.isTokenExpired(decodedAuthToken.exp)) {
          this.autoLoginUser();
          this.startRefreshCycle();
          console.log("AUTO LOGIN HAPPENED");
          this.loaderDialog = false;
        } else if (this.isTokenExpired(decodedRefreshToken.exp)) {
          this.extendUserSession({
            refreshToken: currentState.refreshToken,
            currentState,
          }).then((data) => {
            this.startRefreshCycle();
            this.loaderDialog = false;
            console.log(data)
          });
        }
      } else {
        this.loaderDialog = false;
      }
    },
//   async checkUserSession() {
//       let currentState = JSON.parse(localStorage.getItem("userState"));
//       let existingToken = localStorage.getItem("auth");
//       if (existingToken) {
//         let decodedAuthToken = jwt.decode(existingToken);
//         let decodedRefreshToken = jwt.decode(currentState.refreshToken);
//         if (this.isTokenExpired(decodedAuthToken.exp)) {
//           this.autoLoginUser();
//           this.startRefreshCycle();
//           console.log("AUTO LOGIN HAPPENED");
//           this.loaderDialog = false;
//         } else if (this.isTokenExpired(decodedRefreshToken.exp)) {
//           this.extendUserSession({
//             refreshToken: currentState.refreshToken,
//             currentState,
//           }).then((data) => {
//             this.startRefreshCycle();
//             this.loaderDialog = false;
//             console.log(data);
//           });
//         }
//       } else {
//         this.loaderDialog = false;
//       }
//     },
    //If the function user token is not expired

      autoLoginUser() {
      let token = localStorage.getItem("auth");
      let userState = JSON.parse(localStorage.getItem("userState"));
      if (localStorage.getItem("userType") == this.ADMIN) {
        this.typeTenLogin({
          token,
          userData: userState.mortal,
          dataObj: userState,
        });
      } else if (localStorage.getItem("userType") == this.MANAGEMENT) {
        this.typeTwentyLogin({
          token,
          userData: userState.mortal,
          dataObj: userState,
        });
      } else if (localStorage.getItem("userType") == this.SALES_AGENT) {
        this.typeThirtyLogin({
          token,
          userData: userState.mortal,
          dataObj: userState,
        });
      } else if (localStorage.getItem("userType") == this.REMOTE_SALES_AGENT) {
        this.typeFourtyLogin({
          token,
          userData: userState.mortal,
          dataObj: userState,
        });
      }
    },
    // autoLoginUser() {
    //   let token = localStorage.getItem("auth");
    //   let userState = JSON.parse(localStorage.getItem("userState"));
    //   if (localStorage.getItem("userType") == this.ADMIN) {
    //     this.typeTenLogin({
    //       token,
    //       userData: userState.mortal,
    //       dataObj: userState,
    //     });
    //   } else if (localStorage.getItem("userType") == this.MANAGEMENT) {
    //     this.typeTwentyLogin({
    //       token,
    //       userData: userState.mortal,
    //       dataObj: userState,
    //     });
    //   } else if (localStorage.getItem("userType") == this.SALES_AGENT) {
    //     this.typeThirtyLogin({
    //       token,
    //       userData: userState.mortal,
    //       dataObj: userState,
    //     });
    //   } else if (localStorage.getItem("userType") == this.REMOTE_SALES_AGENT) {
    //     this.typeFourtyLogin({
    //       token,
    //       userData: userState.mortal,
    //       dataObj: userState,
    //     });
    //   }
    // },

     isTokenExpired(exp) {
      if (exp * 1000 - this.expiryBuffer > new Date().getTime()) {
        return true;
      }
      return false;
    },
   startRefreshCycle() {
      let decodedAuthToken = jwt.decode(this.authToken);
      lt.clearTimeout(this.refreshTokenTimeoutRef);
      let interval = decodedAuthToken.exp * 1000 - this.expiryBuffer;
      this.refreshTokenTimeoutRef = lt.setTimeout(() => {
        if (this.refreshToken) {
          this.extendUserSession({
            refreshToken: this.refreshToken,
            currentState: this.currentState,
          }).then(() => {
            this.startRefreshCycle();
          });
        }
      }, interval);
    },
    clearTimeoutAfterLogout() {
      lt.clearTimeout(this.refreshTokenTimeoutRef);
    },
  },
  destroyed() {
    lt.clearTimeout(this.refreshTokenTimeoutRef);
  },
//     startRefreshCycle() {
//       let decodedAuthToken = jwt.decode(this.authToken);
//       lt.clearTimeout(this.refreshTokenTimeoutRef);
//       let interval = decodedAuthToken.exp * 1000 - this.expiryBuffer;
//       this.refreshTokenTimeoutRef = lt.setTimeout(() => {
//         if (this.refreshToken) {
//           this.extendUserSession({
//             refreshToken: this.refreshToken,
//             currentState: this.currentState,
//           }).then(() => {
//             this.startRefreshCycle();
//           });
//         }
//       }, interval);
//     },
//     clearTimeoutAfterLogout() {
//       lt.clearTimeout(this.refreshTokenTimeoutRef);
//     },
//   },
//   destroyed() {
//     lt.clearTimeout(this.refreshTokenTimeoutRef);
//   },
  computed: {
    ...mapGetters([
     "auth",
      "authToken",
      "refreshToken",
      "currentState",
      "ADMIN",
      "MANAGEMENT",
      "SALES_AGENT",
      "REMOTE_SALES_AGENT",
    ]),
    showApp: function() {
      return this.auth;
    },
  },
};
</script>

<style lang="scss" scoped></style>
<style>
/* html {
  margin: 0 auto;
}
body {
  background-image: linear-gradient(
    to right,
    rgba(255, 0, 0, 0),
    rgba(255, 0, 0, 1)
  );
} */
</style>
