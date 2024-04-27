import { prisma } from '~/shared/lib';

export default defineEventHandler(async (event) => {
    const key = getCookie(event, 'authKey');
    const session = await prisma.session.findFirst({ where: { session: key } });

    event.context.isAuthorized = Boolean(session);
});
