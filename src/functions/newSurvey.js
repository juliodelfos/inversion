import { supabase } from "../supabase";

const newSurvey = async (datos) => {
  console.log(datos);
  try {
    const { data, error } = await supabase.from("surveys").insert(datos);

    if (error) {
      console.error("Error insertando encuesta: ", error.message);
      return;
    }

    return data;
  } catch (error) {
    console.error("Error insertando encuesta:", error);
    return;
  }
};

export { newSurvey };
