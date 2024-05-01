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
    import NewsForm from '~/components/NewsForm.vue';
    import Heading from '~/shared/ui/Heading.vue';
    import Panel from '~/shared/ui/Panel.vue';
    definePageMeta({
        layout: 'dashboard',
    });
</script>
