<template>
    <Panel>
        <form @submit.prevent="onSubmit"></form>
    </Panel>
</template>
<script setup lang="ts">
    import Panel from '~/shared/ui/Panel.vue';
    definePageMeta({
        layout: 'dashboard',
    });

    const onSubmit = () => {};
</script>
