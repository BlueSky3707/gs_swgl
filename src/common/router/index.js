import {createRouter, createWebHashHistory} from 'vue-router'
import Layouts from "../layouts";

const routes = [
    {
        path: "/",
        component: Layouts,
        children: [
            {
                path: "/",
                redirect:'/yzt'
            } ,
            {
                path: "/yzt",
                name: "yzt",
                component: () => import("@/pages/YZT"),
            },
            {
                path: "/jsc",
                name: "jsc",
                component: () => import("@/pages/JSC"),
            },
        ]
    },
]


const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
