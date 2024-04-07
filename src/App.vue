<script setup>
import { RouterView } from "vue-router";
import { initFlowbite } from "flowbite";
import { onMounted } from "vue";

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
