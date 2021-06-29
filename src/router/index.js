import Vue from 'vue'
import VueRouter from 'vue-router'
import ManageUser from "../views/manage-users/index.vue"
Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Home",
    component:ManageUser,
    meta: { policy: [10, 20, 30, 40] },
  },
  
  // {
  //   path: "/manage-agents",
  //   name: "Manage Agents",
  //   component: () => import("../views/manage-agents"),
  //   meta: { policy: [10, 20, 30, 40] },
  // },
];

const router = new VueRouter({
  mode:"history",
  base: process.env.BASE_URL,
  routes
})

export default router
