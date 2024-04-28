import { prisma } from '~/shared/lib';

export default defineEventHandler(async (event) => {
    const data = await prisma.news.findMany();
    return { status: 'success', data };
});
