export default {
    namespaced: true,
    state: {
        clientList : []
    },
    mutations: {
        ADD_CLIENT(state, payload){
            state.clientList.push(payload)
        }
    },
    actions: {
        newClient({commit}, payload){
            commit("ADD_CLIENT",payload)
        }
    },
}