import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [{
        path: '/',
        name: 'home',
        redirect: 'demo',
    }, {
        path: '/demo',
        name: 'demo',
        component: () => import('../views/demo/index.vue')
    }, {
        path: '/map',
        name: 'map',
        component: () => import('../views/map/index.vue'),
        children: [{
            path: '/3dTiles',
            name: '3dTiles',
            component: () => import('../views/map/tools/3DTiles.vue')
        }, {
            path: '/entity',
            name: 'entity',
            component: () => import('../views/map/tools/addEntity.vue')
        }, {
            path: '/dataSource',
            name: 'dataSource',
            component: () => import('../views/map/tools/dataImport.vue')
        }, {
            path: '/event',
            name: 'event',
            component: () => import('../views/map/tools/event.vue')
        }, {
            path: '/3DModel',
            name: '3DModel',
            component: () => import('../views/map/tools/3DModel.vue')
        }, {
            path: '/cluster',
            name: 'cluster',
            component: () => import('../views/map/tools/cluster.vue')
        }, {
            path: '/block',
            name: 'block',
            component: () => import('../views/map/tools/block.vue')
        }, {
            path: '/building',
            name: 'building',
            component: () => import('../views/map/tools/building.vue')
        }]
    }]
})
export default router