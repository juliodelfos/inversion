<template>
  <section class="bg-gray-100 dark:bg-gray-900">
    <div
      class="flex flex-col items-center justify-center mx-auto md:h-screen lg:py-0"
    >
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
          >
            Ingresa tu correo electrónico
          </h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="enviarMail">
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Tu correo electrónico</label
              >
              <input
                type="email"
                name="email"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="nombre@ejemplo.com"
                required=""
                v-model="email"
                autocomplete="on"
              />
            </div>

            <button
              type="submit"
              class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              v-if="!mailSended"
            >
              Enviar correo de recuperación
            </button>
            <button
              v-else
              disabled
              class="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              ✓ Correo enviado
            </button>
          </form>
          <router-link to="/">
            <p
              class="text-center text-primary-600 font-light text-sm pt-4 hover:underline dark:text-primary-500"
            >
              Regresar
            </p>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { sendRecoveryMail } from "../functions/sendRecoveryMail";

const email = ref("");
const mailSended = ref(false);

const enviarMail = async () => {
  try {
    await sendRecoveryMail(email.value);
    // setTimeout(() => {
    //     mailSended.value = true;
    // }, 1000);
  } catch (error) {
    console.log(error);
  }
};
</script>
