<template>
    <main
        class="bg-blue-100 grid h-screen place-items-center text-[#003D80] px-4 pt-4 pb-7"
    >
        <FormKit
            type="form"
            #default="{ value }"
            :actions="true"
            v-model="rankings"
            @submit="nuevaEncuesta"
        >
            <h1
                class="sm:text-[1.2rem] md:text-[1.4rem] font-bold text-center leading-normal pb-6"
            >
                Encuesta de satisfacción
            </h1>
            <FormKitSchema :schema="schema" />
        </FormKit>
    </main>
</template>

<script setup>
import { ref } from "vue";
import { newSurvey } from "../functions/newSurvey";
import { useRoute } from "vue-router";
import router from "../router";
const route = useRoute();
const rankings = ref([]);

const preguntas = [
    {
        id: 1,
        pregunta:
            "En general, ¿qué tan satisfecho se encuentra con la atención recibida por el ejecutor del programa durante el periodo 2024?",
    },
    {
        id: 2,
        pregunta:
            "En general, ¿qué tan satisfecho se encuentra respecto al cumplimiento del objetivo por el cuál ingreso al programa?",
    },
    {
        id: 3,
        pregunta:
            "En general, ¿qué tan satisfecho se encuentra con su participación en el Programa?",
    },
];

const schema = ref([
    {
        $formkit: "rating",
        name: "pregunta_1",
        label: preguntas[0].pregunta,
        help: "Nota del 1 al 7",
        step: "0.5",
        min: 1,
        max: 7,
        "inner-class": "!w-[210px]",
        "on-item-wrapper-class": "!basis-[30px]",
        "off-item-wrapper-class": "!basis-[30px]",
        validation: "required",
    },
    {
        $formkit: "rating",
        name: "pregunta_2",
        label: preguntas[1].pregunta,
        help: "Nota del 1 al 7",
        step: "0.5",
        min: 1,
        max: 7,
        "inner-class": "!w-[210px]",
        "on-item-wrapper-class": "!basis-[30px]",
        "off-item-wrapper-class": "!basis-[30px]",
        validation: "required",
    },
    {
        $formkit: "rating",
        name: "pregunta_3",
        label: preguntas[2].pregunta,
        help: "Nota del 1 al 7",
        step: "0.5",
        min: 1,
        max: 7,
        "inner-class": "!w-[210px]",
        "on-item-wrapper-class": "!basis-[30px]",
        "off-item-wrapper-class": "!basis-[30px]",
        validation: "required",
    },
]);

const nuevaEncuesta = async () => {
    const data = {
        rutSinDV: route.params.rut,
        pregunta_1: rankings.value.pregunta_1,
        pregunta_2: rankings.value.pregunta_2,
        pregunta_3: rankings.value.pregunta_3,
        region: route.params.region,
    };
    await newSurvey(data);
    router.replace(
        `/fiscalizacion/${route.params.region}/${route.params.nombres}/${route.params.paterno}/${route.params.materno}/${route.params.ejecutor}/${route.params.rut}?error=${route.query.error}`,
    );
};
</script>
