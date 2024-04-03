<template>
    <main class="p-6">
      <h1 class="text-xl font-bold pb-6">Crear usuarios externos</h1>
      <form
        action=""
        class="grid grid-cols-1 gap-y-4"
        @submit.prevent="createUser"
      >
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
          v-model="password"
          placeholder="••••••••"
          label="Asignar contraseña"
          type="password"
          name="password"
          id="password"
          required
          autocomplete="off"
        />
  
        <fwb-select
          v-model="ejecutor"
          :options="ejecutores"
          label="Elegir institución"
          placeholder="Selecciona una institución"
        />
        <button
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Enviar
        </button>
      </form>
    </main>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { FwbInput, FwbSelect } from "flowbite-vue";
//   import { getEjecutores } from "../utils/db/getEjecutores";
  import { supabase } from "../supabase";
  
  const first_name = ref("");
  const last_name = ref("");
  const email = ref("");
  const password = ref("");
  const ejecutor = ref("");
  
  const ejecutores = ref([]);
  
//   onMounted(() => {
//     getEjecutores().then((data) => {
//       ejecutores.value = data.map((e) => ({ value: e.uuid, name: e.nombre }));
//     });
//   });
  
  const createUser = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        data: {
          first_name: first_name.value,
          last_name: last_name.value,
          ejecutor: ejecutor.value,
          role_: "ejecutor",
        },
      },
    });
    await supabase
      .from("profiles")
      .update({
        full_name: `${first_name.value} ${last_name.value}`,
        email: email.value,
        role: "ejecutor",
      })
      .eq("id", data.user.id);
    if (error) {
      throw new Error(error.message);
    }
    console.log(data);
    return data;
  };
  </script>