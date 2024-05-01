import type { Teammate } from '@prisma/client';

import { z } from 'zod';

import { prisma } from '~/shared/lib';
import { Teammate as TeammateSchema } from '~/shared/schemas';

type Body = Omit<Teammate, 'createdAt' | 'updatedAt'>;

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
        const res = await prisma.teammate.update({
            data: body,
            where: {
                id: body.id,
            },
        });

        return { data: res, status: 'success' } as const;
    } catch {
        return { status: 'fail' } as const;
    }
});
