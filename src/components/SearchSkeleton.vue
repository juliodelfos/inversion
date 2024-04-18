<template>
    <section>
        <div class="bg-white">
            <div class="px-4 py-5 sm:px-6">
                <h3 class="text-xl font-semibold leading-6 text-[#003D80]">
                    Datos básicos
                </h3>
                <p class="mt-1 max-w-2xl text-sm text-blue-900">
                    Antes de continuar, asegúrate que la información señalada no
                    presenta errores.
                </p>
            </div>
            <div
                role="status"
                class="p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700"
            >
                <div class="flex items-center py-3">
                    <div class="w-3/12">
                        <div
                            class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 mb-2.5"
                        ></div>
                    </div>
                    <div class="w-1/12">
                        <div class="h-2.5"></div>
                    </div>
                    <div class="w-8/12">
                        <div
                            class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 mb-2.5"
                        ></div>
                    </div>
                </div>
                <div class="flex items-center py-3">
                    <div class="w-3/12">
                        <div
                            class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 mb-2.5"
                        ></div>
                    </div>
                    <div class="w-1/12">
                        <div class="h-2.5"></div>
                    </div>
                    <div class="w-8/12">
                        <div
                            class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 mb-2.5"
                        ></div>
                    </div>
                </div>
                <div class="flex items-center py-3">
                    <div class="w-3/12">
                        <div
                            class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 mb-2.5"
                        ></div>
                    </div>
                    <div class="w-1/12">
                        <div class="h-2.5"></div>
                    </div>
                    <div class="w-8/12">
                        <div
                            class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 mb-2.5"
                        ></div>
                    </div>
                </div>
                <div class="flex items-center py-3">
                    <div class="w-3/12">
                        <div
                            class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 mb-2.5"
                        ></div>
                    </div>
                    <div class="w-1/12">
                        <div class="h-2.5"></div>
                    </div>
                    <div class="w-8/12">
                        <div
                            class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 mb-2.5"
                        ></div>
                    </div>
                </div>
                <div class="flex items-center py-3">
                    <div class="w-3/12">
                        <div
                            class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 mb-2.5"
                        ></div>
                    </div>
                    <div class="w-1/12">
                        <div class="h-2.5"></div>
                    </div>
                    <div class="w-8/12">
                        <div
                            class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 mb-2.5"
                        ></div>
                    </div>
                </div>
                <div class="flex items-center py-3">
                    <div class="w-3/12">
                        <div
                            class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 mb-2.5"
                        ></div>
                    </div>
                    <div class="w-1/12">
                        <div class="h-2.5"></div>
                    </div>
                    <div class="w-8/12">
                        <div
                            class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 mb-2.5"
                        ></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="py-3 rounded shadow bg-white mt-1">
            <p class="text-red-700 text-center">
                No se ha encontrado el RUT {{ rut }}. Revisa que se encuentre
                bien escrito.
            </p>
        </div>
    </section>
</template>

<script setup>
defineProps({
    rut: String || Number,
});
</script>
