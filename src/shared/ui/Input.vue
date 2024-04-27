<template>
    <div :class="$style.container">
        <label :class="$style.label">{{ label }}</label>
        <input :disabled :class="$style.input" :name :type v-model="value" />
        <span :class="$style.error">{{ errorMessage }}</span>
        <!-- <ErrorMessage :class="$style.error" :name /> -->
    </div>
</template>

<style module>
    .container {
        display: grid;
        grid-template-areas:
            'L . .'
            'I I I'
            'E E E';
        gap: 0.5rem;
    }

    .input {
        grid-area: I;
        padding: 0.5rem;
        border-radius: 8px;
        font-size: 1.8rem;
        font-weight: 500;
        border: 2px solid #e6e6e6;
        outline: none;
        transition: outline-color 0.3s ease-in;
    }

    .input:focus-visible,
    .input:active {
        outline: 2px solid v-bind(borderColor);
    }

    .label {
        grid-area: L;
        font-size: 1.8rem;
        font-weight: 300;
        color: rgba(0, 0, 0, 0.5);
    }

    .error {
        grid-area: E;
        color: rgb(255, 68, 51);
        font-size: 1.4rem;
        height: 1.8rem;
        visibility: v-bind(errorMessage);
        transition: visibility 0.3s ease-in;
    }
</style>

<script setup lang="ts">
    import { useField } from 'vee-validate';
    const props = defineProps<{
        name: string;
        type: string;
        label: string;
        disabled?: boolean;
    }>();

    const { value, errorMessage } = useField(() => props.name);
    const borderColor = computed(() =>
        errorMessage.value ? 'rgb(255, 68, 51)' : 'rgb(34, 145, 255)',
    );
</script>
