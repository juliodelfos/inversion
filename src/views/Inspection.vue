<script setup>
import { ref } from "vue";
import { FormKitSchema } from "@formkit/vue";
import { schema } from "../utils/formkitSchema";
//import { uploadFileToSupabase } from "../functions/uploadFileToSupabase";
//import { newInspection } from "../functions/newInspection";
// import { useToast } from "vue-toastification";
import { useRoute } from "vue-router";
import router from "../router";
const route = useRoute();
// import { userSessionStore } from "../stores/userSession";
// const userSession = ref(userSessionStore().session.user.email);

// import Menu from './Menu.vue';
// const toast = useToast();

const info = ref({
    presencia: false,
    date: null,
    time: null,
    firma: false,
    horarios_firma: false,
    funcion_contrato: false,
    comentario_funcion_contrato: "",
    utiliza_epp: false,
    comentario_utiliza_epp: "",
    // Se deja en 2022 para evitar el scroll excesivo
    supervision_ejecutora: "2022-01-01",
    fiscalizacion_ejecutora: false,
    observaciones: null,
    fiscalizador: "test",
    // fiscalizador: userSession.value,
    RutSDV: route.params.rut,
    errorDatos: "",
    herramientas: false,
    condiciones_espacio_laboral: false,
    comentario_condiciones_espacio_laboral: "",
    condiciones_maquinas: false,
    comentario_condiciones_maquinas: "",
    logo_proempleo: false,
    comuna: null,
    region: route.params.region,
    nombres: route.params.nombres,
    apellidos: route.params.paterno + " " + route.params.materno,
    ejecutor: route.params.ejecutor,
});

async function insertRow(info) {
    // Sube fotos a Supabase
    // uploadFileToSupabase()
    // Crea row en la tabla fiscalizacion
    // newInspection(
    // toast.success("Información guardada");
    // Vuelve al buscador
    // router.go(-1);
    console.log(info);
}
</script>

<template>
    <!-- <Menu></Menu> -->
    <main
        class="bg-blue-100 grid h-auto place-items-center text-[#003D80] px-4 pt-4 pb-7"
    >
        <div class="w-11/12 sm:w-3/5 md:w-96 lg:w-4/12">
            <FormKitSchema :schema="schema" />
            <FormKit type="form" v-model="info" @submit="insertRow"> </FormKit>
            <pre>{{ schema }}</pre>
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
