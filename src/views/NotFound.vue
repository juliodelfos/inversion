<template>
    <main
        class="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8 border-red-300 border-2"
    >
        <div class="text-center">
            <p class="text-base font-semibold">404</p>
            <h1
                class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl"
            >
                Página no encontrada
            </h1>
            <p class="mt-6 text-base leading-7 text-gray-600">
                La página que buscabas no existe o tiene algún error.
            </p>
            <div class="mt-10 flex items-center justify-center gap-x-6">
                <router-link to="/">
                    <p
                        class="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                        Volver al inicio
                    </p>
                </router-link>
            </div>
        </div>
    </main>
</template>

<style scoped>
main {
    height: 100vh !important;
    background-color: rgb(225 239 254);
    color: #003d80;
}
</style>
