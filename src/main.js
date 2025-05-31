import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import {createI18n} from "vue3-i18n";
import en from './lang/en.json'
import es from './lang/es.json'

const i18n = createI18n({
    locale: localStorage.locale ?? 'en',
    legacy: false,
    globalInjection: true,
    messages: {
        en,
        es
    }
});
const app = createApp(App);
app.use(i18n);
app.mount('#app')