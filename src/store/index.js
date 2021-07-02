import Vue from "vue";
import Vuex from "vuex";

import axios from "axios";
import constants from "../api/index";
import ManageUser from "../views/manage-users/store";

Vue.use(Vuex);

let apiErrorFunction = ({ err, commit, reject }) => {
  // console.log("[HTTP API Request Error]", err);
  if (err.message == "Network Error") {
    commit("openSnackbar", { text: "Network Error" });
    console.error("Network Error");
    commit("closeLoaderDialog");
  } else if (err.response.status == 401) {
    localStorage.clear();
    commit("resetState");
  } else if (err.response.status == 400) {
    commit("openSnackbar", {
      text: err.response.data.message || "Request Failed, please try again",
    });
  } else if (err.response.status == 500) {
    console.error("Internal SERVER ERROR");
  } else {
    commit("openSnackbar", {
      text: "Request Failed, please try again",
    });
  }
  let errMsg = "";
  try {
    errMsg = err.response.data.message;
    if (typeof errMsg == "object") {
      errMsg = errMsg[Object.keys(errMsg)[0]];
    }
  } catch (e) {
    console.log(e);
  }
  reject({
    ok: false,
    err,
    message: errMsg || "Request Failed, please try again",
  });
};

const initialState = () => ({
  loaderDialog: false,
  snackbarState: false,
  snackbarText: "",
  snackbarTime: 2000,
  // userType: false,
  userType: 10,
  authToken: "",
  refreshToken: "",
  currentState: {},
  auth: false,
  userData: {},
  messages: {
    loginFailed: "",
    failure: "",
  },
  uploadPercentage: 0,
  REMOTE_SALES_AGENT: 40,
  SALES_AGENT: 30,
  MANAGEMENT: 20,
  ADMIN: 10,
  countries: [],
  partners: [],
  zone: [],
  businessType: [],
  allCurrencies: [],
});

export default new Vuex.Store({
  modules: {
    ManageUser,
  },

  state: initialState(),

  mutations: {
    openLoaderDialog(s) {
      s.loaderDialog = true;
    },
    closeLoaderDialog(s) {
      s.loaderDialog = false;
    },
    openSnackbar(s, { text = "", time = 5000 } = {}) {
      s.snackbarTime = time;
      s.snackbarText = text;
      s.snackbarState = true;
    },
    closeSnackbar(s) {
      s.snackbarState = false;
    },
    clearUploadPercentage(s) {
      s.uploadPercentage = 0;
    },
    setUploadPercentage(s, { uploadStatus }) {
      s.uploadPercentage = uploadStatus;
    },
    failure: (s, p) => {
      s.messages.failure = p;
    },
    // Super Admin
    typeTenLogin: (state, data) => {
      state.authToken = data.token ? data.token : true;
      state.refreshToken = data.dataObj.refreshToken;
      state.auth = !!data.token;
      state.userType = state.ADMIN;
      state.userData = data.userData;
      state.currentState = data.dataObj;
      localStorage.setItem("userType", state.ADMIN);
      localStorage.setItem("auth", data.token);
      localStorage.setItem("userState", JSON.stringify(data.dataObj));
    },
    // MANAGEMENT
    typeTwentyLogin: (state, data) => {
      state.authToken = data.token ? data.token : true;
      state.refreshToken = data.dataObj.refreshToken;
      state.auth = !!data.token;
      state.userType = state.MANAGEMENT;
      state.userData = data.userData;
      state.currentState = data.dataObj;
      localStorage.setItem("userType", state.MANAGEMENT);
      localStorage.setItem("auth", data.token);
      localStorage.setItem("userState", JSON.stringify(data.dataObj));
    },
    // SALES_AGENT
    typeThirtyLogin: (state, data) => {
      state.authToken = data.token ? data.token : true;
      state.refreshToken = data.dataObj.refreshToken;
      state.auth = !!data.token;
      state.userType = state.SALES_AGENT;
      state.userData = data.userData;
      state.currentState = data.dataObj;
      localStorage.setItem("userType", state.SALES_AGENT);
      localStorage.setItem("auth", data.token);
      localStorage.setItem("userState", JSON.stringify(data.dataObj));
    },
    // REMOTE_SALES_AGENT
    typeFourtyLogin: (state, data) => {
      state.authToken = data.token ? data.token : true;
      state.refreshToken = data.dataObj.refreshToken;
      state.auth = !!data.token;
      state.userType = state.REMOTE_SALES_AGENT;
      state.userData = data.userData;
      state.currentState = data.dataObj;
      localStorage.setItem("userType", state.REMOTE_SALES_AGENT);
      localStorage.setItem("auth", data.token);
      localStorage.setItem("userState", JSON.stringify(data.dataObj));
    },
    setCountries(state, data) {
      state.countries = data;
    },
    setPartners(state, data) {
      state.partners = data;
    },
    setZones(state, data) {
      state.zone = data;
    },
    setBusinessTypes(state, data) {
      state.businessType = data;
    },
    setAllCurrencies(state, data) {
      state.allCurrencies = data;
    },
    loginFail: (s, p) => {
      s.messages.loginFailed = p;
    },
    logoutFail: () => {
      console.log("logged out");
    },
    resetState(state) {
      const initial = initialState();
      Object.keys(initial).forEach((key) => {
        state[key] = initial[key];
      });
    },
  },

  actions: {
    apiCallWithHeaderConfig({ commit, state }, { partConfig, headerConfig }) {
      return new Promise((resolve, reject) => {
        if (!state.auth) {
          throw "no auth token found";
        }
        axios({
          ...partConfig,
          headers: {
            ...headerConfig,
            Authorization: state.authToken,
          },
          onUploadProgress: function(progressEvent) {
            commit("setUploadPercentage", {
              uploadStatus: parseInt(
                Math.round((progressEvent.loaded / progressEvent.total) * 100)
              ),
            });
          },
        })
          .then((response) => {
            let data = response.data;
            resolve(data);
            commit("clearUploadPercentage");
          })
          .catch((err) => {
            commit("clearUploadPercentage");
            apiErrorFunction({ err, commit, reject });
          });
      });
    },
    apiCall({ commit, state }, partConfig) {
      return new Promise((resolve, reject) => {
        if (!state.auth) {
          throw "no auth token found";
        }
        axios({
          ...partConfig,
          headers: {
            Authorization: state.authToken,
          },
        })
          .then(response => {
            // console.log(response)
            let data = response.data;
            resolve(data);
          })
          .catch(err => apiErrorFunction({ err, commit, reject }));
      });
    },
    fileDownload_API_Call({ state, commit }, partConfig) {
      return new Promise((resolve, reject) => {
        if (!state.auth) {
          throw "no auth token found";
        }
        axios({
          ...partConfig,
          headers: {
            Authorization: state.authToken,
          },
        })
          .then((response) => {
            let data = response.data;
            resolve({ data, response });
          })
          .catch((err) => apiErrorFunction({ err, commit, reject }));
      });
    },

    //InExtended User session the api get fetch and checkout which type of API you fetch
    //The API may be of typeTenLogin or typeThirtyLogin
    extendUserSession: ({ commit, state }, { refreshToken, currentState }) => {
      let fail = (msg) => commit("loginFail", msg);
      return axios
        .get(constants.EXTEND_USER_SESSION, {
          headers: { refresh_token: refreshToken },
        })
        .then((response) => {
          let data = response.data;
          if (data.ok) {
            if (data.mortal.type === state.ADMIN) {
              commit("typeTenLogin", {
                token: data.token,
                userData: data.mortal,
                dataObj: currentState,
              });
            } else if (data.mortal.type === state.MANAGEMENT) {
              commit("typeTwentyLogin", {
                token: data.token,
                userData: data.mortal,
                dataObj: currentState,
              });
            } else if (data.mortal.type === state.SALES_AGENT) {
              commit("typeThirtyLogin", {
                token: data.token,
                userData: data.mortal,
                dataObj: currentState,
              });
            } else if (data.mortal.type === state.REMOTE_SALES_AGENT) {
              commit("typeFourtyLogin", {
                token: data.token,
                userData: data.mortal,
                dataObj: currentState,
              });
            }
            return { ok: true };
          } else {
            return { ok: false };
          }
        })
        .catch((err) => {
          console.log("Yo ", err);
          fail(err.toString() || "Failed to auto extend user session");
          return { ok: false };
        });
    },

    //This is the Important Function which is used for login Authentication or passing the data
    login: ({ commit, state }, payload) => {
      let fail = (msg) => commit("loginFail", msg);
      if (!payload.username || !payload.password) {
        fail("No username/pw provided");
        return;
      }
      let { username, password } = payload;
      return axios
        .post(constants.LOGIN, { username, password })
        .then((response) => {
          let data = response.data;
          if (!data.ok) {
            fail(data.message || "Login Failed");
            return { ok: false };
          } else if (data.mortal.type === state.ADMIN) {
            commit("typeTenLogin", {
              token: data.token,
              userData: data.mortal,
              dataObj: data,
            });
          } else if (data.mortal.type === state.MANAGEMENT) {
            commit("typeTwentyLogin", {
              token: data.token,
              userData: data.mortal,
              dataObj: data,
            });
          } else if (data.mortal.type === state.SALES_AGENT) {
            commit("typeThirtyLogin", {
              token: data.token,
              userData: data.mortal,
              dataObj: data,
            });
          } else if (data.mortal.type === state.REMOTE_SALES_AGENT) {
            commit("typeFourtyLogin", {
              token: data.token,
              userData: data.mortal,
              dataObj: data,
            });
          } else {
            /* logical error */
            fail("Not valid usertype");
            return { ok: false };
          }
          return { ok: true };
        })
        .catch((err) => {
          console.log("[Error] login", err);
          if (err.message == "Network Error") {
            fail("Network Error");
          } else {
            fail("Login Failed");
          }
          return { ok: false };
        });
    },

    //logout is used when we want to getout from the login page
    logout: ({ commit, state }) => {
      let fail = (msg) => commit("logoutFail", msg);
      return axios
        .post(
          constants.LOGOUT,
          {},
          {
            headers: {
              Authorization: state.authToken,
            },
          }
        )
        .then((response) => {
          let data = response.data;
          if (!data.ok) {
            fail(data.message || "Logout Failed");
            return { ok: false };
          } else {
            /* logical error */
            fail("Not valid usertype");
            return { ok: false };
          }
        })
        .catch((err) => {
          console.log("[Error] login", err);
          if (err.message == "Network Error") {
            fail("Network Error");
          } else {
            fail("Login Failed");
          }
          return { ok: false };
        });
    },
    getCountries: ({ commit, dispatch }, payload) => {
      let fail = (msg) => commit("failure", msg);
      return dispatch("apiCall", {
        method: "get",
        params: payload,
        url: constants.ALL_COUNTRIES,
      })
        .then((data) => {
          if (data.ok) {
            commit("setCountries", data.data);
          } else {
            fail("Failed to fetch Countries List");
          }
        })
        .catch((err) => {
          console.log("Yo ", err);
          fail(err.toString() || "Failed to fetch Countries List");
          return { ok: false, totalCount: 0, fetchCount: 0, list: [] };
        });
    },
    getActiveCountries: ({ commit, dispatch }, payload) => {
      let fail = (msg) => commit("failure", msg);
      return dispatch(
        "apiCall",
        {
          method: "get",
          params: payload,
          url: constants.ACTIVE_COUNTRIES,
        },
        { root: true }
      )
        .then((data) => {
          if (data.ok) {
            return {
              ok: true,
              list: data.countries,
            };
          } else {
            fail(data.message || "Failed to fetch Product List");
            return {
              ok: false,
              list: [],
            };
          }
        })
        .catch((err) => {
          console.log("Yo ", err);
          fail(err.toString() || "Failed to fetch Product List");
          return {
            ok: false,
            list: [],
          };
        });
    },
    getPartnerList: ({ commit, dispatch }, payload) => {
      let fail = (msg) => commit("failure", msg);
      return dispatch("apiCall", {
        method: "get",
        params: payload,
        url: constants.ALL_PARTNERS,
      })
        .then((data) => {
          if (data.ok) {
            commit("setPartners", data.data);
          } else {
            fail("Failed to fetch Partner List");
          }
        })
        .catch((err) => {
          console.log("Yo ", err);
          fail(err.toString() || "Failed to fetch Partner List");
          return { ok: false, totalCount: 0, fetchCount: 0, list: [] };
        });
    },
    getZones: ({ commit, dispatch }, payload) => {
      let fail = (msg) => commit("failure", msg);
      return dispatch("apiCall", {
        method: "get",
        params: payload,
        url: constants.ALL_ZONE,
      })
        .then((data) => {
          if (data.ok) {
            commit("setZones", data.data);
          } else {
            fail("Failed to fetch Zone List");
          }
        })
        .catch((err) => {
          console.log("Yo ", err);
          fail(err.toString() || "Failed to fetch Zone List");
          return { ok: false, totalCount: 0, fetchCount: 0, list: [] };
        });
    },
    getBusinessTypes: ({ commit, dispatch }, payload) => {
      let fail = (msg) => commit("failure", msg);
      return dispatch("apiCall", {
        method: "get",
        params: payload,
        url: constants.ALL_BUSINESS_TYPE,
      })
        .then((data) => {
          if (data.ok) {
            commit("setBusinessTypes", data.data);
          } else {
            fail("Failed to fetch Business Type List");
          }
        })
        .catch((err) => {
          console.log("Yo ", err);
          fail(err.toString() || "Failed to fetch Business Type List");
          return { ok: false, totalCount: 0, fetchCount: 0, list: [] };
        });
    },
    getAllCurrencies: ({ commit, dispatch }, payload) => {
      let fail = (msg) => commit("failure", msg);
      return dispatch("apiCall", {
        method: "get",
        params: payload,
        url: constants.ALL_CURRENCIES,
      })
        .then((data) => {
          if (data.ok) {
            commit("setAllCurrencies", data.data);
          } else {
            fail("Failed to fetch Business Type List");
          }
        })
        .catch((err) => {
          console.log("Yo ", err);
          fail(err.toString() || "Failed to fetch Business Type List");
          return { ok: false, totalCount: 0, fetchCount: 0, list: [] };
        });
    },
  },

  getters: {
    loaderDialog: (state) => state.loaderDialog,
    snackbarState: (state) => state.snackbarState,
    snackbarText: (state) => state.snackbarText,
    snackbarTime: (state) => state.snackbarTime,
    userType: (state) => state.userType,
    auth: (state) => state.auth,
    authToken: (state) => state.authToken,
    refreshToken: (state) => state.refreshToken,
    userData: (state) => state.userData,
    uploadPercentage: (state) => state.uploadPercentage,
    currentState: (state) => state.currentState,
    ADMIN: (state) => state.ADMIN,
    MANAGEMENT: (state) => state.MANAGEMENT,
    SALES_AGENT: (state) => state.SALES_AGENT,
    REMOTE_SALES_AGENT: (state) => state.REMOTE_SALES_AGENT,
    countries: (state) => state.countries,
    partners: (state) => state.partners,
    zone: (state) => state.zone,
    businessType: (state) => state.businessType,
    allCurrencies: (state) => state.allCurrencies,
  },
});
