<template>
    <Panel>
        <Heading>Новость 1</Heading>
        <NewsForm :id="1" />
    </Panel>
    <Panel>
        <Heading>Новость 2</Heading>
        <NewsForm :id="2" />
    </Panel>
</template>
<script setup lang="ts">
    import Panel from '~/shared/ui/Panel.vue';
    import Heading from '~/shared/ui/Heading.vue';
    import NewsForm from '~/components/NewsForm.vue';
    definePageMeta({
        layout: 'dashboard',
    });
</script>
