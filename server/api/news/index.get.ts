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

    data.forEach((item) => {
        item.content = item.content
            .split('\n')
            .map((line) => `<p>${line.trim()}</p>`)
            .join('');
    });
    return { status: 'success', data };
});
