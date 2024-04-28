import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';
export default defineNuxtPlugin((app) => {
    app.vueApp.use(ToastPlugin);
});
