<script setup>
import ClientCard from "../component/ClientCard.vue"
import {useStore } from 'vuex'

const store = useStore()
const clients = store.state.client.clientList

</script>

<template>
  <div class="text-white">
    <ClientCard v-for="client in clients" :client="client" :key="client.clientId"></ClientCard>
  </div>
</template>

<style scoped>

</style>