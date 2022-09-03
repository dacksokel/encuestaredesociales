import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Encuesta",
      component: () => import("../components/vistas/encuesta/encuesta.vue"),
    },
    {
      path: "/estadisticas",
      name: "estadisticas",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import("../components/vistas/estadisticas/estadisticas.vue"),
    },
  ],
});

export default router;
