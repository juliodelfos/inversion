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
                                v-for="item in cutNavbar"
                                :key="item.name"
                                :to="item.to"
                                class="rounded-md px-3 py-2 text-sm font-medium"
                                :class="[
                                    item.to == $route.path
                                        ? `${currentPathClasses}`
                                        : `${notCurrentPathClasses}`,
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
                                <p>Salir</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <DisclosurePanel class="sm:hidden">
            <div class="space-y-1 px-2 pb-3 pt-2">
                <DisclosureButton
                    v-for="item in cutNavbar"
                    :key="item.name"
                    :as="routerLink"
                    :to="item.to"
                    :class="[
                        item.to == $route.path
                            ? `bg-gray-900 text-white ${item.hidden}`
                            : `text-gray-300 hover:bg-gray-700 hover:text-white ${item.hidden}`,
                        `block rounded-md px-3 py-2 text-base font-medium`,
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
                    <p>Salir</p>
                </button>
            </div>
        </DisclosurePanel>
    </Disclosure>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { Bars3Icon, XMarkIcon } from "@heroicons/vue/24/outline";
import { supabase } from "@/supabase";
import { resolveComponent, computed } from "vue";
import { useRoute } from "vue-router";
import { userSessionStore } from "../stores/userSession";
import router from "@/router";
const userSession = userSessionStore();

const route = useRoute();

const currentPathClasses = "bg-gray-900 text-white";
const notCurrentPathClasses =
    "text-gray-300 hover:bg-gray-700 hover:text-white";

// let algo = navigation.forEach((i) => {
//     // Usuario es admin y está en ruta
//     if (email.split("@")[1] == "mintrab.gob.cl" && i.name == route.name) {
//         currentPathClasses2.value = "bg-gray-900 text-white";
//     }
//     // Usuario es admin y no está en ruta
//     else if (email.split("@")[1] == "mintrab.gob.cl" && i.name !== route.name) {
//         notCurrentPathClasses2.value =
//             "text-gray-300 hover:bg-gray-700 hover:text-white ";
//     }
//     // Usuario no es admin y está en ruta
//     else if (email.split("@")[1] !== "mintrab.gob.cl" && i.name == route.name) {
//         currentPathClasses2.value = "bg-gray-900 text-white hidden";
//     }
//     // Usuario no es admin y no está en ruta
//     else if (
//         email.split("@")[1] !== "mintrab.gob.cl" &&
//         i.name !== route.name
//     ) {
//         notCurrentPathClasses2.value =
//             "text-gray-300 hover:bg-gray-700 hover:text-white hidden";
//     }
// });

// const currentPathClasses2 = ref(null);
// const notCurrentPathClasses2 = ref(null);

const navigation = [
    { name: "Buscar", to: "/buscador", current: null, class: null },
    {
        name: "Descargar informe",
        to: "/descargar-reporte",
        current: null,
        class: null,
    },
    {
        name: "Crear usuario",
        to: "/crear-usuario",
        current: null,
        class: null,
    },
];

const cutNavbar = computed(() => {
    if (userSession.email.split("@")[1] !== "mintrab.gob.cl") {
        // return navigation.splice(0, 2);
        const noAdminNav = [
            { name: "Buscar", to: "/buscador", current: null, class: null },
            {
                name: "Descargar informe",
                to: "/descargar-reporte",
                current: null,
                class: null,
            },
        ];

        return noAdminNav;
    } else {
        const adminNav = [
            { name: "Buscar", to: "/buscador", current: null, class: null },
            {
                name: "Descargar informe",
                to: "/descargar-reporte",
                current: null,
                class: null,
            },
            {
                name: "Crear usuario",
                to: "/crear-usuario",
                current: null,
                class: null,
            },
        ];
        return adminNav;
    }
});

const routeToIndexMapping = {
    "/buscador": 0,
    "/descargar-reporte": 1,
    "/crear-usuario": 2,
};

const salir = async () => {
    const { error } = await supabase.auth.signOut({ scope: "local" });
    userSession.session = null;
    userSession.email = "mail@ejemplo.cl";
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
