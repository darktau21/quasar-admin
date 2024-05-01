<template>
    <Panel v-if="team.length < 20">
        <Heading>Добавить члена команды</Heading>
        <TeammateForm @teammate-added="execute" />
    </Panel>
    <Panel>
        <Heading>Члены команды</Heading>
        <Panel v-if="team.length" v-for="data in team">
            <TeammateForm
                @teammate-added="execute"
                :key="data.id"
                :initial="{
                    id: data.id,
                    quote: data.quote ?? undefined,
                    name: data.name,
                    description: data.description,
                    tags: data.tags,
                    imageUrl: data.imageUrl,
                }"
            />
        </Panel>
        <div v-else :class="$style.notFound">Нет результатов</div>
    </Panel>
</template>
<script setup lang="ts">
    import Panel from '~/shared/ui/Panel.vue';
    import TeammateForm from '~/components/TeammateForm.vue';
    import Heading from '~/shared/ui/Heading.vue';
    import type { Teammate } from '~/shared/schemas';
    import type { z } from 'zod';
    import { useToast } from 'vue-toast-notification';
    definePageMeta({
        layout: 'dashboard',
    });
    const $toast = useToast();

    // const team = ref<z.infer<typeof Teammate>[]>([]);
    const handleError = () =>
        $toast.error('Ошибка запроса', { position: 'top' });
    const { data: resp, execute } = await useFetch(() => '/api/team', {
        onRequestError: handleError,
        onResponseError: handleError,
        cache: 'no-cache',
    });

    const team = computed(() => resp.value?.data ?? []);
</script>

<style module>
    .notFound {
        padding: 1rem;
        font-size: 2rem;
        font-weight: 500;
        color: rgb(255, 68, 51);
        text-align: center;
    }
</style>
