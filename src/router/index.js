import { createRouter, createWebHistory } from "vue-router";
import AllFields from "../views/AllFields.vue";
// import TheField from "../views/TheField.vue";
import UserAuth from "../views/UserAuth.vue";
import ProfilePage from "../views/profile/ProfilePage.vue";
import UserDetails from "../components/users/UserDetails.vue";
import NotFound from "../views/NotFound.vue";
// import store from "../store/index.js";

const routes = [
  {
    path: "/",
    name: "AllFields",
    component: AllFields,
  },
  {
    path: "/auth",
    name: "UserAuth",
    component: UserAuth,
  },
  {
    path: "/profile",
    name: "ProfilePage",
    component: ProfilePage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/users/:id",
    name: "UserDetails",
    component: UserDetails,
    props: true,
  },
  { path: "/:notFound(.*)", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// router.beforeEach(function(to, _, next) {
//   if (to.meta.requiresAuth && !store.getters.isLoggedIn) {
//     next("/auth");
//   }
// });

export default router;
