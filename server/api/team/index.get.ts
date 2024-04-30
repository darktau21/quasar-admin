import { prisma } from '~/shared/lib';

export default defineEventHandler(async (event) => {
    const data = await prisma.teammate.findMany({
        orderBy: { updatedAt: 'desc' },
    });

    return { status: 'success', data } as const;
});
