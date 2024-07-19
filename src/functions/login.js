import { supabase } from "@/supabase";
import router from "../router/index";
import { useToast } from "vue-toastification";
import { userSessionStore } from "../stores/userSession";

// Obtener el estado de Pinia del email
const userSession = userSessionStore();
const toast = useToast();

const login = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(), // Eliminar espacios adicionales del email
      password: password.trim(), // Eliminar espacios adicionales de la contraseña
    });

    if (error) {
      toast.error("Credenciales incorrectas");
      return;
    }

    if (data) {
      // Inicio de sesión exitoso
      userSession.email = email;
      router.push("/buscador");
      toast.success("Inicio de sesión exitoso");
    }
  } catch (error) {
    toast.error("Error en el ingreso. Inténtalo nuevamente");
    console.error("Error en el ingreso:", error);
  }
};

export { login };
