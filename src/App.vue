<script setup>
import { ref } from "vue";
import { supabase } from "./supabase";
import { RouterView } from "vue-router";
import { initFlowbite } from "flowbite";
import { onMounted } from "vue";
import { userSessionStore } from "./stores/userSession";

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
    <RouterView />
</template>

<style>
svg {
    display: inline-block;
}
</style>
