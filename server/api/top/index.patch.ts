import type { Winner } from '@prisma/client';
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
        const res = await prisma.winner.update({
            data: body,
            where: {
                id: body.id,
            },
        });

        return { status: 'success', data: res } as const;
    } catch {
        return { status: 'fail' } as const;
    }
});
