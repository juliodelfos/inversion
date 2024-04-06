<script setup>
// Imports
import { ref, defineEmits } from "vue";
import { FwbInput, FwbButton, FwbToggle } from "flowbite-vue";
import Persona from "@/components/svg/Persona.vue";
import RUT from "@/components/svg/RUT.vue";
import City from "@/components/svg/City.vue";
import Company from "@/components/svg/Company.vue";
import Age from "@/components/svg/Age.vue";
import Woman from "@/components/svg/Woman.vue";
import Men from "@/components/svg/Men.vue";
import { searchWorkerByRut } from "../functions/searchWorkerByRUT";
// import Menu from './Menu.vue';

// Variables
const rutSinDV = ref("");
const resultado = ref(null);
const informaError = ref(false);
// const ICONS = [Persona, RUT, City, Company, Age, Woman, Men];
// const WORKER = [];

// [
//   {
//     nombre: `${data.Nombres} ${data.Paterno} ${data.Materno}`,
//     icon: Persona,
//   },
//   {
//     rut: `${data.RUT.charAt(0) == "0" ? data.RUT.slice(1) : resultado.RUT}`,
//     icon: RUT,
//   },
//   { comuna: `${data.Comuna}`, icon: City },
//   { ejecutor: `${data.Ejecutor}`, icon: Company },
//   { edad: `${data.Edad}`, icon: Age },
//   {
//     genero: `${data.Sexo == "F" ? "Femenino" : "Masculino"}`,
//     icon: Woman,
//   },
// ];

//Functions
const searchByRut = (rutSinDV) =>
  searchWorkerByRut(rutSinDV).then((res) => (resultado.value = res));

// Otros
defineEmits(["rut", "error"]);
</script>

<template>
  <!-- <Menu></Menu> -->
  <main
    class="bg-blue-100 text-[#003D80] px-4 pt-4 pb-7 flex flex-col min-h-screen items-center"
  >
    <div>
      <h1
        class="sm:text-[1.2rem] md:text-[1.4rem] font-bold text-center py-4 leading-normal"
      >
        Búsqueda de beneficiaria/o
      </h1>
    </div>

    <section class="w-11/12 sm:w-3/5 md:w-96 lg:w-4/12">
      <!-- Buscador -->
      <div class="pb-8">
        <fwb-input
          v-model="rutSinDV"
          label="RUT sin dígito verificador"
          placeholder="Ej: 15325987"
          size="lg"
        >
          <template #prefix>
            <svg
              aria-hidden="true"
              class="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              />
            </svg>
          </template>
          <template #suffix>
            <fwb-button @click="searchByRut(rutSinDV)">Buscar</fwb-button>
          </template>
        </fwb-input>
      </div>

      <!-- Datos personales -->
      <div
        class="overflow-hidden bg-white shadow sm:rounded-lg w-auto"
        v-if="resultado"
      >
        <div class="px-4 py-5 sm:px-6">
          <h3 class="text-xl font-semibold leading-6 text-[#003D80]">
            Datos básicos
          </h3>
          <p class="mt-1 max-w-2xl text-sm text-blue-900">
            Antes de continuar, asegúrate que la información señalada no
            presenta errores.
          </p>
        </div>

        <div class="border-t border-gray-200">
          <dl>
            <!-- Nombre -->
            <div class="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-semibold text-blue-900">
                <Persona />
                Nombre completo
              </dt>
              <dd class="mt-1 text-sm text-[#003D80] sm:col-span-2 sm:mt-0">
                {{
                  resultado.Nombres +
                  " " +
                  resultado.Paterno +
                  " " +
                  resultado.Materno
                }}
              </dd>
            </div>

            <!-- RUT -->
            <div
              class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
            >
              <dt class="text-sm font-semibold text-blue-900"><RUT /> RUT</dt>
              <dd class="mt-1 text-sm text-[#003D80] sm:col-span-2 sm:mt-0">
                {{
                  resultado.RUT.charAt(0) == "0"
                    ? resultado.RUT.slice(1)
                    : resultado.RUT
                }}
              </dd>
            </div>

            <!-- Comuna -->
            <div
              class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
            >
              <dt class="text-sm font-semibold text-blue-900">
                <City /> Comuna
              </dt>
              <dd class="mt-1 text-sm text-[#003D80] sm:col-span-2 sm:mt-0">
                {{ resultado.Comuna }}
              </dd>
            </div>

            <!-- Comuna -->
            <div
              class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
            >
              <dt class="text-sm font-semibold text-blue-900">
                <Company /> Ejecutora
              </dt>
              <dd
                class="mt-1 text-sm text-[#003D80] sm:col-span-2 sm:mt-0 capitalize"
              >
                {{ resultado.Ejecutor }}
              </dd>
            </div>

            <!-- Edad -->
            <div
              class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
            >
              <dt class="text-sm font-semibold text-blue-900"><Age /> Edad</dt>
              <dd class="mt-1 text-sm text-[#003D80] sm:col-span-2 sm:mt-0">
                {{ resultado.Edad }}
              </dd>
            </div>

            <!-- Género -->
            <div
              class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
            >
              <dt class="text-sm font-semibold text-blue-900">
                <span v-if="resultado.Sexo == 'F'"><Woman /></span>
                <span v-else><Men /></span>
                Género
              </dt>
              <dd class="mt-1 text-sm text-[#003D80] sm:col-span-2 sm:mt-0">
                {{ resultado.Sexo == "F" ? "Femenino" : "Masculino" }}
              </dd>
            </div>

            <!-- Error -->
            <div
              class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
            >
              <dt class="text-sm font-semibold text-blue-900">
                Informar error
              </dt>
              <dd class="mt-1 text-sm text-[#003D80] sm:col-span-2 sm:mt-0">
                <fwb-toggle
                  v-model="informaError"
                  label="¿Hay algún error en la información?"
                />
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>

    <!-- Botones -->
    <div class="pt-7 text-center" v-if="resultado">
      <fwb-button
        class="w-[100%] py-4 px-10"
        size="xl"
        color="default"
        :href="`/fiscalizacion/${resultado.Region}/${resultado.Nombres}/${resultado.Paterno}/${resultado.Materno}/${resultado.Ejecutor}/${rutSinDV}?error=${informaError}`"
        tag="router-link"
        pill
        >Continuar</fwb-button
      >
    </div>
  </main>
</template>
