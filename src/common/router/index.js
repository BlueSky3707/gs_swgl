import {createRouter, createWebHashHistory} from 'vue-router'
import Layouts from "../layouts";

const routes = [
    {
        path: "/",
        component: Layouts,
        children: [
            {
                path: "/",
                redirect:'/jsc'
            },
            
            {
                path: "/jsc",
                name: "jsc",
                component: () => import("@/pages/JSC"),
            },
            {
                path: "/yzt",
                name: "yzt",
                component: () => import("@/pages/YZT"),
            }
        ]
    },
]


const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
