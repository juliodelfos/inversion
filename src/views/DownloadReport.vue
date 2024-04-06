<template>
    <Menu></Menu>
  
    <main class="bg-blue-100 grid place-items-center text-[#003D80] px-4 pt-4 pb-7 h-screen">
      <div class="w-11/12 sm:w-3/5 md:w-96 ">
        <FormKit type="form" v-model="info" @submit="fetchExcelFile">
          <FormKitSchema :schema="schema" />
        </FormKit>
      </div>
    </main>
  </template>
    
  <script setup>
  import { ref } from "vue";
  import { supabase } from "../supabase";
  import { utils, writeFileXLSX } from 'xlsx';
  import regiones from "../regiones";
  import Menu from './Menu.vue';
  
  // import meses from "../meses";
  // Descargar con nombre completo de la persona, ejecutor
  const listado = ref(null)
  
  const fetchExcelFile = async () => {
    const { data, error } = await supabase
      .from("fiscalizacion")
      .select("*")
      .eq("region", info.value.regiones)
      .eq("mes", +info.value.mes.split("-")[1].trim()[1] > 9 ? +info.value.mes.split("-")[1].trim()[1] : +info.value.mes.split("-")[1].trim());
  
    listado.value = data;
    if (error) {
      throw error;
    }
  
    const ws = utils.json_to_sheet(listado.value);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Data");
    writeFileXLSX(wb, `${info.value.mes.split("-").join("_")}_${info.value.regiones}.xlsx`);
  };
  
  
  const info = ref({
    regiones: null,
    mes: null
  });
  
  const schema = [
    {
      $el: "h1",
      children: "Descargar reporte mensual",
      attrs: {
        style: {
          "font-size": "1.6rem",
          padding: "0 0 1rem 0",
          "text-align": "center",
          "font-weight": "700",
        },
      },
    },
    {
      $el: "p",
      children: "El siguiente formulario entrega un reporte en formato .xlsx (Excel) de las fiscalizaciones del mes y región que selecciones.",
      attrs: {
        style: {
          "font-size": "1rem",
          padding: "0 0 1rem 0",
          // "text-align": "center",
          "font-weight": "400",
          'text-align': 'justify'
          // 'overflow-wrap': 'break-word'
        },
      },
    },
    {
      $el: "p",
      children: `Sólo debes escribir el número del mes en formato de dos dígitos ("05" para mayo, por ejemplo), y seleccionar la región deseada.`,
      attrs: {
        style: {
          "font-size": "1rem",
          padding: "0 0 1rem 0",
          // "text-align": "center",
          "font-weight": "400",
          'text-align': 'justify'
          // 'overflow-wrap': 'break-word'
        },
      },
    },
    {
      $el: "p",
      children: `Sólo disponible en versión escritorio.`,
      attrs: {
        style: {
          "font-size": "1rem",
          padding: "0 0 1rem 0",
          // "text-align": "center",
          "font-weight": "500",
          'text-align': 'justify'
          // 'overflow-wrap': 'break-word'
        },
      },
    },
    {
      $formkit: "mask",
      name: "mes",
      label: "Escribe el mes",
      mask: `${new Date().getFullYear()} - ##`,
      help: `Formato "${new Date().getFullYear()} - 05", para obtener mayo del presente año`,
      labelClass: "labels",
      classes: {
        input: "bg-blanco",
        help: "textoAzul",
        outer: "espacioVertical",
      },
      validation: "required",
  
    },
  
    {
      $formkit: "select",
      name: "regiones",
      id: "regiones",
      label: "Selecciona la región",
      placeholder: "Escribe el nombre",
      options: regiones,
      labelClass: "labels",
      classes: {
        input: "bg-blanco",
        help: "textoAzul",
        outer: "espacioVertical",
      },
  
    }];
  
  </script>
    
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
    padding-top: .7rem;
    margin: 0 1.3rem 1.3rem 1.3rem;
    display: flex;
    justify-content: center;
  }
  </style>