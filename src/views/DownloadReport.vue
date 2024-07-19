<template>
    <main class="grid h-auto place-items-center text-[#003D80] px-4 pt-4 pb-7">
      <div class="w-11/12 sm:w-3/5 md:w-96">
        <FormKit type="form" v-model="info" @submit="fetchExcelFile">
          <div class="pb-4">
            <h1 class="sm:text-[1.4rem] md:text-[1.4rem] font-bold text-center leading-normal pb-6">
              Descargar reporte
            </h1>
            <p class="text-md font-light pb-1 text-justify">
              El siguiente formulario entrega un reporte en formato .xlsx (Excel) de las fiscalizaciones del mes y región que selecciones.
            </p>
            <p class="text-md font-light text-justify">
              Sólo debes escribir el número del mes en formato de dos dígitos ("05" para mayo, por ejemplo), y seleccionar la región deseada.
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
  
  const info = ref({
    regiones: null,
    mes: null,
  });
  
  const listado = ref(null);
  
  const fetchExcelFile = async () => {
    try {
      const { data, error } = await supabase
        .from("fiscalizacion")
        .select("*")
        .eq("region", info.value.regiones)
        .eq("mes", parseInt(info.value.mes.split("-")[1].trim()));
  
      if (error) {
        throw error;
      }
  
      listado.value = data;
      const ws = utils.json_to_sheet(listado.value);
      const wb = utils.book_new();
      utils.book_append_sheet(wb, ws, "Data");
      writeFileXLSX(wb, `${info.value.mes.split("-").join("_")}_${info.value.regiones}.xlsx`);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
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
      validation: "required",
    },
  ];
  </script>
  
  <style scoped>
  main {
    height: 100vh;
    background-color: rgb(225, 239, 254);
  }
  </style>
  