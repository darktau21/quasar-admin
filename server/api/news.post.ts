import type { News } from '@prisma/client';
import { prisma } from '~/shared/lib';

type Body = Omit<News, 'id' | 'createdAt' | 'updatedAt'>;

export default defineEventHandler(async (event) => {
    if (!event.context.isAuthorized) {
        setResponseStatus(event, 403);
        return { status: 'fail' };
    }

    const body = await readBody<Body>(event);

    try {
        const res = await prisma.news.create({ data: body });

        return { status: 'success', data: res };
    } catch {
        return { status: 'fail' };
    }
});
