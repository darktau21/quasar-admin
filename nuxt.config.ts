// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: ['@nuxt/eslint', '@nuxt/image'],
    srcDir: 'src',
    ssr: true,
    serverDir: 'server/',
    dir: {
        public: '../public',
    },
    typescript: {
        typeCheck: true,
    },
    routeRules: {
        '/': { redirect: '/dashboard/news' },
        '/dashboard': { redirect: '/dashboard/news' },
    },
});
