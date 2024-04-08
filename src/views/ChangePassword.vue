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
                        ¿Olvidaste tu contraseña?
                    </h1>
                    <form
                        class="space-y-4 md:space-y-6"
                        @submit.prevent="updatePassword"
                    >
                        <div>
                            <label
                                for="password"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >Nueva contraseña</label
                            >
                            <input
                                v-model="pass"
                                type="password"
                                name="password"
                                id="password"
                                placeholder="••••••••"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required=""
                            />
                        </div>
                        <div>
                            <label
                                for="password"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >Ingresar nuevamente</label
                            >
                            <input
                                v-model="pass_check"
                                type="password"
                                name="password"
                                id="password_check"
                                placeholder="••••••••"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required=""
                            />
                        </div>

                        <button
                            v-if="!passSended"
                            type="submit"
                            class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        >
                            Cambiar contraseña
                        </button>

                        <div v-else>
                            <button
                                disabled
                                class="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                            >
                                ✓ Contraseña cambiada
                            </button>
                            <p class="text-sm text-gray-700 pt-4">
                                Serás redirigida/o a la página de inicio
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from "vue";
import { supabase } from "../supabase";
import router from "../router/index";

const pass = ref("");
const pass_check = ref("");
const refresh_token = ref(window.location.hash.split("&")[3].split("=")[1]);
const passSended = ref(false);

const updatePassword = async () => {
    try {
        // Refresh session only if necessary
        // if (!supabase.auth.session()) {
        await supabase.auth.refreshSession({
            refresh_token: refresh_token.value,
        });
        // }

        // Validate passwords thoroughly
        if (pass.value !== pass_check.value) {
            throw new Error("Las contraseñas no coinciden"); // Specific error message
        }

        // Ensure password strength
        // if (!isPasswordStrong(pass.value)) {
        //   throw new Error("La contraseña debe ser más segura"); // Guide for password strength
        // }

        // Update user with password
        const { data, error } = await supabase.auth.updateUser({
            password: pass_check.value,
        });

        // Handle success
        if (data) {
            setTimeout(() => {
                // Immediate feedback
                passSended.value = true;
            }, 1000);

            setTimeout(() => {
                // Redirect to login page
                router.push("/");
            }, 5000);
        }

        // Handle errors gracefully
        if (error) {
            console.error("Error updating password:", error);
            alert(
                "Error al actualizar la contraseña. Por favor, inténtelo de nuevo.",
            );
        }
    } catch (error) {
        console.error("Error in updatePassword:", error);
        alert("Error:", error.message);
    }
};
</script>
