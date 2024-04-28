<template>
    <button
        :disabled="isDisabled"
        :class="[
            $style.button,
            {
                [$style.submitting]: props.state === 'submitting',
                [$style.success]: props.state === 'success',
                [$style.error]: props.state === 'error',
            },
        ]"
    >
        <slot />
    </button>
</template>

<style module>
    .button {
        font-size: 1.8rem;
        padding: 0.4rem 1rem;
        border-radius: 8px;
        border: none;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        background-color: #1e90ff;
        color: #e6e6e6;
        font-weight: 600;
        cursor: pointer;
        transition: 0.3s ease-in;
    }
    .button:disabled {
        cursor: not-allowed;
    }
    .button:hover:not(:disabled) {
        opacity: 0.8;
    }

    .submitting {
        background-color: #ffbf00;
    }

    .success {
        background-color: #228b22;
    }

    .error {
        background-color: #c21807;
    }
</style>

<script setup lang="ts">
    const props = withDefaults(
        defineProps<{
            state?: 'idle' | 'submitting' | 'error' | 'success';
        }>(),
        {
            state: 'idle',
        },
    );

    const isDisabled = computed(() => props.state !== 'idle');
</script>
