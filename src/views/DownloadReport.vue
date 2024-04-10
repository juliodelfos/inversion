<template>
    <main class="grid h-auto place-items-center text-[#003D80] px-4 pt-4 pb-7">
        <div class="w-11/12 sm:w-3/5 md:w-96">
            <FormKit type="form" v-model="info" @submit="fetchExcelFile">
                <div class="pb-4">
                    <h1
                        class="sm:text-[1.2rem] md:text-[1.4rem] font-bold text-center leading-normal pb-6"
                    >
                        Descargar reporte
                    </h1>
                    <p class="text-md font-light">
                        El siguiente formulario entrega un reporte en formato
                        .xlsx (Excel) de las fiscalizaciones del mes y región
                        que selecciones.
                    </p>
                    <p class="text-md font-light">
                        Sólo debes escribir el número del mes en formato de dos
                        dígitos ("05" para mayo, por ejemplo), y seleccionar la
                        región deseada.
                    </p>
                    <p class="text-md font-light">
                        Sólo disponible en versión escritorio.
                    </p>
                </div>
                <FormKitSchema :schema="schema" />
            </FormKit>
        </div>
    </main>
</template>

<script setup>
import { ref } from "vue";
import { supabase } from "../supabase";
import { utils, writeFileXLSX } from "xlsx";
import regiones from "../utils/regionesChile";

// import meses from "../meses";
// Descargar con nombre completo de la persona, ejecutor
const listado = ref(null);

const fetchExcelFile = async () => {
    const { data, error } = await supabase
        .from("fiscalizacion")
        .select("*")
        .eq("region", info.value.regiones)
        .eq(
            "mes",
            +info.value.mes.split("-")[1].trim()[1] > 9
                ? +info.value.mes.split("-")[1].trim()[1]
                : +info.value.mes.split("-")[1].trim(),
        );

    listado.value = data;
    if (error) {
        throw error;
    }

    const ws = utils.json_to_sheet(listado.value);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Data");
    writeFileXLSX(
        wb,
        `${info.value.mes.split("-").join("_")}_${info.value.regiones}.xlsx`,
    );
};

const info = ref({
    regiones: null,
    mes: null,
});

const schema = [
    {
        $formkit: "mask",
        name: "mes",
        label: "Escribe el mes",
        mask: `${new Date().getFullYear()} - ##`,
        help: `Formato "${new Date().getFullYear()} - 05", para obtener mayo del presente año`,
        "label-class": "!text-[#003D80]",
        validation: "required",
    },
    {
        $formkit: "select",
        autocomplete: true,
        name: "regiones",
        id: "regiones",
        label: "Selecciona la región",
        placeholder: "Escribe el nombre",
        "label-class": "!text-[#003D80]",
        options: regiones,
    },
];
</script>

<style scoped>
main {
    height: 100vh !important;
    background-color: rgb(225 239 254);
}
</style>
