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
    },
    {
        path: '/Registration',
        component: Authorization,
    },
];

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL),
});

export default router;