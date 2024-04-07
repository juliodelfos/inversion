import { supabase } from "../supabase";

const newInspection = async (info) => {
  try {
    const { data, error } = await supabase.from("fiscalizacion").insert({
      presencia: info.presencia,
      // timestamp -> autogenerado
      // id -> autogenerado
      date: info.datetime, // fecha y hora
      // time: info.time, -> ya no aplicaría
      firma: info.firma,
      horarios_firma: info.horarios_firma,
      utiliza_epp: info.utiliza_epp,
      supervision_ejecutora: info.supervision_ejecutora,
      observaciones: info.observaciones,
      funcion_contrato: info.funcion_contrato,
      fiscalizador: info.fiscalizador,
      RutSDV: info.RutSDV,
      /* file:
        info.acumuladorURLs.value.length > 0 ? acumuladorURLs.value : info.null, */ // por mientras vacío
      //   comentario_funcion_contrato: info.comentario_funcion_contrato, -> no por ahora
      comentario_utiliza_epp: info.comentario_utiliza_epp,
      errorDatos: info.errorDatos,
      herramientas: info.herramientas,
      //   condiciones_espacio_laboral: info.condiciones_espacio_laboral, -> no por ahora
      comentario_condiciones_espacio_laboral:
        info.comentario_condiciones_espacio_laboral,
      condiciones_maquinas: info.condiciones_maquinas,
      //   comentario_condiciones_maquinas: info.comentario_condiciones_maquinas, -> no por ahora
      logo_proempleo: info.logo_proempleo,
      comuna: info.comuna,
      region: info.region,
      // firmaImg: info.imagenFirma.value, -> ya no aplicaría
      mes:
        info.datetime.split("-")[1],
      nombres: info.nombres,
      apellidos: info.apellidos,
      ejecutor: info.ejecutor,
      comentario_herramientas: info.comentario_herramientas,
    });

    console.log(`Supervisión de ${info.RutSDV} insertado exitosamente`);

    if (error) {
      console.error("Error insertando supervisión: ", error.message);
      return;
    }

    return data;
  } catch (error) {
    console.error("Error insertando supervisión");
    return;
  }
};

export { newInspection };
