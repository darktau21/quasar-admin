// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: ['@nuxt/eslint'],
    srcDir: 'src',
    ssr: true,
    serverDir: 'server/',
    typescript: {
        typeCheck: true,
    },
    routeRules: {
        '/': { redirect: '/dashboard/news' },
        '/dashboard': { redirect: '/dashboard/news' },
    },
});
