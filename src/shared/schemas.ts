import { object, z } from 'zod';

export const Password = object({
    password: z
        .string({ message: 'Обязательное поле' })
        .min(8, 'Минимальная длинна пароля - 8')
        .max(32, 'Максимальная длинна пароля - 32'),
});

export const News = object({
    id: z.number(),
    title: z
        .string({ message: 'Обязательное поле' })
        .min(2, 'Минимальная длинна заголовка - 2')
        .max(80, 'Максимальная длинна заголовка - 80'),
    content: z
        .string()
        .min(10, 'Минимальная длинна новости - 10')
        .max(300, 'Максимальная длинна новости - 300'),
});
