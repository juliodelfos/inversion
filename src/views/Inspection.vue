<script setup>
// import { ref } from "vue";
import { FormKitSchema } from "@formkit/vue";
import { schema } from "../utils/formkitSchema";
import { uploadFileToSupabase } from "../functions/uploadFileToSupabase";
import { newInspection } from "../functions/newInspection";
import { deleteWeirdCharacters } from "../functions/deleteWeirdCharacters";
import { useRoute } from "vue-router";
import router from "../router";
const route = useRoute();
// import { useToast } from "vue-toastification";
// import { userSessionStore } from "../stores/userSession";
// const userSession = ref(userSessionStore().session.user.email);

// import Menu from './Menu.vue';
// const toast = useToast();

const info = {
  presencia: false,
  date: null, // fecha y hora
  firma: false,
  horarios_firma: false,
  utiliza_epp: false,
  supervision_ejecutora: "2022-01-01",
  observaciones: null,
  funcion_contrato: false,
  fiscalizador: "test",
  RutSDV: route.params.rut,
  //   comentario_funcion_contrato: "",
  comentario_utiliza_epp: "",
  errorDatos: "",
  herramientas: false,
  condiciones_espacio_laboral: false,
  logo_proempleo: false,
  comuna: null,
  region: route.params.region,
  mes: "test",
  nombres: route.params.nombres,
  apellidos: route.params.paterno + " " + route.params.materno,
  ejecutor: route.params.ejecutor,
};

const insertRow = async (info) => {
  // Sube fotos a Supabase
  const pathfile = `${deleteWeirdCharacters(
    route.params.region
  )}/${deleteWeirdCharacters(info.comuna).replace(/ /g, "")}/${info.RutSDV}.${
    info.file[0].name.split(".")[1] // extensión
  }`;

  await uploadFileToSupabase(pathfile, info.file);

  const filePathSupabase = `${
    import.meta.env.VITE_SUPABASE_URL
  }/storage/v1/object/public/fiscalizaciones/${pathfile}`;

  // Crea row en la tabla fiscalizacion
  await newInspection(info, filePathSupabase);
  // toast.success("Información guardada");
  // Vuelve al buscador
  router.replace("/buscador");
};
</script>

<template>
  <!-- <Menu></Menu> -->
  <main
    class="bg-blue-100 grid h-auto place-items-center text-[#003D80] px-4 pt-4 pb-7"
  >
    <div>
      <FormKit type="form" v-model="info" @submit="insertRow">
        <h1
          class="sm:text-[1.2rem] md:text-[1.4rem] font-bold text-center leading-normal pb-6"
        >
          Registrar supervisión
        </h1>
        <FormKitSchema :schema="schema" />
      </FormKit>
    </div>
  </main>
</template>

<style scoped>
.labels {
  font-size: 0.9rem;
}

.textoAzul {
  color: #003d80;
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
