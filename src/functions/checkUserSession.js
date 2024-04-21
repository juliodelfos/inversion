// import { supabase } from "../supabase";
// import router from "../router/index";

// const checkUserSession = async () => {
//   try {
//     const {
//       data: { session },
//       error,
//     } = await supabase.auth.getSession();
//     session == null ? `Usuario debe iniciar sesión` : router.push("/buscador");
//     error ? console.log(error) : null;
//   } catch (error) {
//     conhsole.log(error);
//   }
// };

// export { checkUserSession };

import router from "../router/index";
import { userSessionStore } from "@/stores/userSession";
const userSession = userSessionStore();

const checkUserSession = () => {
  if (!userSession) {
    console.log("Usuario debe iniciar sesión");
  } else {
    router.push("/");
  }
};

export { checkUserSession };
