import { object, z } from 'zod';

export const Password = object({
    password: z
        .string({ message: 'Обязательное поле' })
        .min(8, 'Минимальная длинна пароля - 8')
        .max(32, 'Максимальная длинна пароля - 32'),
});

export const News = object({
    content: z
        .string()
        .min(10, 'Минимальная длинна новости - 10')
        .max(300, 'Максимальная длинна новости - 300'),
    id: z.number().optional(),
    title: z
        .string({ message: 'Обязательное поле' })
        .min(2, 'Минимальная длинна заголовка - 2')
        .max(37, 'Максимальная длинна заголовка - 37'),
});

export const Teammate = object({
    description: z
        .string({ message: 'Обязательное поле' })
        .min(2, 'Минимальная длинна - 2')
        .max(440, 'Максимальная длинна - 440'),
    id: z.number().optional(),
    imageUrl: z.string().optional(),
    name: z
        .string({ message: 'Обязательное поле' })
        .min(2, 'Минимальная длинна - 2')
        .max(90, 'Максимальная длинна - 90'),
    quote: z
        .string()
        .min(2, 'Минимальная длинна - 2')
        .max(60, 'Максимальная длинна - 60')
        .optional(),
    tags: z.array(z.string()).optional(),
});

export const Winner = object({
    description: z
        .string({ message: 'Обязательное поле' })
        .min(2, 'Минимальная длинна - 2')
        .max(100, 'Максимальная длинна - 100'),
    id: z.number().optional(),
    imageUrl: z.string().optional(),
    medals: z
        .array(z.enum(['MEDAL1', 'MEDAL2', 'MEDAL3', 'MEDAL4']))
        .min(1, 'Минимум 1 медаль')
        .max(3, 'Максимум 3 медали')
        .optional(),
    name: z
        .string({ message: 'Обязательное поле' })
        .min(2, 'Минимальная длинна - 2')
        .max(30, 'Максимальная длинна - 30'),
    review: z
        .string()
        .min(2, 'Минимальная длинна - 2')
        .max(500, 'Максимальная длинна - 500'),
});
