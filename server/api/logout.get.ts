import { prisma } from '~/shared/lib';

export default defineEventHandler(async (event) => {
    await prisma.session.deleteMany();
    deleteCookie(event, 'authKey');
});
