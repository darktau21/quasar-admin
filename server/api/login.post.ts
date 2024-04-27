import { prisma } from '~/shared/lib';
import { v4 } from 'uuid';

type LoginBody = {
    password?: string;
};

export default defineEventHandler(async (event) => {
    const body = await readBody<LoginBody>(event);

    if (body.password === process.env.APP_AUTH_SECRET) {
        console.log('success');
        const session = v4();
        try {
            await prisma.session.create({ data: { session } });
            setCookie(event, 'authKey', session);
            return { status: 'success' };
        } catch {
            throw createError({
                statusCode: 500,
                message: 'Что-то пошло не так...',
            });
        }
    }

    setResponseStatus(event, 401);
    return { status: 'fail' };
});
