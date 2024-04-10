import { supabase } from "../supabase";

const sendRecoveryMail = async (email) => {
  // console.log(email)
  // const protocol = window.location.protocol;
  // const port = window.location.port;
  // const hostname = window.location.hostname;
  // console.log(email);
  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email);
    console.log(data);
    console.log(error.message);
    return data;
  } catch (error) {
    return console.log(error);
  }
};

export { sendRecoveryMail };
