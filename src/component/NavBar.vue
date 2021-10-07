<script setup>
import invoice from "../assets/svg/file-invoice-dollar-solid.svg"
import client from "../assets/svg/icon-client.svg"
import { ref } from  'vue'
import { useStore } from 'vuex'
const store = useStore()

</script>

<template>
  <header class="flex z-50 flex-row bg-purple-light lg:min-h-25 lg:min-w90 lg:flex-col bor rounded-r-2xl">
    <router-link :to="{name: 'Invoice'}">
      <div class="flex bg-purple jutify-center p-6 rounded-r-2xl lg:w-full">
        <invoice class="text-white w-10 "></invoice>
      </div>
    </router-link>
    <router-link :to="{name: 'Client'}">
      <div class="flex bg-orange jutify-center px-6 py-8 rounded-r-2xl lg:w-full">
        <client class=" w-10 scale-150 scale-half"></client>
      </div>
    </router-link>
  </header>
</template>

<style scoped>
.scale-half{
  transform: scale(1.5);
}

</style>