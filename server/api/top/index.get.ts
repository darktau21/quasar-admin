import { prisma } from '~/shared/lib';

export default defineEventHandler(async (event) => {
    const data = await prisma.winner.findMany({
        orderBy: { updatedAt: 'desc' },
    });

    return { status: 'success', data } as const;
});
