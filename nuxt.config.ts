// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    dir: {
        public: '../public',
    },
    modules: ['@nuxt/eslint', '@nuxt/image', "nuxt-security"],
    routeRules: {
        '/': { redirect: '/dashboard/news' },
        '/dashboard': { redirect: '/dashboard/news' },
    },
    serverDir: 'server/',
    srcDir: 'src',
    ssr: true,
    typescript: {
        typeCheck: true,
    },
    vite: {
        resolve: {
            alias: {
                '.prisma/client/index-browser':
                    './node_modules/.prisma/client/index-browser.js',
            },
        },
    },
    security: {
        corsHandler: {
            origin: '*'
        }
    }
});