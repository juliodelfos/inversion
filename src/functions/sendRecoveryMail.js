import { supabase } from "../supabase";

const sendRecoveryMail = async (email) => {
  // console.log(email)
  // const protocol = window.location.protocol;
  // const port = window.location.port;
  // const hostname = window.location.hostname;
  // console.log(email);
  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      // redirectTo: `${protocol}/${port}/${hostname}/reset-password`,
      redirectTo: "http://localhost:5173/nueva-contrasena",
    });
    console.log(data);
    console.log(error.message);
    return data;
  } catch (error) {
    return console.log(error);
  }
};

export { sendRecoveryMail };
