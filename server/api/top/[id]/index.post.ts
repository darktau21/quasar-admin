import { v4 } from 'uuid';
import { prisma } from '~/shared/lib';
import { s3Client } from '~/shared/lib/s3';

export default defineEventHandler(async (event) => {
    const param = getRouterParam(event, 'id');

    if (!event.context.isAuthorized) {
        setResponseStatus(event, 403);
        return { status: 'fail' };
    }

    const multipart = await readMultipartFormData(event);
    if (!multipart?.length || !param) {
        setResponseStatus(event, 400);
        return { status: 'fail' };
    }

    try {
        const winner = await prisma.winner.findFirst({
            where: { id: +param },
        });

        const imgName = `winner-${winner?.id}`;
        await s3Client.putObject(
            'avatars',
            imgName,
            multipart[0].data,
            multipart[0].data.byteLength,
            {
                'Content-Type': multipart[0].type,
            },
        );

        await prisma.winner.update({
            data: {
                imageUrl: `${process.env.S3_PUBLIC_HOST}/${process.env.S3_AVATARS_BUCKET}/${imgName}`,
            },
            where: { id: +param },
        });
    } catch (e: unknown) {
        console.log(e);
        setResponseStatus(event, 500);
        return { status: 'fail' };
    }
});
