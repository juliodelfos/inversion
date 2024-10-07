import { supabase } from "../supabase";
import { useToast } from "vue-toastification";

const toast = useToast();

const newSurvey = async (datos) => {
  try {
    const { data, error } = await supabase.from("encuestas_dos").insert(datos);

    if (error) {
      console.error("Supabase Error:", error);
      toast.error("Error registrando encuesta. Inténtalo nuevamente");
      return;
    }
    toast.success("Encuesta enviada exitosamente");
    return data;
  } catch (error) {
    console.error("Catch Error:", error);
    toast.error("Error insertando encuesta");
    return;
  }
};


export { newSurvey };
