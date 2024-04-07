<template>
    <!--
  FormKit forms auto-collect values of children inputs.
  Wrap the example in a form so we can display the form values.
-->
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
</template>
