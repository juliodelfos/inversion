<script setup>
import { ref } from "vue";
import { FormKitSchema } from "@formkit/vue";
import { schema } from "../utils/formkitSchema";
import { uploadFileToSupabase } from "../functions/uploadFileToSupabase";
import { newInspection } from "../functions/newInspection";
import { deleteWeirdCharacters } from "../functions/deleteWeirdCharacters";
import { useRoute } from "vue-router";
import router from "../router";

const route = useRoute();

const info = ref({
  presencia: false,
  date: null, // fecha y hora
  firma: false,
  horarios_firma: false,
  utiliza_epp: false,
  supervision_ejecutora: "2022-01-01",
  observaciones: null,
  funcion_contrato: false,
  fiscalizador: null,
  RutSDV: route.params.rut,
  comentario_utiliza_epp: "",
  errorDatos: "",
  herramientas: false,
  condiciones_espacio_laboral: false,
  logo_proempleo: false,
  comuna: route.params.comuna,
  region: route.params.region,
  mes: new Date().getMonth() + 1,
  nombres: route.params.nombres,
  apellidos: `${route.params.paterno} ${route.params.materno}`,
  ejecutor: route.params.ejecutor,
  prevencion_riesgos: false,
});

const insertRow = async (info) => {
  try {
    let filePathSupabase = null;
    if (info.file && info.file.length !== 0) {
      const pathfile = `${deleteWeirdCharacters(route.params.region)}/${deleteWeirdCharacters(info.comuna).replace(/ /g, "")}/${info.RutSDV}.${info.file[0].name.split(".")[1]}`;
      await uploadFileToSupabase(pathfile, info.file);
      filePathSupabase = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/fiscalizaciones/${pathfile}`;
    }
    await newInspection(info, filePathSupabase);
    router.replace("/buscador");
  } catch (error) {
    console.error("Error inserting row: ", error);
  }
};
</script>

<template>
  <main class="bg-blue-100 grid h-auto justify-items-center text-[#003D80] px-4 pt-4 pb-7">
    <div>
      <FormKit type="form" v-model="info" @submit="insertRow(info)">
        <h1 class="sm:text-[1.4rem] md:text-[1.4rem] font-bold text-center leading-normal pb-6">
          Registrar supervisión
        </h1>
        <FormKitSchema :schema="schema" />
      </FormKit>
    </div>
  </main>
</template>
