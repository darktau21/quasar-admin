<template>
    <h1 :class="$style.heading">
        <slot />
    </h1>
</template>

<style module>
    .heading {
        color: rgba(0, 0, 0, 0.8);
    }
</style>
