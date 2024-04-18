<template>
    <main
        class="bg-blue-100 grid h-screen justify-items-center text-[#003D80] px-4 pb-7 pt-4"
    >
        <FormKit
            type="form"
            :actions="true"
            v-model="rankings"
            @submit="nuevaEncuesta"
            submit-label="Continuar"
        >
            <h1
                class="sm:text-[1.2rem] md:text-[1.4rem] font-bold text-center leading-normal pb-6"
            >
                Encuesta de satisfacción
            </h1>
            <FormKitSchema :schema="schema" :data="rankings" />
        </FormKit>
    </main>
</template>

<script setup>
import { ref } from "vue";
import { newSurvey } from "../functions/newSurvey";
import {supabase} from "../supabase"
import router from "../router";
import { useRoute } from "vue-router";
const route = useRoute();
const rankings = ref({
    presencia: false,
    pregunta_1: 0,
    pregunta_2: 0,
    pregunta_3: 0,
    comentario_encuesta: "",
});
const errorDatos = ref(route.query.error);
const nextRouter = ref(
    `/supervision/${route.params.region}/${route.params.comuna}/${route.params.nombres}/${route.params.paterno}/${route.params.materno}/${route.params.ejecutor}/${route.params.rut}`,
);

const preguntas = [
    {
        id: 1,
        pregunta:
            "En general, ¿qué tan satisfecho se encuentra con la atención recibida por el ejecutor del programa durante el periodo 2024?",
    },
    {
        id: 2,
        pregunta:
            "En general, ¿qué tan satisfecho se encuentra respecto al cumplimiento del objetivo por el cual ingreso al programa?",
    },
    {
        id: 3,
        pregunta:
            "En general, ¿qué tan satisfecho se encuentra con su participación en el Programa?",
    },
];

const schema = ref([
    {
        $formkit: "checkbox",
        name: "presencia",
        label: "Marca aquí si beneficiaria/o no se encuentra",
        "label-class": "!text-[#cc0000]",
    },
    {
        $formkit: "rating",
        if: "$presencia == false",
        name: "pregunta_1",
        label: preguntas[0].pregunta,
        help: "Nota del 1 al 7",
        step: "0.5",
        min: 1,
        max: 7,
        "inner-class": "!w-[210px]",
        "on-item-wrapper-class": "!basis-[30px]",
        "off-item-wrapper-class": "!basis-[30px]",
        "label-class": "!text-[#003D80]",
        validation: "required",
    },
    {
        $formkit: "rating",
        if: "$presencia == false",
        name: "pregunta_2",
        label: preguntas[1].pregunta,
        help: "Nota del 1 al 7",
        step: "0.5",
        min: 1,
        max: 7,
        "inner-class": "!w-[210px]",
        "on-item-wrapper-class": "!basis-[30px]",
        "off-item-wrapper-class": "!basis-[30px]",
        "label-class": "!text-[#003D80]",
        validation: "required",
    },
    {
        $formkit: "rating",
        if: "$presencia == false",
        name: "pregunta_3",
        label: preguntas[2].pregunta,
        help: "Nota del 1 al 7",
        step: "0.5",
        min: 1,
        max: 7,
        "inner-class": "!w-[210px]",
        "on-item-wrapper-class": "!basis-[30px]",
        "off-item-wrapper-class": "!basis-[30px]",
        "label-class": "!text-[#003D80]",
        validation: "required",
    },
    {
        $formkit: "textarea",
        if: "$presencia == false",
        name: "comentario_encuesta",
        label: "Comentarios adicionales (opcional)",
        placeholder: "Comentarios opcionales",
        "label-class": "!text-[#003D80]",
    },
]);

async function getUserEmail() {
  try {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      toast.error("Error obteniendo email de usuario: ", error.message);
      return;
    }
    return data.user.email;
  } catch (error) {
    console.error("Error obteniendo email de usuario: ", error.message);
    return;
  }
}

const nuevaEncuesta = async () => {
    // Si persona está presente
    if (rankings.value.presencia == false) {
        const data = {
            RutSDV: route.params.rut,
            pregunta_1: rankings.value.pregunta_1,
            pregunta_2: rankings.value.pregunta_2,
            pregunta_3: rankings.value.pregunta_3,
            region: route.params.region,
            comentario_encuesta: rankings.value.comentario_encuesta,
            presencia: true,
            fiscalizador: await getUserEmail(),
        };
        await newSurvey(data);
        router.push({
            path: nextRouter.value,
            query: { error: errorDatos.value },
            replace: true,
        });
        // Si persona no está
    } else {
        const data = {
            RutSDV: route.params.rut,
            pregunta_1: 1,
            pregunta_2: 1,
            pregunta_3: 1,
            region: route.params.region,
            comentario_encuesta: "Sin presencia",
            presencia: false,
            fiscalizador: await getUserEmail(),
        };
        await newSurvey(data);
        router.push({
            path: nextRouter.value,
            query: { error: errorDatos.value },
            replace: true,
        });
    }
};
</script>
