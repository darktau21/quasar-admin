import { Client } from 'minio';

export const s3Client = new Client({
    accessKey: process.env.S3_USER!,
    endPoint: process.env.S3_HOST!,
    port: +process.env.S3_PORT!,
    secretKey: process.env.S3_PASSWORD!,
    useSSL: false,
});
