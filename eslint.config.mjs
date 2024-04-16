import prettierConfig from 'eslint-config-prettier';
import perfectionistNatural from 'eslint-plugin-perfectionist/configs/recommended-natural';

import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(perfectionistNatural, prettierConfig);
