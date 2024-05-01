<template>
    <div :class="$style.container">
        <form :class="$style.form" @submit="onSubmit">
            <Input
                :error="errors.name"
                label="Имя"
                name="name"
                v-model="name"
                type="text"
            />
            <VueSelect
                :class="$style.selector"
                :options="options"
                :reduce="reduceOptions"
                :searchable="false"
                multiple
                placeholder="Выберите медали"
                v-model="medals"
            >
                <template #option="{ label, icon }">
                    <div :class="$style.option">
                        <span>{{ label }}</span>
                        <Medals :variant="icon" />
                    </div>
                </template>
                <template #selected-option="{ label, icon }">
                    <div :class="$style.option">
                        <span>{{ label }}</span>
                        <Medals :variant="icon" />
                    </div>
                </template>
            </VueSelect>
            <span :class="$style.err" v-show="errors.medals">{{
                errors.medals
            }}</span>
            <TextArea
                :error="errors.description"
                label="Описание"
                v-model="description"
                name="description"
            />
            <TextArea
                :error="errors.review"
                label="Отзыв"
                v-model="review"
                name="review"
            />
            <Submit :state="buttonState">{{
                props.initial ? 'Обновить' : 'Добавить'
            }}</Submit>
            <Button @click="handleDelete" v-if="props.initial" variant="danger">
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
                    hidden
                    ref="fileInput"
                    type="file"
                />
            </Button>
        </div>
    </div>
</template>
<script setup lang="ts">
    import type { z } from 'zod';

    import { TrashIcon } from '@heroicons/vue/16/solid';
    import { toTypedSchema } from '@vee-validate/zod';
    import { useFieldArray, useForm } from 'vee-validate';
    import VueSelect from 'vue-select';
    import { useToast } from 'vue-toast-notification';

    import type { Teammate } from '~/shared/schemas';

    import { Medal } from '~/shared/medal';
    import { Winner } from '~/shared/schemas';
    import Button from '~/shared/ui/Button.vue';
    import Input from '~/shared/ui/Input.vue';
    import Medals from '~/shared/ui/Medals.vue';
    import Submit from '~/shared/ui/Submit.vue';
    import TextArea from '~/shared/ui/TextArea.vue';
    const validationSchema = toTypedSchema(
        Winner.omit({ id: true, imageUrl: true }),
    );
    type Option = {
        icon: Medal;
        label: string;
        value: Medal;
    };
    const reduceOptions = (option: Option) => option.value;
    const options: Option[] = [
        {
            icon: Medal.MEDAL1,
            label: 'Медаль 1',
            value: Medal.MEDAL1,
        },
        {
            icon: Medal.MEDAL2,
            label: 'Медаль 2',
            value: Medal.MEDAL2,
        },
        {
            icon: Medal.MEDAL3,
            label: 'Медаль 3',
            value: Medal.MEDAL3,
        },
        {
            icon: Medal.MEDAL4,
            label: 'Медаль 4',
            value: Medal.MEDAL4,
        },
    ];
    const props = defineProps<{
        initial?: {
            description: string;
            id: number;
            imageUrl: null | string;
            medals: Medal[];
            name: string;
            review?: string;
        };
    }>();
    const $toast = useToast();
    const emit = defineEmits<{
        (e: 'winner-added'): void;
    }>();

    const {
        defineField,
        errors,
        handleSubmit,
        isSubmitting,
        meta,
        resetForm,
        setValues,
    } = useForm({
        initialValues: {
            medals: props.initial?.medals ?? [],
            review: props.initial?.review,

            ...props.initial,
        } ?? { medals: [] },
        validationSchema,
    });
    const [name] = defineField('name');
    const [description] = defineField('description');
    const [review] = defineField('review');
    const [medals] = defineField('medals');
    const isSuccess = ref(false);
    const fileInput = ref<HTMLInputElement | null>(null);
    const img = ref<File | null>(null);

    const handleDelete = async () => {
        if (!props.initial) {
            return;
        }
        await $fetch(`/api/top/${props.initial.id}`, {
            method: 'DELETE',
        });
        emit('winner-added');
    };

    const onSubmit = handleSubmit(async (values: z.infer<typeof Teammate>) => {
        const notification = $toast.warning(
            props.initial ? 'Обновление...' : 'Добавление...',
            {
                duration: 0,
                position: 'top',
            },
        );

        try {
            const res = props.initial
                ? await $fetch('/api/top', {
                      body: { ...values, id: props.initial.id },
                      cache: 'no-cache',
                      method: 'PATCH',
                  })
                : await $fetch('/api/top', {
                      body: values,
                      cache: 'no-cache',
                      method: 'POST',
                  });
            if (res.status === 'success' && img.value) {
                const id = res.data.id;
                const data = new FormData();
                data.append('avatar', img.value);
                await $fetch(`/api/top/${id}`, { body: data, method: 'POST' });
            }
            if (res.status === 'success') {
                if (props.initial) {
                    setValues({
                        ...res.data,
                        review: res.data.review ?? undefined,
                    });
                } else {
                    resetForm();
                }
            }
            $toast.success(
                props.initial ? 'Успешно обновлено' : 'Успешно добавлено',
                { position: 'top' },
            );
            emit('winner-added');

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
    .selector {
        --vs-font-size: 1.8rem;
    }
    .option {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
    }
    .err {
        color: rgb(255, 68, 51);
        font-size: 1.4rem;
        height: 1.8rem;
        transition: visibility 0.3s ease-in;
    }
</style>
