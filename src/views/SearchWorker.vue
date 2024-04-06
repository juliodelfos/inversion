<script setup>
import { ref } from 'vue';
import { supabase } from "../supabase";
import { useToast } from "vue-toastification";
const toast = useToast();
const valorBusqueda = ref('')
const resultado = ref(null);
const informaError = ref(false);
import Menu from './Menu.vue';

const buscarBenef = async () => {
    try {
        const { data: todes, error } = await supabase
            .from('todes')
            .select('*').eq('RutSDV', valorBusqueda.value)
        resultado.value = todes[0]
        if (error) throw error
    } catch (error) {
        toast.warning(`Error; ${error}`)
    }
}
</script>

<template>
    <Menu></Menu>
    <main class="bg-blue-100 text-[#003D80] px-4 pt-4 pb-7 flex flex-col min-h-screen items-center">
        <div>
            <h1 class="text-[1.8rem] font-bold text-center py-4 leading-normal">Búsqueda</h1>
        </div>

        <section class="w-11/12 sm:w-3/5 md:w-96 lg:w-4/12">
        <!-- Buscador -->
        <div class="pb-8">
 
                <FormKit type="search" placeholder="Ej: 15325987" label="Ingresa RUT de trabajador/a"
                help="Sin guión ni dígito verificador" v-model="valorBusqueda" input-class="bg-blanco" label-class="labels" />


                <button @click="buscarBenef" type="button"
                class="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 rounded text-base px-5 py-2.5 w-[100%]">Buscar</button>
            <!-- </div> -->
        </div>
        
        <!-- Búsqueda exitosa -->
        <div class="overflow-hidden bg-white shadow sm:rounded-lg w-auto" v-if="resultado">
            <div class="px-4 py-5 sm:px-6">
                <h3 class="text-xl font-semibold leading-6 text-[#003D80]">Datos básicos</h3>
                <p class="mt-1 max-w-2xl text-sm text-blue-900">Antes de continuar, asegúrate que la información
                    señalada no presenta errores.</p>
            </div>
            <div class="border-t border-gray-200">
                <dl>
                    <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-semibold text-blue-900">Nombre completo</dt>
                        <dd class="mt-1 text-sm text-[#003D80] sm:col-span-2 sm:mt-0">{{
                            resultado.Nombres + ' ' +
                            resultado.Paterno + ' ' + resultado.Materno
                            }}</dd>
                    </div>
                    <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-semibold text-blue-900">RUT</dt>
                        <dd class="mt-1 text-sm text-[#003D80] sm:col-span-2 sm:mt-0">{{
                            resultado.RUT.charAt(0) == '0' ?
                            resultado.RUT.slice(1) : resultado.RUT
                            }}</dd>
                    </div>
                    <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-semibold text-blue-900">Comuna</dt>
                        <dd class="mt-1 text-sm text-[#003D80] sm:col-span-2 sm:mt-0">{{ resultado.Comuna }}</dd>
                    </div>
                    <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-semibold text-blue-900  ">Ejecutora</dt>
                        <dd class="mt-1 text-sm text-[#003D80] sm:col-span-2 sm:mt-0 capitalize ">{{
                            resultado.Ejecutor
                            }}</dd>
                    </div>
                    <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-semibold text-blue-900">Edad</dt>
                        <dd class="mt-1 text-sm text-[#003D80] sm:col-span-2 sm:mt-0">{{ resultado.Edad }}</dd>
                    </div>
                    <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-semibold text-blue-900">Género</dt>
                        <dd class="mt-1 text-sm text-[#003D80] sm:col-span-2 sm:mt-0">{{
                            resultado.Sexo == 'F' ?
                            'Femenino' : 'Masculino'
                            }}</dd>
                    </div>
                    <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-semibold text-blue-900">Informar error</dt>
                        <dd class="mt-1 text-sm text-[#003D80] sm:col-span-2 sm:mt-0">
        
        
                            <FormKit v-model="informaError" type="toggle" label="¿Hay algún error en la información?"
                                label-class="labels" />
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
        </section>
        <!-- Botones -->
            <section v-if="resultado" class="pt-8 text-center">
                <RouterLink type="button" :to="`/fiscalizacion/${resultado.Region}/${resultado.Nombres}/${resultado.Paterno}/${resultado.Materno}/${resultado.Ejecutor}/${valorBusqueda}?error=${informaError}`"
                    class="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 rounded text-sm px-10 py-3 w-[100%]">
                    Continuar</RouterLink>
            </section>
        </main>
</template>

<style>
.bg-blanco {
    color: #003D80;
    background-color: rgba(255, 255, 255, 0.5);
}

.labels {
    font-size: 1rem;
}

.formkit-wrapper, .formkit-fieldset {
  max-width: 100%;
}
</style>