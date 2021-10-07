export default {
    namespaced: true,
    state: {
        clientList : []
    },
    mutations: {
        ADD_CLIENT(state, payload){
            state.clientList.push(payload)
            console.log(state.clientList)
        }
    },
    actions: {
        newClient({commit}, payload){
            commit("ADD_CLIENT",payload)
        }
    },
}