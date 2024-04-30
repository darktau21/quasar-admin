import type { Teammate } from '@prisma/client';
import type { PrismaClient } from '@prisma/client/extension';
import type { z } from 'zod';
import { prisma } from '~/shared/lib';
import { Teammate as TeammateSchema } from '~/shared/schemas';

type Body = Omit<Teammate, 'createdAt' | 'updatedAt' | 'id'>;

export default defineEventHandler(
    async (
        event,
    ): Promise<{ status: 'fail' } | { status: 'success'; data: Teammate }> => {
        if (!event.context.isAuthorized) {
            setResponseStatus(event, 403);
            return { status: 'fail' };
        }

        const body = await readBody<Body>(event);
        const teammate = TeammateSchema.omit({ id: true }).safeParse(body);
        if (!teammate.success) {
            setResponseStatus(event, 400);
            return { status: 'fail' };
        }

        try {
            const res = await prisma.teammate.create({
                data: {
                    ...teammate.data,
                    tags: teammate.data.tags?.filter((tag) => Boolean(tag)),
                },
            });
            return { status: 'success' as const, data: res };
        } catch (e: unknown) {
            console.log(e);
            return { status: 'fail' };
        }
    },
);
