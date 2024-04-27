<template>
    <li>
        <NuxtLink
            :class="[$style.item, { [$style.active]: isActive }]"
            :to="link"
        >
            <slot />
        </NuxtLink>
    </li>
</template>

<style module>
    .item {
        text-decoration: none;
        color: rgba(0, 0, 0, 0.8);
        border-radius: 6px;
        width: 100%;
        padding: 0.2rem 0.6rem;
        display: flex;
        font-size: 2rem;
        font-weight: 700;
        align-items: center;
        border: 2px solid rgba(0, 0, 0, 0.05);
        gap: 2rem;
        transition: 0.3s ease;
    }
    @media (hover: hover) {
        .item:hover {
            text-decoration: none;
            color: rgba(0, 0, 0);
            background-color: rgba(0, 0, 0, 0.05);
        }
    }
    .item.active,
    .item:active {
        color: rgba(0, 0, 0);
        background-color: rgba(20, 129, 221, 0.1);
    }
</style>

<script setup lang="ts">
    const router = useRoute();
    const props = defineProps<{
        link: string;
    }>();

    const isActive = computed(() => router.path === props.link);
</script>
