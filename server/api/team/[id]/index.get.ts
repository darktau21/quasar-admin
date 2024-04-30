import { prisma } from '~/shared/lib';

export default defineEventHandler(async (event) => {
    const param = getRouterParam(event, 'id');
    if (param) {
        const data = await prisma.teammate.findFirst({ where: { id: +param } });
        return { status: 'success', data };
    }
});
