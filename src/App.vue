<script setup>
import { ref } from "vue";
import { supabase } from "./supabase";
import { RouterView } from "vue-router";
import { initFlowbite } from "flowbite";
import { onMounted } from "vue";
import { userSessionStore } from "./stores/userSession";
import Menu from "./components/Menu.vue";
import router from "./router";
import { onBeforeMount } from "vue";

const ruta = router.afterEach((to, from) =>
    to.name !== "login" ? (show.value = true) : (show.value = false),
);

let show = ref(false);

// const ruta = router.currentRoute.value.name;

const userSession = userSessionStore();

let session = ref("");

supabase.auth.onAuthStateChange((event, session) => {
    userSession.session = session;
});

onBeforeMount(() => {
    console.log(`ruta: ${ruta}`);
});

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
