import { createStore } from 'vuex'
import client from './module/client.js'
import invoice from './module/invoice.js'

export default createStore({
    modules: {
        client,
        invoice
    },
    state: {
        formModal : null,
        closeModal : null,
    },
    mutations: {
        FORM_MODAL(state){
            state.formModal = !state.formModal
        },
        CLOSE_MODAL(state){
            state.closeModal = !state.closeModal
            console.log("nice")
        }
    },
    actions: {
        toggleForm({commit}){
            commit("FORM_MODAL")
        },
        toggleClose({commit}){
            commit("CLOSE_MODAL")
        }
    },
})
