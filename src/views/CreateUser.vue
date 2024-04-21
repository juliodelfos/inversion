<template>
    <main class="p-6 bg-blue-100 text-[#003D80] dark:bg-gray-900 h-screen">
        <section class="grid grid-cols-1 md:grid-cols-4">
            <div></div>
            <div class="col-span-2">
                <form @submit.prevent="createUser" class="gap-y-4 grid">
                    <h1 class="text-xl font-bold pb-4">Crear usuario</h1>
                    <fwb-input
                        placeholder="Nombres"
                        v-model="first_name"
                        label="Nombres"
                        required
                        autocomplete="on"
                    />

                    <fwb-input
                        v-model="last_name"
                        placeholder="Apellidos"
                        label="Apellidos"
                        autocomplete="on"
                        required
                    />

                    <fwb-select
                        v-model="role"
                        placeholder="Rol / Empleador"
                        label="Seleccionar rol"
                        required
                        :options="roles"
                    />

                    <fwb-input
                        v-model="email"
                        placeholder="correo@ejemplo.cl"
                        label="Correo electrónico"
                        type="email"
                        name="email"
                        id="email"
                        required
                        autocomplete="off"
                    />
                    <fwb-input
                        placeholder="••••••••"
                        v-model="password"
                        label="Asignar contraseña"
                        required
                        autocomplete="off"
                        name="password"
                        id="password"
                    />

                    <button
                        type="submit"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Enviar
                    </button>
                </form>
            </div>
            <div></div>
        </section>
    </main>
</template>

<script setup>
import { ref } from "vue";
import { FwbInput, FwbSelect } from "flowbite-vue";
import { supabase } from "../supabase";
import { useToast } from "vue-toastification";

const first_name = ref("");
const last_name = ref("");
const email = ref("");
const password = ref("");
const role = ref("");
const toast = useToast();

const roles = ref([
    { name: "Administrador sistema", value: "admin" },
    { name: "Institución pública", value: "ejecutor_publico" },
    {
        name: "Institución privada",
        value: "ejecutora_privada",
    },
]);

const createUser = async () => {
    const { data, error } = await supabase.auth.signUp({
        email: email.value,
        password: password.value,
        options: {
            data: {
                first_name: first_name.value,
                last_name: last_name.value,
            },
        },
    });
    await supabase
        .from("users")
        .update({
            full_name: `${first_name.value} ${last_name.value}`,
            role: role.value,
        })
        .eq("id", data.user.id);
    if (error) {
        toast.error("Error al crear usuario");
        throw new Error(error.message);
    }
    toast.success(`Usuario ${data.user.email} creado correctamente`);
    first_name.value = "";
    last_name.value = "";
    email.value = "";
    password.value = "";
    role.value = "";
    return data;
};
</script>
