import { prisma } from '~/shared/lib';

export default defineEventHandler(async (event) => {
    const data = await prisma.news.findMany({
        select: {
            title: true,
            content: true,
            updatedAt: true,
        },
        orderBy: {
            updatedAt: 'desc',
        },
    });
    return { status: 'success', data };
});
