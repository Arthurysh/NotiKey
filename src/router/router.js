import Main from '@/pages/Main'
import Profile from '@/pages/Profile'
import Authorization from '@/pages/Authorization'
import { createRouter, createWebHistory } from 'vue-router';

const routes = [{
        path: '/',
        component: Main
    },
    {
        path: '/Profile',
        component: Profile,
    },
    {
        path: '/Authorization',
        component: Authorization,
        props: true,
        props: { isRegistration: false }
    },
    {
        path: '/Registration',
        component: Authorization,
        props: true,
        props: { isRegistration: true }
    },
];

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL),
});

export default router;