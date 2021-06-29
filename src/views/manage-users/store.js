import constants from "../../api/index";

const initialState = () => ({});
export default {
  namespaced: true,
  state: initialState(),
  mutations: {
    failure: (s, msg) => {
      console.log("[failure] ", msg);
    },
    resetState(state) {
      const initial = initialState();
      Object.keys(initial).forEach((key) => {
        state[key] = initial[key];
      });
    },
  },
  actions: {
    getUserList: ({ commit, dispatch }, payload) => {
      let fail = (msg) => commit("failure", msg);
      return dispatch(
        "apiCall",
        {
          method: "get",
          params: payload,
          url: constants.MANAGE_USERS,
        },
        { root: true }
      )
        .then((data) => {
          if (data.ok) {
            return {
              ok: true,
              totalCount: data.totalCount,
              fetchCount: data.fetchCount,
              list: data.data,
            };
          } else {
            fail(data.message || "Failed to load User List");
            return {
              ok: false,
              totalCount: data.totalCount,
              fetchCount: 0,
              list: [],
            };
          }
        })
        .catch((err) => {
          console.log("Yo ", err);
          fail(err.toString() || "Failed to load User List");
          return { ok: false, totalCount: 0, fetchCount: 0, list: [] };
        });
    },
  },
  addUser({ commit, dispatch }, payload) {
    let fail = (msg) => commit("failure", msg);
    return dispatch(
      "apiCall",
      {
        method: "post",
        params: payload,
        url: constants.MANAGE_USERS,
      },
      { root: true }
    )
      .then((data) => {
        if (data.ok) {
          return {
            ok: true,
            totalCount: data.totalCount,
            fetchCount: data.fetchCount,
            list: data.data,
          };
        } else {
          fail(
            data.message ||
              "This is the message which you are getting because of warn"
          );
          return {
            ok: false,
            totalCount: data.totalCount,
            fetchCount: 0,
            list: [],
          };
        }
      })
      .catch((err) => {
        console.log("Yo ", err);
        fail(err.toString() || "Failed to load User List");
        return { ok: false, totalCount: 0, fetchCount: 0, list: [] };
      });
  },
};
