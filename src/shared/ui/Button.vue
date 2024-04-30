<template>
    <button
        type="button"
        :class="[
            $style.item,
            $attrs.class,
            { [$style.danger]: props.variant === 'danger' },
        ]"
    >
        <slot />
    </button>
</template>

<script setup lang="ts">
    const props = withDefaults(
        defineProps<{
            variant?: 'default' | 'danger';
        }>(),
        { variant: 'default' },
    );
    const $attrs = useAttrs();
</script>

<style module>
    .item {
        text-decoration: none;
        color: rgba(0, 0, 0, 0.8);
        border-radius: 6px;
        padding: 0.2rem 0.6rem;
        font-size: 2rem;
        font-weight: 700;
        border: 2px solid rgba(0, 0, 0, 0.05);
        gap: 2rem;
        transition: 0.3s ease;
        background-color: rgba(0, 0, 0, 0.05);
        cursor: pointer;
    }
    @media (hover: hover) {
        .item:hover {
            color: rgba(0, 0, 0);
            background-color: rgba(0, 0, 0, 0.05);
        }
        .item.danger:hover {
            text-decoration: none;
            color: rgb(230, 230, 230);
            background-color: rgba(194, 24, 7, 0.8);
        }
    }
    .item:active {
        color: rgba(0, 0, 0);
        background-color: rgba(20, 129, 221, 0.1);
    }
    .item.danger:active {
        color: rgb(201, 199, 199);
        background-color: rgba(194, 24, 7);
    }
</style>
