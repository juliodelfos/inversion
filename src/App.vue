<script setup>
import { ref, watch } from "vue";
import { supabase } from "./supabase";
import { RouterView } from "vue-router";
import { initFlowbite } from "flowbite";
import { onMounted } from "vue";
import Menu from "./components/Menu.vue";
import router from "./router";
// Se importa estado global de Pinia
import { userSessionStore } from "./stores/userSession";

// Se llama al estado de Pinia
const userSession = userSessionStore();

// Y se le almacena la sesión de usuario
supabase.auth.onAuthStateChange((event, session) => {
    userSession.session = session;
});

// Si es la página inicial o 404, no se muestra nav
watch(
    () => router.currentRoute.value.name,
    (to) => {
        if (to !== "login" && to !== "not-found") {
            show.value = true;
        } else {
            show.value = false;
        }
    },
);

let show = ref(false);

onMounted(() => {
    initFlowbite();
});
</script>

<template>
    <Menu v-show="show"></Menu>
    <RouterView />
</template>

<style>
svg {
    display: inline-block;
}
</style>
