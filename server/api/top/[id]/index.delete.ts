import type { Teammate } from '@prisma/client';

import { prisma } from '~/shared/lib';
import { s3Client } from '~/shared/lib/s3';

type Body = Omit<Teammate, 'createdAt' | 'id' | 'updatedAt'>;

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
        await prisma.winner.delete({ where: { id: +param } });
        await s3Client.removeObject(
            process.env.S3_AVATARS_BUCKET!,
            `winner-${param}`,
        );
        setResponseStatus(event, 204);
    } catch (e: unknown) {
        console.log(e);
        return { status: 'fail' };
    }
});
