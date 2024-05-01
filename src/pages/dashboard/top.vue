<template>
    <Panel v-if="team.length < 20">
        <Heading>Добавить победителя</Heading>
        <WinnerForm @winner-added="execute" />
    </Panel>
    <Panel>
        <Heading>Победители</Heading>
        <Panel v-if="team.length" v-for="data in team">
            <WinnerForm
                @winner-added="execute"
                :key="data.id"
                :initial="{
                    id: data.id,
                    review: data.review ?? '',
                    name: data.name,
                    description: data.description,
                    medals: data.medals,
                    imageUrl: data.imageUrl,
                }"
            />
        </Panel>
        <div v-else :class="$style.notFound">Нет результатов</div>
    </Panel>
</template>
<script setup lang="ts">
    import Panel from '~/shared/ui/Panel.vue';
    import Heading from '~/shared/ui/Heading.vue';
    import { useToast } from 'vue-toast-notification';
    import WinnerForm from '~/components/WinnerForm.vue';
    definePageMeta({
        layout: 'dashboard',
    });
    const $toast = useToast();

    // const team = ref<z.infer<typeof Teammate>[]>([]);
    const handleError = () =>
        $toast.error('Ошибка запроса', { position: 'top' });
    const { data: resp, execute } = await useFetch(() => '/api/top', {
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
