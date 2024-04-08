import { supabase } from "@/supabase";
import router from "../router/index"

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
    } else {
      // Handle specific errors based on error message or code
      if (error.code === "invalid_credentials") {
        throw new Error("Invalid email or password");
      } else {
        throw new Error("An error occurred: " + error.message);
      }
    }
  } catch (error) {
    // Handle any unforeseen errors gracefully
    console.error("Login error:", error);
    // Display a user-friendly error message or redirect to appropriate page
  }
};


export { login };