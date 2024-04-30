import { prisma } from '~/shared/lib';
import { v4 } from 'uuid';
import { Password } from '~/shared/schemas';

type LoginBody = {
    password?: string;
};

export default defineEventHandler(async (event) => {
    const body = await readBody<LoginBody>(event);

    const passwordBody = Password.safeParse(body);

    if (!passwordBody.success) {
        setResponseStatus(event, 400);
        return { status: 'fail' };
    }

    if (passwordBody.data.password === process.env.APP_AUTH_SECRET) {
        const session = v4();
        try {
            const currentSession = await prisma.session.create({
                data: { session },
            });
            setCookie(event, 'authKey', session, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 2629800,
            });
            await prisma.session.deleteMany({
                where: { NOT: { id: currentSession.id } },
            });
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
