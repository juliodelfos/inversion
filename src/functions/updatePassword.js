import { supabase } from "../supabase";

const updatePassword = async (email, password) => {
  await supabase.auth.updateUser({ password: password });
};

export default { updatePassword };
