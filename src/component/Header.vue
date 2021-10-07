<script setup>
import  arrowdown from "../assets/svg/icon-arrow-down.svg"
import  plus from "../assets/svg/icon-plus.svg"
import { useRoute } from 'vue-router'
import {computed, ref} from "vue";
import { useStore } from 'vuex'

const store = useStore()
const toogleForm = () => {
  store.dispatch("toggleForm")
}

const route = useRoute()
const routeName = computed(()=>route.name )
const filterMenu = ref(null)

</script>

<template>
  <!--    Header-->
  <div class="mb-20 flex" v-show="routeName == 'Client' || routeName == 'Invoice'">
    <div class="flex-1 flex flex-col">
      <h1 class="text-4xl font-semibold">{{ routeName }}s</h1>
      <span class="mt-5">There are total 4 {{ routeName }} </span>
    </div>
    <div class="flex justify-end items-start">
      <div v-show="false" class="relative mr-10 cursor-pointer flex" ref="filter" @click="filterMenu = !filterMenu">
        <span class="pointer-events-none" >Filter by Status</span>
        <arrowdown class="pointer-events-none m-3 w-3 h-2"/>
        <ul class="w-32 absolute top-6 list-none bg-purple-light box" v-show="filterMenu">
          <li class="cursor-pointer font-s px-4 py-2 hover:bg-white hover:text-purple">Draft</li>
          <li class="cursor-pointer font-s px-4 py-2 hover:bg-white hover:text-purple">Pending</li>
          <li class="cursor-pointer font-s px-4 py-2 hover:bg-white hover:text-purple">Paid</li>
          <li class="cursor-pointer font-s px-4 py-2 hover:bg-white hover:text-purple">Clear Filter</li>
        </ul>
      </div>
      <div @click="toogleForm" class="flex button items-center p-2"
        v-bind:class="{ bgpurple: (routeName === 'Invoice'),bgorange: (routeName === 'Client'), }"
      >
        <div class="mr-2 rounded-full p-2 bg-white flex justify-center items-center">
          <plus class="w-3 h-3" ></plus>
        </div>
        <span>New {{ routeName }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bgpurple{
  @apply bg-purple;
}
.bgorange{
  @apply bg-orange;
}

</style>