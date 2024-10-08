import { createRouter, createWebHistory } from "vue-router";
import { userSessionStore } from "../stores/userSession";

// Configuración de rutas
const routes = [
  // Auth and user relation routes
  {
    path: "/",
    name: "login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/olvide-contrasena",
    name: "olvide-contrasena",
    component: () => import("../views/ForgotPassword.vue"),
  },
  {
    path: "/nueva-contrasena",
    name: "nueva-contrasena",
    component: () => import("../views/ChangePassword.vue"),
  },
  {
    path: "/crear-usuario",
    name: "crear-usuario",
    component: () => import("../views/CreateUser.vue"),
    meta: {
      needsAuth: true,
    },
  },
  // Core routes
  {
    path: "/buscador",
    name: "buscador",
    component: () => import("../views/SearchWorker.vue"),
    meta: {
      needsAuth: true,
    },
  },
  {
    path: "/supervision/:region/:comuna/:nombres/:paterno/:materno/:ejecutor/:rut",
    name: "supervision",
    component: () => import("../views/Inspection.vue"),
    meta: {
      needsAuth: true,
    },
  },
  {
    path: "/descargar-reporte",
    name: "descargar-reporte",
    component: () => import("../views/DownloadReport.vue"),
    meta: {
      needsAuth: true,
    },
  },
  // Survey routes
  {
    path: "/encuesta/:region/:comuna/:nombres/:paterno/:materno/:ejecutor/:rut",
    name: "encuesta",
    component: () => import("../views/Survey.vue"),
    meta: {
      needsAuth: true,
    },
  },
  // Otras
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("../views/NotFound.vue"),
  },
];

// Creación del router
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Middleware de autenticación
router.beforeEach((to, from, next) => {
  const userSession = userSessionStore();

  if (to.meta.needsAuth && !userSession.session) {
    next("/");
  } else {
    next();
  }
});

export default router;
