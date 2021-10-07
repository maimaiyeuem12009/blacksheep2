<script setup>
import arrowRight from "../assets/svg/icon-arrow-right.svg"
const { invoice } = defineProps({
  invoice:Object
})
</script>

<template>
  <router-link class="invoice flex" :to="{ name: 'InvoiceShow', params: { invoiceId: invoice.invoiceId }}">
    <div class="left flex">
      <span class="tracking-number">#{{invoice.invoiceId.substring(0,8)}}</span>
      <span class="due-date">{{ invoice.paymentDueDate}}</span>
      <span class="person">{{invoice.clientName}}</span>
    </div>
    <div class="right flex">
      <span class="price">{{ invoice.invoiceTotal }}</span>
      <div class="status-button flex"
           :class="{
        paid: invoice.invoicePaid,
        draft: invoice.invoiceDraft,
        pending: invoice.invoicePending }"
      >
        <span v-if="invoice.invoicePaid">Paid</span>
        <span v-if="invoice.invoiceDraft">Draft</span>
        <span v-if="invoice.invoicePending">Pending</span>
      </div>
      <div class="icon">
        <arrowRight width="21"></arrowRight>
      </div>
    </div>
  </router-link>
</template>

<style scoped lang="scss">
.invoice{
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
  span{
    font-size: 13px;
  }
  .left{
    align-items: center;
    flex-basis: 60%;
    gap:16px;
    span{
      flex: 1;
    }
    .tracking-number{
      text-transform: uppercase;
    }
  }
  .right {
    gap: 16px;
    flex-basis: 40%;
    align-items: center;
    .price{
      flex: 1;
      font-size: 16px;
      font-weight: 600;
    }
  }
}
</style>