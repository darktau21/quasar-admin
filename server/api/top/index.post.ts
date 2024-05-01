import type { Teammate, Winner } from '@prisma/client';
import { prisma } from '~/shared/lib';
import { Winner as WinnerSchema } from '~/shared/schemas';

type Body = Omit<Winner, 'createdAt' | 'updatedAt' | 'id'>;

export default defineEventHandler(
    async (
        event,
    ): Promise<{ status: 'fail' } | { status: 'success'; data: Winner }> => {
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
            const res = await prisma.winner.create({
                data: {
                    ...winner.data,
                    medals: winner.data.medals ?? [],
                },
            });
            return { status: 'success' as const, data: res };
        } catch (e: unknown) {
            console.log(e);
            return { status: 'fail' };
        }
    },
);
