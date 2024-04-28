<template>
    <main :class="$style.container">
        <form @submit.prevent="onSubmit">
            <Input
                :disabled="isSubmitting"
                name="password"
                label="Пароль"
                type="password"
            />
            <Submit :state="buttonState"> Войти </Submit>
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
    import { Password } from '~/shared/schemas';
    import Input from '~/shared/ui/Input.vue';
    import Submit from '~/shared/ui/Submit.vue';

    type LoginForm = {
        password: string;
    };
    const validationSchema = toTypedSchema(Password);
    const { handleSubmit, isSubmitting, setFieldError, resetForm, errors } =
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

    const buttonState = computed(() =>
        isSubmitting.value
            ? 'submitting'
            : errors.value.password
              ? 'error'
              : 'idle',
    );
</script>
