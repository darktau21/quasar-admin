<template>
    <ul :class="$style.menu">
        <slot />
    </ul>
</template>
<style module>
    .menu {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 2rem;
        list-style: none;
        align-items: stretch;
        border-right: 2px solid rgb(0, 0, 0, 0.5);
        height: 100%;
    }
</style>
