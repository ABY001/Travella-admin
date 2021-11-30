import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    // will match everything
    path: "*",
    component: () => import("../views/404.vue"),
  },
  {
    path: "/",
    name: "Home",
    layout: "dashboard",
    redirect: "/dashboard",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    layout: "dashboard",
    component: () => import("../views/Dashboard.vue"),
  },
  {
    path: "/posts",
    name: "Posts",
    layout: "dashboard",
    component: () => import("../views/Post.vue"),
  },
  {
    path: "/registrations",
    name: "Registrations",
    layout: "dashboard",
    component: () => import("../views/Registrations.vue"),
  },
  {
    path: "/support",
    name: "Support",
    layout: "dashboard",
    component: () => import("../views/Support.vue"),
  },
  {
    path: "/hiring",
    name: "Hiring",
    layout: "dashboard",
    component: () => import("../views/Hiring.vue"),
  },
  {
    path: "/setting",
    name: "Setting",
    layout: "dashboard",
    component: () => import("../views/Setting.vue"),
  },
  //   {
  //     path: "/logout",
  //     name: "Logout",
  //     component: () => import("../views/Logout.vue"),
  //   },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
