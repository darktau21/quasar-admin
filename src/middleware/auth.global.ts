import { prisma } from '~/shared/lib';

export default defineNuxtRouteMiddleware(async (from) => {
    if (import.meta.client || from.path === '/login') {
        return;
    }
    const key = useCookie('authKey');
    console.log(key.value);
    if (!key.value) {
        return navigateTo('/login');
    }
    const session = await prisma.session.findFirst({
        where: { session: key.value },
    });
    if (!session) {
        return navigateTo('/login');
    }
});
