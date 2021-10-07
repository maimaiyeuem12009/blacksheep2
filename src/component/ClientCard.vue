<script setup>
import {ref} from 'vue'

let now = ref()
const { client } = defineProps({client: Object})
const timezone = client.clientTimeZone.substring(
    client.clientTimeZone.lastIndexOf("(") + 1,
    client.clientTimeZone.lastIndexOf(")")
);
setInterval(()=>{
  now.value = new Date().toLocaleString('en-US', {
    timeZone: timezone ,
    hour : "numeric",
    minute : "numeric" ,
    second : "numeric"
  })
},1000)
</script>

<template>
  <a :href="`mailto: ${client.clientEmail}`"
     class="mb-5 flex cursor-pointer text-white rounded-2xl px-8 py-6 items-center bg-purple-light">
    <div class="flex-1 text-2xl">{{client.clientName}}</div>
    <div class="flex-1 text-4xl font-mono text-center">{{ now }}</div>
    <div class="flex-1 text-md text-right">{{client.clientTimeZone}}</div>
  </a>

</template>

<style scoped  lang="scss">
.client-card{
  gap: 16px;
  text-decoration: none;
  cursor: pointer;
  margin-bottom: 16px;
  color: #ffffff;
  -webkit-border-radius: 20px;
  -moz-border-radius: 20px;
  border-radius: 20px;
  padding: 28px 32px;
  background: #1e2131;
  align-items: center;
}


</style>