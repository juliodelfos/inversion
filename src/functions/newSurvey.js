import { supabase } from "../supabase";
import { useToast } from "vue-toastification";

const toast = useToast();

const newSurvey = async (datos) => {
  console.log(datos);
  try {
    const { data, error } = await supabase.from("surveys").insert(datos);

    if (error) {
      toast.error("Error registrando encuesta. Inténtalo nuevamente");
      return;
    }
    toast.success("Encuesta enviada exitosamente");
    return data;
  } catch (error) {
    console.error("Error insertando encuesta:", error);
    return;
  }
};

export { newSurvey };
