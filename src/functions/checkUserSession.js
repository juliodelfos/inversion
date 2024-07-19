import router from "../router/index";
import { userSessionStore } from "@/stores/userSession";

const userSession = userSessionStore();

const checkUserSession = () => {
  if (!userSession) {
    console.error("Usuario debe iniciar sesión");
  } else {
    router.push("/");
  }
};

export { checkUserSession };
