import { object, z } from 'zod';

export const Password = object({
    password: z
        .string({ message: 'Обязательное поле' })
        .min(8, 'Минимальная длинна пароля - 8')
        .max(32, 'Максимальная длинна пароля - 32'),
});
