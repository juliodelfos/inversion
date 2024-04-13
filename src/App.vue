<script setup>
import { ref, watch } from "vue";
import { supabase } from "./supabase";
import { RouterView } from "vue-router";
import { initFlowbite } from "flowbite";
import { onMounted } from "vue";
import { userSessionStore } from "./stores/userSession";
import Menu from "./components/Menu.vue";
import router from "./router";
import { onBeforeMount } from "vue";


watch(
    () => router.currentRoute.value.name,
    (to) => {
        if (to !== "login" && to !== "not-found") {
            show.value = true;
        } else {
            show.value = false;
        }
    }
);


let show = ref(false);

// const ruta = router.currentRoute.value.name;

const userSession = userSessionStore();

let session = ref("");

supabase.auth.onAuthStateChange((event, session) => {
    userSession.session = session;
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
