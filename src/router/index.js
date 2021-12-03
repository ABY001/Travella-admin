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
    path: "/frequently-asked-questions",
    name: "FAQs",
    layout: "dashboard",
    component: () => import("../views/FAQs.vue"),
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
  {
    path: "/login",
    name: "Login",
    layout: "default",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/signup",
    name: "Signup",
    layout: "default",
    component: () => import("../views/Signup.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  let auth = localStorage.getItem("token");
  if (to.name !== "Login" && to.name !== "Signup" && !auth)
    next({ name: "Login" });
  else next();
});

export default router;
