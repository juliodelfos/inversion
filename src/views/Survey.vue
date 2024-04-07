<template>
  <main
    class="bg-blue-100 grid h-auto place-items-center text-[#003D80] px-4 pt-4 pb-7"
  >
    <FormKit type="form" #default="{ value }" :actions="false">
      <FormKit type="rating" step="0.5" name="ratingLaCasa">
        <template #label="context">
          <label :class="context.classes.label"
            >Rate your stay at <em>La Casa Madrigal</em></label
          >
        </template>
      </FormKit>
      <pre wrap>{{ value }}</pre>
    </FormKit>
  </main>
</template>

<script setup>
import { ref } from "vue";

const preguntas = [
  {
    id: 1,
    pregunta:
      "¿Qué tan satisfecho se encuentra con la atención recibida por el ejecutor del programa durante el periodo 2024?",
    // tipo: 'rating',
    // opciones: ['1', '2', '3', '4', '5'],
    // respuesta: null,
  },
  {
    id: 2,
    pregunta:
      "¿Qué tan satisfecho se encuentra respecto al cumplimiento del objetivo por el cuál ingreso al programa (Empleo directo/Inserción laboral)?",
    // tipo: 'rating',
    // opciones: ['1', '2', '3', '4', '5'],
    // respuesta: null,
  },
  {
    id: 3,
    pregunta:
      "¿Qué tan satisfecho se encuentra con su participación en el Programa (el Programa ha sido lo que esperaba)?",
    // tipo: 'rating',
    // opciones: ['1', '2', '3', '4', '5'],
    // respuesta: null,
  },
];
</script>
