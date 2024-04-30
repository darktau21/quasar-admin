<template>
    <div :class="$style.container">
        <form :class="$style.form" @submit="onSubmit">
            <Input
                v-model="name"
                label="Имя"
                name="name"
                type="text"
                :error="errors.name"
            />
            <Input
                v-model="quote"
                label="Цитата"
                name="quote"
                type="text"
                :error="errors.quote"
            />
            <div :class="$style.tagsList">
                <h3>Тэги</h3>
                <div
                    :class="$style.tags"
                    v-for="(field, idx) in fields"
                    :key="field.key"
                >
                    <Input
                        :label="`Тэг ${idx + 1}`"
                        type="text"
                        :class="$style.tagInput"
                        :name="`tags[${idx}]`"
                        v-model="field.value"
                    />
                    <Button
                        variant="danger"
                        @click="remove(idx)"
                        :class="$style.tagButton"
                    >
                        <TrashIcon style="width: 2.4rem; height: 2.4rem" />
                    </Button>
                </div>
                <Button
                    v-if="fields.length < 5"
                    style="justify-self: center"
                    @click="push('')"
                    >Добавить тэг</Button
                >
            </div>
            <TextArea
                label="Описание"
                name="description"
                v-model="description"
                :error="errors.description"
            />
            <Submit :state="buttonState">{{
                props.initial ? 'Обновить' : 'Добавить'
            }}</Submit>
            <Button variant="danger" v-if="props.initial" @click="handleDelete">
                Удалить
            </Button>
        </form>
        <div :class="$style.imgWrapper">
            <div :class="$style.imgContainer">
                <NuxtImg :class="$style.img" :src="imageUrl" />
            </div>
            <span>jpg, jpeg, png или webp файл размером не более 10МБ</span>
            <Button @click="handleImgBtnClick">
                Обновить фото
                <input
                    @change="handleFileChange"
                    accept="image/png,image/jpeg,image/webp"
                    ref="fileInput"
                    hidden
                    type="file"
                />
            </Button>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { toTypedSchema } from '@vee-validate/zod';
    import { useFieldArray, useForm } from 'vee-validate';
    import { useToast } from 'vue-toast-notification';
    import { TrashIcon } from '@heroicons/vue/16/solid';
    import type { z } from 'zod';
    import { Teammate } from '~/shared/schemas';
    import Input from '~/shared/ui/Input.vue';
    import Submit from '~/shared/ui/Submit.vue';
    import TextArea from '~/shared/ui/TextArea.vue';
    import Button from '~/shared/ui/Button.vue';
    const validationSchema = toTypedSchema(
        Teammate.omit({ id: true, imageUrl: true }),
    );
    const props = defineProps<{
        initial?: {
            id: number;
            name: string;
            quote: string | undefined;
            tags: string[];
            description: string;
            isShown: boolean;
            imageUrl: string | null;
        };
    }>();
    const $toast = useToast();
    const emit = defineEmits<{
        (e: 'teammate-added'): void;
    }>();

    const {
        handleSubmit,
        errors,
        defineField,
        resetForm,
        isSubmitting,
        setValues,
        meta,
    } = useForm({
        validationSchema,
        initialValues: {
            quote: props.initial?.quote,
            ...props.initial,
        } ?? { tags: [] },
    });
    const [name] = defineField('name');
    const [description] = defineField('description');
    const [quote] = defineField('quote');
    const { push, fields, remove } = useFieldArray<string>('tags');
    const isSuccess = ref(false);
    const fileInput = ref<HTMLInputElement | null>(null);
    const img = ref<File | null>(null);

    const handleDelete = async () => {
        if (!props.initial) {
            return;
        }
        await $fetch(`/api/team/${props.initial.id}`, {
            method: 'DELETE',
        });
        emit('teammate-added');
    };

    const onSubmit = handleSubmit(async (values: z.infer<typeof Teammate>) => {
        const notification = $toast.warning(
            props.initial ? 'Обновление...' : 'Добавление...',
            {
                position: 'top',
                duration: 0,
            },
        );

        try {
            const res = props.initial
                ? await $fetch('/api/team', {
                      method: 'PATCH',
                      body: { ...values, id: props.initial.id },
                      cache: 'no-cache',
                  })
                : await $fetch('/api/team', {
                      method: 'POST',
                      body: values,
                      cache: 'no-cache',
                  });
            if (res.status === 'success' && img.value) {
                const id = res.data.id;
                const data = new FormData();
                data.append('avatar', img.value);
                await $fetch(`/api/team/${id}`, { method: 'POST', body: data });
                if (props.initial) {
                    setValues({
                        ...res.data,
                        quote: res.data.quote ?? undefined,
                    });
                } else {
                    resetForm();
                }
            }
            $toast.success(
                props.initial ? 'Успешно обновлено' : 'Успешно добавлено',
                { position: 'top' },
            );
            emit('teammate-added');

            isSuccess.value = true;
            img.value = null;
            setTimeout(() => {
                isSuccess.value = false;
            }, 3000);
        } catch {
            $toast.error('Ошибка', {
                position: 'top',
            });
        } finally {
            notification.dismiss();
        }
    });

    const handleImgBtnClick = () => {
        URL.revokeObjectURL(imageUrl.value);
        if (!fileInput.value) {
            return;
        }
        fileInput.value.click();
    };

    const handleFileChange = () => {
        if (!fileInput.value) {
            return;
        }
        const file = fileInput.value?.files?.[0];
        if (!file) {
            $toast.error('Файл не выбран', { position: 'top' });
            return;
        }
        if (!file.type.match(/^image\/(png|jpeg|webp)$/)) {
            $toast.error(
                'Поддерживаются только картинки с расширением jpeg, png или webp',
                {
                    position: 'top',
                },
            );
            return;
        }
        if (file.size > 11_000_000) {
            $toast.error('Максимальный размер файла - 10МБ', {
                position: 'top',
            });
            return;
        }
        img.value = file;
    };

    const imageUrl = computed(() => {
        if (img.value) {
            return URL.createObjectURL(img.value);
        }
        if (props.initial?.imageUrl) {
            return props.initial.imageUrl;
        }
        return './avatar.png';
    });

    const buttonState = computed(() =>
        isSubmitting.value
            ? 'submitting'
            : !meta.value.valid
              ? 'error'
              : isSuccess.value
                ? 'success'
                : 'idle',
    );
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
    .tags {
        display: flex;
        gap: 1rem;
        padding: 1rem;
        width: 100%;
        align-items: center;
    }
    .tagInput {
        flex: 1 0;
    }
    .tagButton {
        justify-self: flex-end;
        padding: 0.6rem;
        align-self: top;
        position: relative;
        top: -0.5rem;
    }
    .tagsList {
        display: flex;
        flex-direction: column;
    }
    .container {
        display: flex;
        gap: 2rem;
        justify-content: space-between;
    }
    .imgContainer {
        max-width: 40rem;
        max-height: 60rem;
    }
    .imgWrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        align-self: flex-start;
        gap: 1rem;
    }
    .img {
        object-fit: scale-down;
        width: 100%;
        height: auto;
    }
</style>
