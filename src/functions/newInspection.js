import { supabase } from "../supabase";

const newInspection = async (
  presencia,
  date,
  time,
  firma,
  horarios_firma,
  funcion_contrato,
  utiliza_epp,
  supervision_ejecutora,
  observaciones,
  fiscalizador,
  RutSDV,
  comentario_funcion_contrato,
  comentario_utiliza_epp,
  file,
  herramientas,
  condiciones_espacio_laboral,
  comentario_condiciones_espacio_laboral,
  comentario_condiciones_espacio_laboral,
  comentario_utiliza_epp,
  comentario_herramientas,
  condiciones_maquinas,
  comentario_condiciones_maquinas,
  comentario_condiciones_maquinas,
  logo_proempleo,
  errorDatos,
  comuna,
  region,
  mes,
  nombres,
  apellidos,
  ejecutor,
) => {
  try {
    const { data, error } = await supabase.from("fiscalizacion").insert([
      {
        presencia: presencia,
        date: date,
        time: time,
        firma: firma,
        horarios_firma: horarios_firma,
        funcion_contrato: funcion_contrato,
        utiliza_epp: utiliza_epp,
        supervision_ejecutora: supervision_ejecutora,
        observaciones: observaciones,
        fiscalizador: fiscalizador,
        RutSDV: RutSDV,
        comentario_funcion_contrato: comentario_funcion_contrato,
        comentario_utiliza_epp: comentario_utiliza_epp,
        file: acumuladorURLs.value.length > 0 ? acumuladorURLs.value : null,
        herramientas: herramientas,
        condiciones_espacio_laboral: condiciones_espacio_laboral,
        comentario_condiciones_espacio_laboral:
          comentario_condiciones_espacio_laboral,
        comentario_utiliza_epp: comentario_utiliza_epp,
        comentario_herramientas: comentario_herramientas,
        condiciones_maquinas: condiciones_maquinas,
        comentario_condiciones_maquinas: comentario_condiciones_maquinas,
        logo_proempleo: logo_proempleo,
        errorDatos: errorDatos,
        comuna: comuna,
        region: region,
        firmaImg: imagenFirma.value,
        mes:
          date.split("-")[1].trim()[1] > 9
            ? +date.split("-")[1].trim()[1]
            : +date.split("-")[1].trim(),
        nombres: nombres,
        apellidos: apellidos,
        ejecutor: ejecutor,
      },
    ]);

    if (error) {
      console.error("Error insertando fiscalización: ", error.message);
      return;
    }

    return data;
  } catch (error) {
    console.error("Error inserting new row: ", error);
    return;
  }
};

export { newInspection };
