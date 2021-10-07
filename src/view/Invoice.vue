<script setup>
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { computed } from "vue";
import arrowLeft from "../assets/svg/icon-arrow-left.svg"
const {invoiceId} = defineProps({invoiceId: Object})
const store = useStore()
const route = useRoute()
store.dispatch('invoice/getCurrentInvoice',route.params.invoiceId)
const currentInvoice = computed(() =>store.state.invoice.currentInvoice)
</script>

<template>
  <div v-if="currentInvoice" class="invoice-view container">
    <router-link class="nav-link flex" :to="{ name: 'Invoice' }">
      <arrowLeft class="svg"/>
    </router-link>
    <!-- Header -->
    <div class="header flex">
      <div class="left flex">
        <span>Status</span>
        <div
            class="status-button flex"
            :class="{
            paid: currentInvoice.invoicePaid,
            draft: currentInvoice.invoiceDraft,
            pending: currentInvoice.invoicePending,
          }"
        >
          <span v-if="currentInvoice.invoicePaid">Paid</span>
          <span v-if="currentInvoice.invoiceDraft">Draft</span>
          <span v-if="currentInvoice.invoicePending">Pending</span>
        </div>
      </div>
      <div class="right flex">
        <button @click="deleteInvoice(currentInvoice.docId)" class="bg-red">Delete</button>
        <button @click="updateStatusToPaid(currentInvoice.docId)" v-if="currentInvoice.invoicePending" class="bg-green">
          Mark as Paid
        </button>
        <button
            v-if="currentInvoice.invoiceDraft || currentInvoice.invoicePaid"
            @click="updateStatusToPending(currentInvoice.docId)"
            class="orange"
        >
          Mark as Pending
        </button>
      </div>
    </div>

    <!-- Invoice Details -->
    <div class="invoice-details flex flex-col">
      <div class="top flex">
        <div class="left flex flex-col">
          <p><span>#</span>{{ currentInvoice.invoiceId }}</p>
          <p>{{ currentInvoice.productDescription }}</p>
        </div>
        <div class="right flex flex-col">
          <p>{{ currentInvoice.billerStreetAddress }}</p>
          <p>{{ currentInvoice.billerCity }}</p>
          <p>{{ currentInvoice.billerZipCode }}</p>
          <p>{{ currentInvoice.billerCountry }}</p>
        </div>
      </div>
      <div class="middle flex">
        <div class="payment flex flex-col">
          <h4>Invoice Date</h4>
          <p>
            {{ currentInvoice.invoiceDate }}
          </p>
          <h4>Payment Date</h4>
          <p>
            {{ currentInvoice.paymentDueDate }}
          </p>
        </div>
        <div class="bill flex flex-col">
          <h4>Bill To</h4>
          <p>{{ currentInvoice.clientName }}</p>
          <p>{{ currentInvoice.clientStreetAddress }}</p>
          <p>{{ currentInvoice.clientCity }}</p>
          <p>{{ currentInvoice.clientZipCode }}</p>
          <p>{{ currentInvoice.clientCountry }}</p>
        </div>
        <div class="send-to flex flex-col">
          <h4>Sent To</h4>
          <p>{{ currentInvoice.clientEmail }}</p>
        </div>
      </div>
      <div class="bottom flex flex-col">
        <div class="billing-items">
          <div class="heading flex">
            <p>Item Name</p>
            <p>QTY</p>
            <p>Price</p>
            <p>Total</p>
          </div>
          <div v-for="(item, index) in currentInvoice.invoiceItemList" :key="index" class="item flex">
            <p>{{ item.itemName }}</p>
            <p>{{ item.qty }}</p>
            <p>{{ item.price }}</p>
            <p>{{ item.total }}</p>
          </div>
        </div>
        <div class="total flex">
          <p>Amount Due</p>
          <p>{{ currentInvoice.invoiceTotal }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.invoice-view {
  .nav-link {
    margin-bottom: 32px;
    align-items: center;
    color: #ffffff;
    font-size: 12px;
    .svg{
      margin-right: 16px;
      transform: scale(2);
    }
  }
  .header,
  .invoice-details {
    background: #1e2139;
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    border-radius: 20px;
  }
  .header{
    align-items: center;
    padding: 24px 32px;
    font-size: 12px;
    .left{
      align-items: center;
      span{
        color: #dfe3fa;
        margin-right: 16px;
      }
    }
    .right {
      flex: 1;
      justify-content: flex-end;
      button {
        color: #ffffff;
      }
    }
  }
  .invoice-details{
    padding: 48px;
    margin-top: 24px;
    .top{
      div{
        color: #dfe3fa;
        flex: 1;
      }
      .left{
        font-size: 12px;
        p:first-child{
          font-size: 24px;
          text-transform: uppercase;
          color: #ffffff;
          margin-bottom: 8px;
        }
        p:nth-child(2){
          font-size: 16px;
        }
        span{
          color: #888eb0;
        }
      }
      .right {
        font-size: 16px;
      }
    }
    .middle{
      margin-top: 50px;
      color: #dfe3fa;
      h4{
        font-size: 12px;
        font-weight: 400;
        margin-bottom: 12px;
      }
      p{
        font-size: 16px;
      }
      .bill,.payment {
        flex: 1;
      }
      .payment {
        h4:nth-child(3){
          margin-top: 32px;
        }
        p:nth-child(3){
          margin-top: auto;
        }
        p{
          font-size: 12px;
        }
      }
      .send-to{
        flex: 2;
      }
    }
    .bottom {
      margin-top: 50px;
      .billing-items{
        padding: 32px;
        -webkit-border-radius: 20px 20px 0 0;
        -moz-border-radius: 20px 20px 0 0;
        border-radius: 20px 20px 0 0;
        background: #252845;
        .heading{
          color: #dfe3fa;
          font-size: 12px;
          margin-bottom: 32px;
          p:first-child {
            flex: 3;
            text-align: left;
          }
          p{
            flex: 1;
            text-align: right;
          }
        }
        .item {
          margin-bottom: 32px;
          font-size: 13px;
          color: #fff;
          &:last-child {
            margin-bottom: 0;
          }
          p:first-child {
            flex: 3;
            text-align: left;
          }
          p {
            flex: 1;
            text-align: right;
          }
        }
      }
      .total {
        color: #fff;
        padding: 32px;
        background-color: rgba(12, 14, 22, 0.7);
        align-items: center;
        border-radius: 0 0 20px 20px;
        p {
          flex: 1;
          font-size: 12px;
        }
        p:nth-child(2) {
          font-size: 28px;
          text-align: right;
        }
      }
    }
  }
}
button, .button{
  cursor: pointer;
  padding: 16px 24px;
  -webkit-border-radius: 30px;
  -moz-border-radius: 30px;
  border-radius: 30px;
  font-size: 12px;
  margin-right: 8px;
  color: #ffffff;
  border: none;
}

</style>