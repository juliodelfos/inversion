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

      // Optional: Store user data or update state for later use
      // localStorage.setItem("user", JSON.stringify(data));
    } 
    toast.error('Credenciales incorrectas')
  } catch (error) {
    // Handle any unforeseen errors gracefully
    toast.error("Error en el ingreso:", error, { timeout: false });
    // Display a user-friendly error message or redirect to appropriate page
  }
};


export { login };