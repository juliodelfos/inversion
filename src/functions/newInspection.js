import { supabase } from "../supabase";
import { useToast } from "vue-toastification";
import { userSessionStore } from "../stores/userSession";

const {
  session: {
    user: { email: userEmail },
  },
} = userSessionStore();

const toast = useToast();

const newInspection = async (info, file) => {
  try {
    const { data, error } = await supabase.from("fiscalizacion").insert({
      presencia: info.presencia,
      date: info.datetime,
      firma: info.firma,
      horarios_firma: info.horarios_firma,
      utiliza_epp: info.utiliza_epp,
      supervision_ejecutora: info.supervision_ejecutora,
      observaciones: info.observaciones,
      funcion_contrato: info.funcion_contrato,
      fiscalizador: userEmail,
      RutSDV: info.RutSDV,
      file: file,
      comentario_utiliza_epp: info.comentario_utiliza_epp,
      errorDatos: info.errorDatos,
      herramientas: info.herramientas,
      comentario_condiciones_espacio_laboral: info.comentario_condiciones_espacio_laboral,
      condiciones_maquinas: info.condiciones_maquinas,
      logo_proempleo: info.logo_proempleo,
      comuna: info.comuna,
      region: info.region,
      mes: info.mes,
      nombres: info.nombres,
      apellidos: info.apellidos,
      ejecutor: info.ejecutor,
      comentario_herramientas: info.comentario_herramientas,
      prevencion_riesgos: info.prevencion_riesgos,
    });

    if (error) {
      toast.error("Error registrando supervisión, inténtalo nuevamente");
      console.error("Error insertando supervisión: ", error.message);
      return;
    }

    toast.success(`Supervisión del RUT ${info.RutSDV} registrada exitosamente`);
    return data;
  } catch (error) {
    toast.error("Error inesperado al registrar supervisión, inténtalo nuevamente");
    console.error("Error inesperado insertando supervisión: ", error);
    return;
  }
};

export { newInspection };
