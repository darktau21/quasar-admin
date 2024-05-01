import type { Medal } from '~/shared/medal';

import { prisma } from '~/shared/lib';

export default defineEventHandler(async (event) => {
    const data = await prisma.winner.findMany({
        orderBy: { updatedAt: 'desc' },
    });

    return {
        data: data.map((d) => ({
            ...d,
            medals: d?.medals as Medal[],
        })),
        status: 'success',
    } as const;
});
