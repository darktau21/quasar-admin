import type { News } from '@prisma/client';

import { prisma } from '~/shared/lib';
import { News as NewsSchema } from '~/shared/schemas';

type Body = Omit<News, 'createdAt' | 'updatedAt'>;

export default defineEventHandler(async (event) => {
    if (!event.context.isAuthorized) {
        setResponseStatus(event, 403);
        return { status: 'fail' };
    }

    const body = await readBody<Body>(event);
    const news = NewsSchema.safeParse(body);

    if (!news.success) {
        setResponseStatus(event, 400);
        return { status: 'fail' };
    }

    try {
        const res = await prisma.news.update({
            data: news.data,
            where: { id: news.data.id },
        });

        return { data: res, status: 'success' };
    } catch {
        return { status: 'fail' };
    }
});
