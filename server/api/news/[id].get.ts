import { prisma } from '~/shared/lib';

export default defineEventHandler(async (event) => {
    const param = getRouterParam(event, 'id');
    console.log('get', param);
    if (param) {
        const data = await prisma.news.findFirst({ where: { id: +param } });
        return { status: 'success', data };
    }
});
