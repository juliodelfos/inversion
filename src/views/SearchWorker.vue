<script setup>
// Imports
import { ref } from "vue";
import { FwbInput, FwbButton } from "flowbite-vue";
import { searchWorkerByRut } from "../functions/searchWorkerByRUT";
import { fromObject2Array } from "../functions/fromObject2Array";
import SearchSkeleton from "@/components/SearchSkeleton.vue";

// Variables
const rutSinDV = ref("");
const resultado = ref(null);
const informaError = ref(false);
const WORKER = ref(null);
let searching = false;

//Functions
async function searchByRut(rutSinDV) {
    try {
        searching = false;
        const res = await searchWorkerByRut(rutSinDV);
        resultado.value = res;
        WORKER.value = fromObject2Array(res);
    } catch (error) {
        searching = true;
        console.error("Error buscando RUT beneficiaria/o");
    }
}
</script>

<template>
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

        <section class="w-11/12 sm:w-3/5 md:w-96 lg:w-3/6">
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
                        <fwb-button @click="searchByRut(rutSinDV)"
                            >Buscar</fwb-button
                        >
                    </template>
                </fwb-input>
            </div>

            <!-- Buscador -->
            <SearchSkeleton v-show="searching" :rut="rutSinDV" />

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
                        Antes de continuar, asegúrate que la información
                        señalada no presenta errores.
                    </p>
                </div>

                <!-- Trabajador encontrado -->
                <div class="border-t border-gray-200">
                    <dl>
                        <div
                            class="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                            v-for="w in WORKER"
                            :key="w.rutSinDV"
                        >
                            <dt class="text-sm font-semibold text-blue-900">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="icon icon-tabler icons-tabler-outline"
                                    :class="w.iconClass"
                                    v-html="w.path"
                                ></svg>
                                {{ w.tag }}
                            </dt>
                            <dd
                                class="mt-1 text-sm text-[#003D80] sm:col-span-2 sm:mt-0"
                            >
                                {{ w.value }}
                            </dd>
                        </div>

                        <!-- Reportar error -->
                        <div
                            class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                        >
                            <dt class="text-sm font-semibold text-blue-900">
                                Informar error
                            </dt>
                            <dd
                                class="mt-1 text-sm text-[#003D80] sm:col-span-2 sm:mt-0"
                            >
                                <FormKit
                                    label="¿Hay algún error en la información?"
                                    type="toggle"
                                    value-label-display="hidden"
                                    v-model="informaError"
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
                :href="`/encuesta/${resultado.Region}/${resultado.Comuna}/${resultado.Nombres}/${resultado.Paterno}/${resultado.Materno}/${resultado.Ejecutor}/${rutSinDV}?error=${informaError}`"
                tag="router-link"
                pill
                >Continuar</fwb-button
            >
        </div>
    </main>
</template>
