<template>
    <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
        <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div class="relative flex h-16 items-center justify-between">
                <div
                    class="absolute inset-y-0 left-0 flex items-center sm:hidden"
                >
                    <!-- Mobile menu button-->
                    <DisclosureButton
                        class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    >
                        <span class="absolute -inset-0.5" />
                        <span class="sr-only">Abrir menú</span>
                        <Bars3Icon
                            v-if="!open"
                            class="block h-6 w-6"
                            aria-hidden="true"
                        />
                        <XMarkIcon
                            v-else
                            class="block h-6 w-6"
                            aria-hidden="true"
                        />
                    </DisclosureButton>
                </div>

                <!-- PC -->
                <div
                    class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start"
                >
                    <div class="hidden sm:ml-6 sm:block">
                        <div class="flex space-x-4">
                            <router-link
                                v-for="item in navigation"
                                :key="item.name"
                                :to="item.to"
                                :class="[
                                    item.to == $route.path
                                        ? 'bg-gray-900 text-white'
                                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                    'rounded-md px-3 py-2 text-sm font-medium',
                                ]"
                                :aria-current="
                                    item.current ? 'page' : undefined
                                "
                                >{{ item.name }}</router-link
                            >
                            <button
                                class="flex rounded-md px-5 py-2 text-sm font-medium bg-red-800 text-white align-middle gap-x-1"
                                @click="salir"
                            >
                                <span
                                    ><svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        class="w-4 h-4"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                                        />
                                    </svg>
                                </span>
                                <p class="pb-0">Salir</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <DisclosurePanel class="sm:hidden">
            <div class="space-y-1 px-2 pb-3 pt-2">
                <DisclosureButton
                    v-for="item in navigation"
                    :key="item.name"
                    :as="routerLink"
                    :to="item.to"
                    :class="[
                        item.to == $route.path
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block rounded-md px-3 py-2 text-base font-medium',
                    ]"
                    :aria-current="item.current ? 'page' : undefined"
                    >{{ item.name }}</DisclosureButton
                >
                <button
                    class="ml-3 flex rounded-md px-5 py-2 text-sm font-medium bg-red-800 text-white align-middle gap-x-1"
                    @click="salir"
                >
                    <span
                        ><svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-4 h-4"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                            />
                        </svg>
                    </span>
                    <p class="pb-0">Salir</p>
                </button>
            </div>
        </DisclosurePanel>
    </Disclosure>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { Bars3Icon, XMarkIcon } from "@heroicons/vue/24/outline";
import { supabase } from "@/supabase";
import { resolveComponent, ref } from "vue";
import { userSessionStore } from "../stores/userSession";
import router from "@/router";
const userSession = userSessionStore();

const hideMenu = ref("visible");

if (userSession.email.split("@")[1] !== "mintrab.gob.cl") {
    hideMenu.value = "hidden";
}

const navigation = [
    { name: "Buscar", to: "/buscador", current: null, public: true },
    {
        name: "Descargar informe",
        to: "/descargar-reporte",
        current: null,
        public: true,
    },
    {
        name: "Crear usuario",
        to: "/crear-usuario",
        current: null,
        public: false,
    },
];

const routeToIndexMapping = {
    "/buscador": 0,
    "/descargar-reporte": 1,
    "/crear-usuario": 2,
};

const salir = async () => {
    const { error } = await supabase.auth.signOut({ scope: "local" });
    userSession.session = null;
    if (error) {
        console.error("Error al cerrar sesión", error.message);
    } else {
        router.replace("/");
    }
};

const currentPath = window.location.pathname;

const currentIndex =
    routeToIndexMapping[currentPath] !== undefined
        ? routeToIndexMapping[currentPath]
        : 3;

navigation.forEach((navigationItem, index) => {
    navigationItem.current = index === currentIndex;
});

const routerLink = resolveComponent("router-link");
</script>
