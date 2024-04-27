<template>
    <main :class="$style.container">
        <form @submit.prevent="onSubmit">
            <Input
                :disabled="isSubmitting"
                name="password"
                label="Пароль"
                type="password"
            />
        </form>
    </main>
</template>

<style module>
    .container {
        height: 100dvh;
        display: grid;
        place-items: center;
    }
</style>
<script setup lang="ts">
    import { toTypedSchema } from '@vee-validate/zod';
    import { useForm } from 'vee-validate';
    import { object, set, z } from 'zod';
    import Input from '~/shared/ui/Input.vue';

    type LoginForm = {
        password: string;
    };
    const validationSchema = toTypedSchema(
        object({
            password: z
                .string({ message: 'Обязательное поле' })
                .min(8, 'Минимальная длинна пароля - 8')
                .max(32, 'Максимальная длинна пароля - 32'),
        }),
    );
    const { handleSubmit, isSubmitting, setFieldError, resetForm } =
        useForm<LoginForm>({
            validationSchema,
        });

    const onSubmit = handleSubmit(async (values) => {
        try {
            await $fetch('/api/login', {
                method: 'POST',
                body: values,
            });

            return navigateTo('/dashboard/news');
        } catch {
            resetForm();
            setFieldError('password', 'Неверный пароль');
        }
    });
</script>
