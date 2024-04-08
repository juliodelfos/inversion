import { supabase } from "../supabase";
import router from "../router/index";

const checkUserSession = async () => {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    console.log(
      session == null ? `Usuario debe iniciar sesión` : router.push("/buscador")
    );
    error ? console.log(error) : null;
  } catch (error) {
    conhsole.log(error);
  }
};

export { checkUserSession };