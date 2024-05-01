import type { Teammate, Winner } from '@prisma/client';

import type { Medal } from '~/shared/medal';

import { prisma } from '~/shared/lib';
import { Winner as WinnerSchema } from '~/shared/schemas';

type Body = Omit<Winner, 'createdAt' | 'id' | 'updatedAt'>;

export default defineEventHandler(
    async (
        event,
    ): Promise<{ data: Winner; status: 'success' } | { status: 'fail' }> => {
        if (!event.context.isAuthorized) {
            setResponseStatus(event, 403);
            return { status: 'fail' };
        }

        const body = await readBody<Body>(event);
        const winner = WinnerSchema.omit({ id: true }).safeParse(body);
        if (!winner.success) {
            setResponseStatus(event, 400);
            return { status: 'fail' };
        }

        try {
            const data = await prisma.winner.create({
                data: {
                    ...winner.data,
                    medals: (winner.data.medals as Medal[]) ?? ([] as Medal[]),
                },
            });
            return {
                data: { ...data, medals: data?.medals as Medal[] },
                status: 'success' as const,
            };
        } catch (e: unknown) {
            console.log(e);
            return { status: 'fail' };
        }
    },
);
