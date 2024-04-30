import { Client } from 'minio';

export const s3Client = new Client({
    endPoint: process.env.S3_HOST!,
    port: +process.env.S3_PORT!,
    accessKey: process.env.S3_USER!,
    secretKey: process.env.S3_PASSWORD!,
    useSSL: process.env.NODE_ENV === 'production',
});
