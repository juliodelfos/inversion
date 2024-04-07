<script setup>
import { ref, useAttrs } from "vue";
import { supabase } from "../supabase";
import { FormKitSchema } from "@formkit/vue";
// import { useToast } from "vue-toastification";
import { useRoute } from "vue-router";
// import VueDrawingCanvas from "vue-drawing-canvas";
import { comunas } from "../utils/comunasChile";
import router from "../router";
// import { userSessionStore } from "../stores/userSession";
const route = useRoute();
// const toast = useToast();
// import Menu from './Menu.vue';
const urlFile = ref("");

const canvas = ref({
  width: 200,
  height: 200,
  lineWidth: 1,
  saveAs: "png",
  width: "300",
  height: "300",
});

let imagenCreada = ref("");

const VueCanvasDrawing = ref(null);

// initialize userSession store
// const userSession = ref(userSessionStore().session.user.email);

let reportaError = ref(route.query.error);

//#region
// FormKit
// const info = ref({
//   presencia: false,
//   date: null,
//   time: null,
//   firma: false,
//   horarios_firma: false,
//   funcion_contrato: false,
//   comentario_funcion_contrato: "",
//   utiliza_epp: false,
//   comentario_utiliza_epp: "",
//   // Se deja en 2022 para evitar el scroll excesivo
//   supervision_ejecutora: "2022-01-01",
//   fiscalizacion_ejecutora: false,
//   observaciones: null,
//   fiscalizador: "test",
//   // fiscalizador: userSession.value,
//   RutSDV: useAttrs().rut,
//   errorDatos: "",
//   herramientas: false,
//   condiciones_espacio_laboral: false,
//   comentario_condiciones_espacio_laboral: "",
//   condiciones_maquinas: false,
//   comentario_condiciones_maquinas: "",
//   logo_proempleo: false,
//   comuna: null,
//   region: useAttrs().region,
//   firmaImg: null,
//   nombres: useAttrs().nombres,
//   apellidos: useAttrs().paterno + " " + useAttrs().materno,
//   ejecutor: useAttrs().ejecutor,
// });

const schema = [
  {
    $el: "h1",
    children: "Fiscalización presencial",
    attrs: {
      style: {
        "font-size": "1.8rem",
        padding: "1rem 0",
        "text-align": "center",
        "font-weight": "700",
      },
    },
  },
  {
    $formkit: "date",
    name: "date",
    label: "Fecha fiscalización",
    help: "Fecha en que se visitó a trabajador/a",
    labelClass: "labels",
    classes: {
      input: "bg-blanco",
      help: "textoAzul",
      outer: "espacioVertical",
    },
    validation: "required|date",
  },
  {
    $formkit: "time",
    name: "time",
    label: "Hora supervisión",
    help: "Hora en que se visitó a trabajador/a",
    labelClass: "labels",
    classes: {
      input: "bg-blanco",
      help: "textoAzul",
      outer: "espacioVertical",
    },
    validation: "required|time",
  },
  {
    $formkit: "select",
    name: "comuna",
    id: "comuna",
    label: "Comuna en que trabaja",
    placeholder: "Escribe la comuna",
    options: comunas,
    labelClass: "labels",
    classes: {
      input: "bg-blanco",
      help: "textoAzul",
      outer: "espacioVertical",
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
      outer: "espacioVertical",
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
      outer: "espacioVertical",
    },
  },
  {
    $formkit: "toggle",
    name: "horarios_firma",
    id: "horarios_firma",
    label: "Cumple horarios según libro",
    labelClass: "labels",
    classes: {
      outer: "espacioVertical",
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
      outer: "espacioVertical",
    },
  },
  // {
  //   $formkit: "textarea",
  //   if: "$get(funcion_contrato).value",
  //   name: "comentario_funcion_contrato",
  //   label: "¿Qué función está realizando la trabajadora?",
  //   labelClass: "labels",
  //   classes: {
  //     input: "bg-blanco",
  //     help: "textoAzul",
  //     outer: "espacioVertical",
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
      outer: "espacioVertical",
    },
  },
  {
    $formkit: "textarea",
    if: "$get(utiliza_epp).value",
    name: "comentario_utiliza_epp",
    label: "¿Por qué motivo no utiliza sus EPP?",
    labelClass: "labels",
    classes: {
      input: "bg-blanco",
      help: "textoAzul",
      outer: "espacioVertical",
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
      outer: "espacioVertical",
    },
  },
  {
    $formkit: "textarea",
    if: "$get(herramientas).value",
    name: "comentario_herramientas",
    label: "¿De qué insumo carece?",
    labelClass: "labels",
    classes: {
      input: "bg-blanco",
      help: "textoAzul",
      outer: "espacioVertical",
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
      outer: "espacioVertical",
    },
  },
  // {
  //   $formkit: "textarea",
  //   if: "$get(condiciones_espacio_laboral).value",
  //   name: "comentario_condiciones_espacio_laboral",
  //   label: "Describe falencias espacio laboral",
  //   labelClass: "labels",
  //   classes: {
  //     input: "bg-blanco",
  //     help: "textoAzul",
  //     outer: "espacioVertical",
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
  //     outer: "espacioVertical",
  //   },
  // },
  // {
  //   $formkit: "textarea",
  //   if: "$get(condiciones_maquinas).value",
  //   name: "comentario_condiciones_maquinas",
  //   label: "Describe condiciones de máquinas o insumos",
  //   labelClass: "labels",
  //   classes: {
  //     input: "bg-blanco",
  //     help: "textoAzul",
  //     outer: "espacioVertical",
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
      outer: "espacioVertical",
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
      outer: "espacioVertical",
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
      input: "bg-blanco",
      help: "textoAzul",
      outer: "espacioVertical",
    },
  },
  {
    $formkit: "textarea",
    name: "observaciones",
    label: "Observaciones de fiscalización en terreno",
    labelClass: "labels",
    classes: {
      input: "bg-blanco",
      help: "textoAzul",
      outer: "espacioVertical",
    },
  },
  {
    $formkit: "textarea",
    if: reportaError.value,
    name: "errorDatos",
    label: "Reportar errores en datos personales",
    labelClass: "labels",
    classes: {
      input: "bg-blanco",
      help: "textoAzul",
      outer: "espacioVertical",
    },
  },
  {
    $formkit: "file",
    name: "files",
    label: "Cargar archivos",
    labelClass: "labels",
    classes: {
      input: "bg-blanco",
      noFilesIcon: "textoAzul",
      help: "textoAzul",
      outer: "espacioVertical",
    },
    accept: ".jpg, .jpeg, .png, .gif, .heif, .hevc, .docx, .xlsx",
    multiple: "true",
    // validation: "required|file",
  },
];

const acumuladorURLs = ref([]);

async function insertRow(info) {
  const formdata = new FormData();
  const myHeaders = new Headers();
  const urlencoded = new URLSearchParams();
  const imagenFirma = ref("");
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  urlencoded.append("file", `${imagenCreada.value}`);
  urlencoded.append("name", info.RutSDV);
  urlencoded.append("api_key", "387949596469975");
  urlencoded.append("upload_preset", "fiscalizacion");
  urlencoded.append("folder", "firmas");

  const uploadOptions = {
    method: "POST",
    redirect: "follow",
  };

  for (const archivo of info.files) {
    formdata.append("file", archivo.file);
    formdata.append("name", archivo.name);
    formdata.append("api_key", "387949596469975");
    formdata.append("upload_preset", "fiscalizacion");
    formdata.append("folder", "fiscalizacion");
    await fetch("https://api.cloudinary.com/v1_1/dvimz0k3r/auto/upload", {
      ...uploadOptions,
      body: formdata,
    })
      .then((response) => response.json())
      .then((result) => acumuladorURLs.value.push(result.url))
      .catch((error) => console.log(`Error: ${error}`));
  }

  await fetch("https://api.cloudinary.com/v1_1/dvimz0k3r/auto/upload", {
    ...uploadOptions,
    body: urlencoded,
    headers: myHeaders,
  })
    .then((response) => response.json())
    .then((result) => (imagenFirma.value = result.url))
    .catch((error) => console.log("error", error));

  await supabase.from("fiscalizacion").insert([
    {
      presencia: info.presencia,
      date: info.date,
      time: info.time,
      firma: info.firma,
      horarios_firma: info.horarios_firma,
      funcion_contrato: info.funcion_contrato,
      utiliza_epp: info.utiliza_epp,
      supervision_ejecutora: info.supervision_ejecutora,
      observaciones: info.observaciones,
      fiscalizador: info.fiscalizador,
      RutSDV: info.RutSDV,
      comentario_funcion_contrato: info.comentario_funcion_contrato,
      comentario_utiliza_epp: info.comentario_utiliza_epp,
      file: acumuladorURLs.value.length > 0 ? acumuladorURLs.value : null,
      herramientas: info.herramientas,
      condiciones_espacio_laboral: info.condiciones_espacio_laboral,
      comentario_condiciones_espacio_laboral:
        info.comentario_condiciones_espacio_laboral,
      comentario_utiliza_epp: info.comentario_utiliza_epp,
      comentario_herramientas: info.comentario_herramientas,
      condiciones_maquinas: info.condiciones_maquinas,
      comentario_condiciones_maquinas: info.comentario_condiciones_maquinas,
      logo_proempleo: info.logo_proempleo,
      errorDatos: info.errorDatos,
      comuna: info.comuna,
      region: info.region,
      firmaImg: imagenFirma.value,
      mes:
        info.date.split("-")[1].trim()[1] > 9
          ? +info.date.split("-")[1].trim()[1]
          : +info.date.split("-")[1].trim(),
      nombres: info.nombres,
      apellidos: info.apellidos,
      ejecutor: info.ejecutor,
    },
  ]);

  // toast.success("Información guardada");
  router.go(-1);
}
//#endregion
</script>

<template>
  <!-- <Menu></Menu> -->
  <main
    class="bg-blue-100 grid h-auto place-items-center text-[#003D80] px-4 pt-4 pb-7"
  >
    <div class="w-11/12 sm:w-3/5 md:w-96 lg:w-4/12">
      <FormKitSchema :schema="schema" />
      <!-- <FormKit type="form" v-model="info" @submit="insertRow">
        <h2 class="textoAzul labels font-bold" v-show="info.presencia">
          Firma trabajador/a
        </h2>
        <div class="canvas-contenedor" v-show="info.presencia">
          <vue-drawing-canvas
            ref="VueCanvasDrawing"
            :lineWidth="canvas.lineWidth"
            :saveAs="canvas.saveAs"
            :height="canvas.height"
            :width="canvas.width"
            v-model:image="imagenCreada"
          />
        </div>
      </FormKit> -->
    </div>
  </main>
</template>

<style>
.labels {
  font-size: 1rem;
}

.bg-blanco {
  color: #003d80;
  background-color: rgba(255, 255, 255, 0.5);
}

.textoAzul {
  color: #003d80;
}

.espacioVertical {
  padding-bottom: 0.7rem;
}

[data-type="submit"] .formkit-input {
  width: 100%;
}

.canvas-contenedor {
  width: 85%;
  height: 85%;
  padding-top: 0.7rem;
  margin: 0 1.3rem 1.3rem 1.3rem;
  display: flex;
  justify-content: center;
}
</style>
