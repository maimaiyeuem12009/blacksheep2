<script setup>
import Header from "../component/Header.vue"
import InvoiceCard from "../component/InvoiceCard.vue"
import { ref } from  'vue'
import { useStore } from 'vuex'
const store = useStore()
const filterMenu = ref(null)
const invoices = store.state.invoice.invoiceList


</script>

<template>
  <div class="text-white">
    <InvoiceCard v-for="invoice in invoices" :invoice="invoice" :key="invoice.invoiceId"/>
  </div>
</template>

<style scoped lang="scss">


</style>