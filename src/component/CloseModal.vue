<script setup>
import { useStore } from 'vuex'
const store = useStore()
const closeModal = () => {
  store.dispatch("toggleClose")
}
const closeInvoice = () => {
  closeModal()
  store.dispatch("toggleForm")
}
</script>

<template>
  <div class="modal flex">
    <div class="modal-content">
      <p>Are you sure you want to leave your change will not be saved</p>
      <div class="action flex">
        <button class="bg-red" @click="closeModal">Return</button>
        <button class="bg-purple" @click="closeInvoice">Close</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.modal{
  z-index: 100;
  position: fixed;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  .modal-content{
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    border-radius: 20px;
    padding: 48px 32px;
    min-width: 450px;
    background: #252945;
    color: #ffffff;
    p {
      text-align: center;
    }
    .action{
      margin-top: 24px;
      button{
        flex: 1;
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