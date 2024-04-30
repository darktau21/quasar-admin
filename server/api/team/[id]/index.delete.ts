import type { Teammate } from '@prisma/client';
import type { PrismaClient } from '@prisma/client/extension';
import type { z } from 'zod';
import { prisma } from '~/shared/lib';
import { Teammate as TeammateSchema } from '~/shared/schemas';

type Body = Omit<Teammate, 'createdAt' | 'updatedAt' | 'id'>;

export default defineEventHandler(async (event) => {
    if (!event.context.isAuthorized) {
        setResponseStatus(event, 403);
        return { status: 'fail' };
    }

    try {
        const param = getRouterParam(event, 'id');
        if (!param) {
            return;
        }
        await prisma.teammate.delete({ where: { id: +param } });
        setResponseStatus(event, 204);
    } catch (e: unknown) {
        console.log(e);
        return { status: 'fail' };
    }
});
