import {createRouter, createWebHashHistory } from 'vue-router'
import Home from '../view/Home.vue'
import Client from '../view/Client.vue'
import Invoice from '../view/Invoice.vue'

const routes = [
    {
        path: '/',
        name: "Invoice",
        component: Home
    },
    {
        path: '/Client',
        name: "Client",
        component: Client
    },
    {
        path: '/invoice/:invoiceId',
        name: "InvoiceShow",
        component: Invoice,
        props: true
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router