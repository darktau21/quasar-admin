<template>
    <form :class="$style.form" @submit="onSubmit">
        <input name="id" v-model="id" hidden />
        <Input
            v-model="title"
            label="Заголовок"
            name="title"
            type="text"
            :error="errors.title"
        />
        <TextArea
            label="Содержание"
            name="content"
            v-model="content"
            :error="errors.content"
        />
        <span>Дата последнего обновления: {{ updatedAt }}</span>
        <Submit :state="buttonState">Обновить</Submit>
    </form>
</template>
<script setup lang="ts">
    import Input from '~/shared/ui/Input.vue';
    import TextArea from '~/shared/ui/TextArea.vue';
    import Submit from '~/shared/ui/Submit.vue';
    import { toTypedSchema } from '@vee-validate/zod';
    import { useForm } from 'vee-validate';
    import { News } from '~/shared/schemas';
    import { useToast } from 'vue-toast-notification';
    const validationSchema = toTypedSchema(News);
    const $toast = useToast();

    const props = defineProps<{ id: number }>();
    const {
        handleSubmit,
        errors,
        defineField,
        setValues,
        isSubmitting,
        setErrors,
        meta,
    } = useForm({
        validationSchema,
    });
    const [id] = defineField('id');
    const [title] = defineField('title');
    const [content] = defineField('content');
    const isSuccess = ref(false);
    const updatedAt = ref('');

    const updateNews = async () => {
        const { data } =
            (await $fetch(`/api/news/${props.id}`, {
                method: 'GET',
            })) ?? {};
        if (data) {
            setValues(data);
            // updatedAt.value = Intl.DateTimeFormat('ru').format(
            //     Date.parse(data.updatedAt),
            // );
            updatedAt.value = data.updatedAt;
        }
    };

    const onSubmit = handleSubmit(
        async (values: { title: string; content: string }) => {
            const notification = $toast.warning('Обновление новости', {
                position: 'top',
            });
            try {
                await $fetch('/api/news', {
                    method: 'PATCH',
                    body: values,
                });
                $toast.success('Успешно обновлено', { position: 'top' });
                isSuccess.value = true;
                setTimeout(() => {
                    isSuccess.value = false;
                }, 3000);
            } catch {
                $toast.error('Ошибка обновления', {
                    position: 'top',
                });
                setErrors({ id: 'Ошибка обновления' });
                setTimeout(() => {
                    setErrors({
                        id: undefined,
                    });
                }, 3000);
            } finally {
                updateNews();
                notification.dismiss();
            }
        },
    );

    const buttonState = computed(() =>
        isSubmitting.value
            ? 'submitting'
            : !meta.value.valid
              ? 'error'
              : isSuccess.value
                ? 'success'
                : 'idle',
    );

    onBeforeMount(updateNews);
</script>
<style module>
    .form {
        display: flex;
        flex-direction: column;
        padding-top: 2rem;
        gap: 1rem;
        align-items: stretch;
        max-width: 50%;
    }
</style>
