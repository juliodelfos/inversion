import { supabase } from "../supabase";

const sendRecoveryMail = async (email) => {
  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email.trim()); // Trim email to remove extra spaces

    if (error) {
      console.error("Error sending recovery email:", error.message);
      return null;
    }

    console.log("Recovery email sent:", data);
    return data;
  } catch (error) {
    console.error("Unexpected error:", error);
    return null;
  }
};

export { sendRecoveryMail };
