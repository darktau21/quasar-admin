<template>
    <Panel v-if="team.length < 20">
        <Heading>Добавить члена команды</Heading>
        <TeammateForm @teammate-added="execute" />
    </Panel>
    <Panel>
        <Heading>Члены команды</Heading>
        <Panel v-for="data in team" v-if="team.length">
            <TeammateForm
                :initial="{
                    id: data.id,
                    quote: data.quote ?? undefined,
                    name: data.name,
                    description: data.description,
                    tags: data.tags,
                    imageUrl: data.imageUrl,
                }"
                :key="data.id"
                @teammate-added="execute"
            />
        </Panel>
        <div v-else :class="$style.notFound">Нет результатов</div>
    </Panel>
</template>
<script setup lang="ts">
    import { useToast } from 'vue-toast-notification';

    import TeammateForm from '~/components/TeammateForm.vue';
    import Heading from '~/shared/ui/Heading.vue';
    import Panel from '~/shared/ui/Panel.vue';
    definePageMeta({
        layout: 'dashboard',
    });
    const $toast = useToast();

    // const team = ref<z.infer<typeof Teammate>[]>([]);
    const handleError = () =>
        $toast.error('Ошибка запроса', { position: 'top' });
    const { data: resp, execute } = await useFetch(() => '/api/team', {
        cache: 'no-cache',
        onRequestError: handleError,
        onResponseError: handleError,
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
