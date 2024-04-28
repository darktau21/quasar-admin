<template>
    <div :class="$style.panel">
        <slot />
    </div>
</template>

<style module>
    .panel {
        border: 2px solid #e6e6e6;
        border-radius: 8px;
        padding: 1.5rem;
    }
</style>
