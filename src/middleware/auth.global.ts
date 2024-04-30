import { prisma } from '~/shared/lib';

export default defineNuxtRouteMiddleware(async (from) => {
    if (
        import.meta.client ||
        from.path === '/login' ||
        from.path.startsWith('/api')
    ) {
        return;
    }
    const key = useCookie('authKey');
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
