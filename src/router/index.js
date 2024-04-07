import { createRouter, createWebHistory } from "vue-router";
// import authGuard from "../utils/authGuard";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Auth and user relation routes
    {
      path: "/",
      name: "login",
      component: () => import("../views/Login.vue"),
    },
    {
      path: "/nueva-contrasena",
      name: "nueva-contrasena",
      component: () => import("../views/ForgotPassword.vue"),
    },
    {
      path: "/crear-usuario",
      name: "crear-usuario",
      component: () => import("../views/CreateUser.vue"),
    },
    // Core routes
    {
      path: "/buscador",
      name: "buscador",
      component: () => import("../views/SearchWorker.vue"),
    },
    {
      path: "/fiscalizacion/:region/:nombres/:paterno/:materno/:ejecutor/:rut",
      name: "fiscalizacion",
      component: () => import("../views/Inspection.vue"),
    },
    {
      path: "/descargar-reporte",
      name: "descargar-reporte",
      component: () => import("../views/DownloadReport.vue"),
    },
    // Survey routes
    {
      path: "/encuesta/:region/:nombres/:paterno/:materno/:ejecutor/:rut",
      name: "encuesta",
      component: () => import("../views/Survey.vue"),
    },
  ],
});

export default router;
