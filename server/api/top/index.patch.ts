import type { Winner } from '@prisma/client';

import type { Medal } from '~/shared/medal';

import { prisma } from '~/shared/lib';

type Body = Omit<Winner, 'createdAt' | 'updatedAt'>;

export default defineEventHandler(async (event) => {
    if (!event.context.isAuthorized) {
        setResponseStatus(event, 403);
        return { status: 'fail' } as const;
    }

    const body = await readBody<Body>(event);
    if (!body || !body.id) {
        setResponseStatus(event, 400);
        return { status: 'fail' } as const;
    }

    try {
        const data = await prisma.winner.update({
            data: body,
            where: {
                id: body.id,
            },
        });

        return {
            data: { ...data, medals: data?.medals as Medal[] },
            status: 'success',
        } as const;
    } catch {
        return { status: 'fail' } as const;
    }
});
