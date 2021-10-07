<script setup>
import { useRoute } from 'vue-router'
import { useStore} from "vuex";
import {computed, ref,watchEffect, reactive} from "vue";
import iconPlus from "../assets/svg/icon-plus.svg"
import iconDelete from "../assets/svg/icon-delete.svg"
import Loading from "./Loading.vue"
import timezone from '../assets/data/timezone.json'
import db from "../firebase/fireBaseInit.js"
import { v1 as uuidv1 } from 'uuid'

const store = useStore()
const route = useRoute()
const dateOptions = ref ( { year : "numeric", month : "short" ,day : "numeric" })
const loading = ref ( null )
const routeName = computed(()=>route.name )
const client = computed(()=>route.name ==="Client" )
const invoice = computed(()=>route.name === "Invoice" )
const clientName = ref ( "" )
const clientEmail = ref ( "" )
const clientStreetAddress = ref ( "" )
const clientCity = ref ( "" )
const clientZipCode = ref ( "" )
const clientCountry = ref ( "" )
const clientTimeZone = ref ( "Bangkok, Hanoi, Jakarta (Asia/Bangkok)" )
const invoiceDateUnix = ref ( Date.now() )
const invoiceDate = ref ( new Date(invoiceDateUnix.value)
    .toLocaleDateString('en-us',dateOptions.value) )
const paymentTerms = ref ( "" )
const paymentDueDateUnix = ref ( 0 )
const paymentDueDate = ref ( "" )
const productDescription = ref ( "" )
const invoicePending = ref ( null )
const invoiceDraft = ref ( null )
const invoiceItemList = ref ( [] )
const invoiceTotal = computed(()=>
    invoiceItemList.value.length > 0
        ? invoiceItemList.value.reduce((a,b) => a+b.total,0)
        : 0
)

const addNewInvoiceItem = () => {
  const invoice = reactive({
    id: uuidv1(),
    itemName: "",
    qty: 0,
    price: 0.,
    total: 0.,
  })
  invoiceItemList.value.push(invoice)
}

watchEffect(() => {
  let futureDate = new Date()
  paymentDueDateUnix.value  = futureDate.setDate(futureDate.getDate() + parseInt(paymentTerms.value))
  paymentDueDate.value = new Date(paymentDueDateUnix.value)
      .toLocaleDateString('en-us',dateOptions.value)
})
const uploadClient = () => {
  loading.value = true
  const data = {
    clientId: uuidv1(),
    clientName: clientName.value,
    clientEmail: clientEmail.value,
    clientStreetAddress: clientStreetAddress.value,
    clientCity: clientCity.value,
    clientZipCode: clientZipCode.value,
    clientCountry: clientCountry.value,
    clientTimeZone: clientTimeZone.value,
  }
  store.dispatch("client/newClient",data)
  loading.value = false
}
const uploadInvoice = () => {
  loading.value = true
  const data = {
    invoiceId: uuidv1(),
    clientName: clientSelect.value.clientName,
    clientEmail: clientSelect.value.clientEmail,
    clientStreetAddress: clientSelect.value.clientStreetAddress,
    clientCity: clientSelect.value.clientCity,
    clientZipCode: clientSelect.value.clientZipCode,
    clientCountry: clientSelect.value.clientCountry,
    invoiceDate: invoiceDate.value,
    invoiceDateUnix: invoiceDateUnix.value,
    paymentTerms: paymentTerms.value,
    paymentDueDate: paymentDueDate.value,
    paymentDueDateUnix: paymentDueDateUnix.value,
    productDescription: productDescription.value,
    invoiceItemList: invoiceItemList.value,
    invoiceTotal: invoiceTotal.value,
    invoicePending: invoicePending.value,
    invoiceDraft: invoiceDraft.value,
    invoicePaid: null,
  }
  store.dispatch("invoice/newInvoice",data)
  console.log(data)

}

const submitForm = () => {

  if (client.value){
    uploadClient()
  } else if(invoice.value){
    console.log("lmao")
    uploadInvoice()
  }
  formModal()
}

const closeModal = () => store.dispatch('toggleClose')
const formModal = () => store.dispatch('toggleForm')

const clientList = computed(() =>store.state.client.clientList)

const deleteInvoiceItem = (id) => {
  invoiceItemList.value = invoiceItemList.value.filter((item) => item.id !== id)
}
const publishInvoice = () => { invoicePending.value = true}
const saveDraft = () => { invoiceDraft.value = true}
const clientSelect = ref()

</script>

<template>
  <div class="invoice-modal flex">
    <div class="invoice-wrap flex" ref="invoiceMap">
      <form @submit.prevent="submitForm" class="invoice-content">
        {{client}}
<!--        <Loading v-show="loading"></Loading>-->
        <h1 class="text-5xl">New {{ routeName }}</h1>
        <!-- Bill From -->

        <!-- Bill To -->
        <div class="bill-to flex flex-col text-xl" v-if="client">
          <div class="input flex flex-col">
            <label for="clientName">Client's Name</label>
            <input required type="text" id="clientName" v-model="clientName" />
          </div>
          <div class="input flex flex-col">
            <label for="clientEmail">Client's Email</label>
            <input required type="text" id="clientEmail" v-model="clientEmail" />
          </div>
          <div class="input flex flex-col">
            <label for="clientStreetAddress">Street Address</label>
            <input required type="text" id="clientStreetAddress" v-model="clientStreetAddress" />
          </div>
          <div class="location-details flex">
            <div class="input flex flex-col">
              <label for="clientCity">City</label>
              <input required type="text" id="clientCity" v-model="clientCity" />
            </div>
            <div class="input flex flex-col">
              <label for="clientZipCode">Zip Code</label>
              <input required type="text" id="clientZipCode" v-model="clientZipCode" />
            </div>
            <div class="input flex flex-col">
              <label for="clientCountry">Country</label>
              <input required type="text" id="clientCountry" v-model="clientCountry" />
            </div>
          </div>
          <div class="input flex flex-col">
            <label for="timeZone">Time Zone</label>
            <select required id="timeZone" v-model="clientTimeZone" >
            <option v-for="(time, index) in timezone" :value="time.label">{{ time.label }} / {{time.value}}</option>
            </select>
          </div>
        </div>

        <div class="invoice-work flex flex-col" v-if="invoice">
          <div class="input flex flex-col">
            <label for="client_select">Client</label>
            <select required id="client_select" v-model="clientSelect">
            <option v-for="client in clientList" :value="client">{{client.clientName}}</option>
            </select>
          </div>
          <div class="payment flex">
            <div class="input flex flex-col">
              <label for="invoiceDate">Invoice Date</label>
              <input disabled type="text" id="invoiceDate" v-model="invoiceDate" />
            </div>
            <div class="input flex flex-col">
              <label for="paymentDueDate">Payment Due</label>
              <input disabled type="text" id="paymentDueDate" v-model="paymentDueDate" />
            </div>
          </div>
          <div class="input flex flex-col">
            <label for="uuid_select">Payment Terms</label>
            <select required id="uuid_select" v-model="paymentTerms">
            <option value="30">Net 30 Days</option>
            <option value="60">Net 60 Days</option>
            </select>
          </div>
          <div class="input flex flex-col">
            <label for="productDescription">Service Description</label>
            <input required type="text" id="productDescription" v-model="productDescription" />
          </div>
          <div class="work-items">
            <h3>Item List</h3>
            <table class="item-list">
              <tr class="table-heading flex">
                <th class="item-name">Item Name</th>
                <th class="qty">Hour</th>
                <th class="price">$/Hr</th>
                <th class="total">Total</th>
              </tr>
              <tr class="table-items flex" v-for="(item, index) in invoiceItemList" :key="index">
                <td class="item-name"><input type="text" v-model="item.itemName" /></td>
                <td class="qty"><input type="number" v-model="item.qty" /></td>
                <td class="price"><input type="number" v-model="item.price" /></td>
                <td class="total flex">${{ (item.total = item.qty * item.price) }}</td>
                <iconDelete @click="deleteInvoiceItem(item.id)" class="svg"/>
              </tr>
            </table>
            {{invoiceTotal}}

            <div @click="addNewInvoiceItem" class="flex button">
              <iconPlus  class="svg"></iconPlus>
              Add New Item
            </div>
          </div>
        </div>

        <!--      Save-->
        <div class="save flex">
          <div class="left">
            <button type="button" class="bg-red" @click="formModal">Cancel</button>
          </div>
          <div class="right flex">
            <button v-show="invoice" type="submit" class="bg-purple-light" @click="saveDraft">Save Draft</button>
            <button type="submit" class="bg-purple" @click="publishInvoice">Publish {{routeName}}</button>
          </div>
        </div>
      </form>
    </div>
    <div class="close" @click="closeModal"></div>
  </div>
</template>

<style scoped lang="scss">
.invoice-modal {
  z-index: 49;
  position: fixed;
  display: flex;
  flex-direction: row;
  width: 100%;
.close {
  flex: 1;
}
}
.invoice-wrap {
  top: 0;
  left: 0;
  height: 100vh;
  overflow: scroll;
  flex-direction: row;
  box-shadow: 10px 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
&::-webkit-scrollbar{
   display: none;
 }
@media (min-width: 900px) {
  left:90px;
}
.invoice-content{
  position: relative;
  padding: 56px;
  min-width: 700px;
  width: 100px;
  background: #141625;
  color: #fff;
h1{
  margin-bottom: 48px;
  color: #fff;
}
h3{
  margin-bottom: 16px;
  font-size: 18px;
  color: #777f98;
}
h4{
  color: #7c5dfa;
  margin-bottom: 24px;
}
.bill-from,.bill-to{
  margin-bottom: 48px;
.location-details{
  gap:16px;
div{
  flex: 1;
}
}
}
//Invoice Work
  .invoice-work{
.payment{
  gap:24px;
div {
  flex: 1;
}
}
.work-items {
.item-list {
  width: 100%;
// Item Table Styling
   .table-heading, .table-items {
     gap: 16px;
     font-size: 12px;
.item-name {
  flex-basis: 50%
}
.qty {
  flex-basis: 10%
}
.price {
  flex-basis: 20%
}
.total {
  flex-basis: 20%;
&.flex{
   justify-content: flex-start;
   align-items: center;
   font-size: 25px;
 }
}
}
}
.table-heading{
  margin-bottom: 16px;
th{
  text-align: left;
}
}
.table-items{
  position: relative;
  margin-bottom: 24px;
.svg{
  position: absolute;
  top: 15px;
  right: 0;
  width: 12px;
  height: 16px;
}

}
}
}
.save{
  margin-top: 60px;
div{
  flex: 1;
}
.right{
  justify-content: flex-end;
}
}
}
}
.input {
  margin-bottom: 24px;
}
input,select {
  width: 100%;
  background: #1e2139;
  color: #ffffff;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
  padding: 12px 4px;
  border: none;
&:focus {
   outline: none;
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