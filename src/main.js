import { createApp } from 'vue'
import App from '@/App'
import components from '@/components/UI'
import VueGoogleMaps from '@fawmi/vue-google-maps'
import Router from '@/router/router'

const app = createApp(App);

components.forEach(component => {
    app.component(component.name, component);
});

app
    .use(VueGoogleMaps, {
        load: {
            key: 'AIzaSyDAMQ9lQs2wpePuFyCso5eT4SCJiveur0I',
        },
    })
    .use(Router)
    .mount('#app')