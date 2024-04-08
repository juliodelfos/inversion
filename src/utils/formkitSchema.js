import { comunas } from "../utils/comunasChile";
import { formateDate } from "../functions/formateDate";
let reportaError = false;

const schema = [
  // {
  //   $formkit: "date",
  //   name: "date",
  //   label: "Fecha supervisión",
  //   help: "Fecha en que se visitó a trabajador/a",
  //   labelClass: "labels",
  //   classes: {
  //     help: "textoAzul",
  //   },
  //   validation: "required|date_after:2023-01-01",
  // },
  {
    $formkit: "datetime-local",
    name: "datetime",
    label: "Fecha y hora de supervisión",
    help: "Fecha y hora en que se visitó a trabajador/a",
    value: formateDate(new Date().toISOString()),
    labelClass: "labels",
    classes: {
      help: "textoAzul",
    },
    validation: "required|date_after:2023-01-01",
  },
  // {
  //   $formkit: "time",
  //   name: "time",
  //   label: "Hora supervisión",
  //   help: "Hora en que se visitó a trabajador/a",
  //   labelClass: "labels",
  //   classes: {
  //     help: "textoAzul",
  //   },
  //   validation: "required|time",
  // },
  {
    $formkit: "select",
    autocomplete: true,
    name: "comuna",
    id: "comuna",
    label: "Comuna en que trabaja",
    placeholder: "Escribe la comuna",
    options: comunas,
    labelClass: "labels",
    classes: {
      help: "textoAzul",
    },
  },
  {
    $formkit: "toggle",
    name: "presencia",
    id: "presencia",
    label: "Se encontraba en el lugar",
    labelClass: "labels",
    classes: {
      help: "textoAzul",
    },
  },
  {
    $formkit: "toggle",
    name: "firma",
    id: "firma",
    label: "Firma libro de asistencia",
    labelClass: "labels",
    classes: {
      help: "textoAzul",
    },
  },
  {
    $formkit: "toggle",
    name: "horarios_firma",
    id: "horarios_firma",
    label: "Cumple horarios según libro",
    labelClass: "labels",
    classes: {
      help: "textoAzul",
    },
  },
  {
    $formkit: "toggle",
    name: "funcion_contrato",
    id: "funcion_contrato",
    label: "Cumple funciones según contrato",
    labelClass: "labels",
    classes: {
      help: "textoAzul",
    },
  },
  // {
  //   $formkit: "textarea",
  //   if: "$get(funcion_contrato).value",
  //   name: "comentario_funcion_contrato",
  //   label: "¿Qué función está realizando la trabajadora?",
  //   labelClass: "labels",
  //   classes: {
  //     help: "textoAzul",
  //   },
  // },
  {
    $formkit: "toggle",
    name: "utiliza_epp",
    id: "utiliza_epp",
    label: "Utiliza EPP",
    labelClass: "labels",
    classes: {
      help: "textoAzul",
    },
  },
  {
    $formkit: "textarea",
    if: "$get(utiliza_epp).value",
    name: "comentario_utiliza_epp",
    label: "¿Por qué motivo no utiliza sus EPP?",
    labelClass: "labels",
    classes: {
      help: "textoAzul",
    },
  },
  {
    $formkit: "toggle",
    name: "herramientas",
    id: "herramientas",
    label: "Cuenta con insumos adecuados",
    labelClass: "labels",
    classes: {
      help: "textoAzul",
    },
  },
  {
    $formkit: "textarea",
    if: "$get(herramientas).value",
    name: "comentario_herramientas",
    label: "¿De qué insumo carece?",
    labelClass: "labels",
    classes: {
      help: "textoAzul",
    },
  },
  {
    $formkit: "toggle",
    name: "condiciones_espacio_laboral",
    id: "condiciones_espacio_laboral",
    label: "Condiciones laborales adecuadas",
    labelClass: "labels",
    classes: {
      help: "textoAzul",
    },
  },
  // {
  //   $formkit: "textarea",
  //   if: "$get(condiciones_espacio_laboral).value",
  //   name: "comentario_condiciones_espacio_laboral",
  //   label: "Describe falencias espacio laboral",
  //   labelClass: "labels",
  //   classes: {
  //     help: "textoAzul",
  //   },
  // },
  // {
  //   $formkit: "toggle",
  //   name: "condiciones_maquinas",
  //   id: "condiciones_maquinas",
  //   label: "Herramientas en buen estado",
  //   labelClass: "labels",
  //   classes: {
  //     help: "textoAzul",
  //   },
  // },
  // {
  //   $formkit: "textarea",
  //   if: "$get(condiciones_maquinas).value",
  //   name: "comentario_condiciones_maquinas",
  //   label: "Describe condiciones de máquinas o insumos",
  //   labelClass: "labels",
  //   classes: {
  //     help: "textoAzul",
  //   },
  // },
  {
    $formkit: "toggle",
    name: "logo_proempleo",
    id: "logo_proempleo",
    label: "Indumentaria cuenta con logo ProEmpleo",
    labelClass: "labels",
    classes: {
      help: "textoAzul",
    },
  },
  {
    $formkit: "toggle",
    name: "fiscalizacion_ejecutora",
    id: "fiscalizacion_ejecutora",
    label: "¿Ejecutora ha supervisado?",
    labelClass: "labels",
    classes: {
      help: "textoAzul",
    },
  },
  {
    $formkit: "date",
    name: "supervision_ejecutora",
    if: "$get(fiscalizacion_ejecutora).value",
    label: "Fecha última supervisión ejecutora",
    help: "Fecha en que ejecutora visitó a trabajador/a",
    labelClass: "labels",
    classes: {
      help: "textoAzul",
    },
  },
  {
    $formkit: "textarea",
    name: "observaciones",
    label: "Observaciones de fiscalización en terreno",
    labelClass: "labels",
    classes: {
      help: "textoAzul",
    },
  },
  {
    $formkit: "textarea",
    if: reportaError,
    name: "errorDatos",
    label: "Reportar errores en datos personales",
    labelClass: "labels",
    classes: {
      help: "textoAzul",
    },
  },
  {
    $formkit: "file",
    name: "file",
    label: "Cargar archivos",
    labelClass: "labels",
    classes: {
      noFilesIcon: "textoAzul",
      help: "textoAzul",
    },
    accept: ".jpg, .jpeg, .png, .gif, .heif, .hevc, .docx, .xlsx",
    multiple: "false",
    // validation: "required|file",
  },
];

export { schema };
