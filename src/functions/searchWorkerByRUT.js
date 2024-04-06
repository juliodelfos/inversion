import { supabase } from "../supabase";
// import { useToast } from "vue-toastification";
// const toast = useToast();

const searchWorkerByRut = async (rut) => {
  try {
    const { data: todes, error } = await supabase
      .from("todes")
      .select("*")
      .eq("RutSDV", rut);
    if (error) throw error;
    return todes[0];
  } catch (error) {
    // toast.warning(`Error; ${error}`);
    alert(`Error; ${error.message}`);
  }
};

export { searchWorkerByRut };
