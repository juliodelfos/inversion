import { supabase } from "../supabase";
const searchWorkerByRut = async (rut) => {
  try {
    const { data: todes, error } = await supabase
      .from("todes")
      .select("*")
      .eq("RutSDV", rut);

    if (error) {
      throw error;
    }

    return todes.length > 0 ? todes[0] : null; // Return null if no worker is found
  } catch (error) {
    // toast.warning(`Error: ${error.message}`);
    alert(`Error: ${error.message}`);
    return null; // Return null in case of error
  }
};

export { searchWorkerByRut };
