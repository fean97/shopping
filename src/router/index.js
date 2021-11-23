import { createRouter, createWebHashHistory } from "vue-router";
import ListProduct from "../views/ListProduct.vue";
import DetailProduct from "../views/DetailProduct.vue";
import CreateProduct from "../views/CreateProduct.vue";
import Login from "../views/Login.vue";
import SignUp from "../views/SignUp.vue";
import ErrorPage from "../views/ErrorPage.vue";
import getUser from "@/composables/getUser";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
    meta: { requiresAuth: false },
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp,
    meta: { requiresAuth: false },
  },
  {
    path: "/listproduct",
    name: "ListProduct",
    component: ListProduct,
    meta: { requiresAuth: true },
  },
  {
    path: "/detail/:id",
    name: "DetailProduct",
    component: DetailProduct,
    meta: { requiresAuth: true },
  },
  {
    path: "/create",
    name: "CreateProduct",
    component: CreateProduct,
    meta: { requiresAuth: true },
  },
  {
    path: "/error",
    name: "ErrorPage",
    component: ErrorPage,
    meta: { requiresAuth: false },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const { user } = getUser();
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!user.value) {
      next({ name: "Login" });
    } else {
      next();
    }
  } else next();
});

export default router;
