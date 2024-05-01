import type { Medal as MedalOrigin } from '@prisma/client';

export const Medal: { [k in MedalOrigin]: k } = {
    MEDAL1: 'MEDAL1',
    MEDAL2: 'MEDAL2',
    MEDAL3: 'MEDAL3',
    MEDAL4: 'MEDAL4',
};

export type Medal = MedalOrigin;
