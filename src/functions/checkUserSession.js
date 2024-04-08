import { supabase } from "../supabase";
import router from "../router/index";

const checkUserSession = async () => {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  console.log(
    session == null ? `Usuario debe iniciar sesión` : router.push("/buscador"),
  );
};

export { checkUserSession };
