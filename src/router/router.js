import Main from '@/pages/Main'
import Profile from '@/pages/Profile'
import Authorization from '@/pages/Authorization'
import { createRouter, createWebHashHistory } from 'vue-router';

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
];

const router = createRouter({
    routes,
    history: createWebHashHistory(process.env.BASE_URL),
});

export default router;