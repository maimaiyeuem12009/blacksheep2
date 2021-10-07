export default {
    namespaced: true,
    state: {
        invoiceList : [],
        currentInvoice: {}
    },
    mutations: {
        ADD_INVOICE(state, payload){
            state.invoiceList.push(payload)
            console.log(state.invoiceList)
        },

        GET_CURRENT_INVOICE(state, payload){
            state.currentInvoice= state.invoiceList.find(invoice => invoice.invoiceId = payload)
        }
    },
    actions: {
        newInvoice({commit}, payload){
            commit("ADD_INVOICE",payload)
        },
        getCurrentInvoice({commit},payload){
            commit("GET_CURRENT_INVOICE",payload)
        }
    },
}