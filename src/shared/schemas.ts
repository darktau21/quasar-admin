import { object, z } from 'zod';

export const Password = object({
    password: z
        .string({ message: 'Обязательное поле' })
        .min(8, 'Минимальная длинна пароля - 8')
        .max(32, 'Максимальная длинна пароля - 32'),
});

export const News = object({
    id: z.number().optional(),
    title: z
        .string({ message: 'Обязательное поле' })
        .min(2, 'Минимальная длинна заголовка - 2')
        .max(80, 'Максимальная длинна заголовка - 80'),
    content: z
        .string()
        .min(10, 'Минимальная длинна новости - 10')
        .max(300, 'Максимальная длинна новости - 300'),
});

export const Teammate = object({
    id: z.number().optional(),
    name: z
        .string({ message: 'Обязательное поле' })
        .min(2, 'Минимальная длинна - 2')
        .max(128, 'Максимальная длинна - 128'),
    quote: z
        .string()
        .min(2, 'Минимальная длинна - 2')
        .max(128, 'Максимальная длинна - 128')
        .optional(),
    tags: z.array(z.string()).optional(),
    description: z
        .string({ message: 'Обязательное поле' })
        .min(2, 'Минимальная длинна - 2')
        .max(300, 'Максимальная длинна - 300'),
    isShown: z.boolean().optional().default(true),
    imageUrl: z.string().optional(),
});
