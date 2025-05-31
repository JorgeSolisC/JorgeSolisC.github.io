import '@/css/style.css'
import '@/css/cv.css'
import {createApp} from 'vue'
import App from './App.vue'
import {createI18n} from "vue3-i18n";
import enUI from './lang/ui/en.json'
import esUI from './lang/ui/es.json'

const i18n = createI18n({
    locale: localStorage.locale ?? 'en',
    fallbackLocale: 'es',
    legacy: false,
    globalInjection: true,
    messages: {
    en: enUI,
    es: esUI
  }
});
const app = createApp(App);
app.use(i18n);
app.mount('#app')