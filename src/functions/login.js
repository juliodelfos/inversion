import { supabase } from "@/supabase";
import router from "../router/index"
import { useToast } from "vue-toastification";

const toast = useToast();

const login = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(), // Trim email for potential extra spaces
      password: password.trim(), // Trim password as well
    });

    if (data) {
      // Successful login
      router.push("/buscador");
    } 
    error ? toast.error('Credenciales incorrectas') : null;
  } catch (error) {
    toast.error("Error en el ingreso. Inténtalo nuevamente");
  }
};


export { login };