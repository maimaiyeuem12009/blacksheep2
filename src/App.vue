<script setup>
import NavBar from './component/NavBar.vue'
import FormModal from './component/FormModal.vue'
import CloseModal from './component/CloseModal.vue'
import Header from './component/Header.vue'
import { ref,computed } from "vue"
import { useStore } from 'vuex'

const store = useStore()
const formModal = computed(()=> store.state.formModal)
const closeModal = computed(()=> store.state.closeModal)
const mobile = ref(null)
const checkScreen = () =>{ mobile.value = window.innerWidth < 768 }
checkScreen()
window.addEventListener('resize',checkScreen)
</script>

<template>
  {{closeModal}}
  <div class="flex flex-col min-h-screen bg-purple-dark lg:flex-row" v-if="!mobile">
    <NavBar></NavBar>
    <div class="flex flex-col px-5 flex-1 relative text-white container">
      <transition name="form">
        <FormModal v-show="formModal"></FormModal>
      </transition>
      <CloseModal v-show="closeModal"/>
      <Header/>
      <router-view></router-view>
    </div>
  </div>
  <div v-else class="flex flex-col text-center justify-center h-screen w-screen text-white bg-black" >
    <h2 class="text-4xl">Sorry, this app is not supported on Mobile device</h2>
    <p class="text-2xl mt-6">To use this app, please use a computer</p>
  </div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap");
*{
  padding: 0;
  margin: 0;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  font-family: "Poppins",sans-serif;
}


// animating form
.form-enter-active,
.form-leave-active {
  transition: all 0.7s cubic-bezier(0.550,  0.085, 0.680, 0.530 );
}

.form-enter-from{
  transform: translateX(-100%);
}
.form-enter-to{
  transform: translateX(-0%);
}
.form-leave-to{
  transform: translateX(-100%);
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

.container {
  width: 100%;
  padding: 40px 10px;
  min-width: 850px;
  margin: 0 auto;

  @media (min-width: 900px) {
    padding-top: 72px;
  }
}

.nav-link {
  text-decoration: none;
  color: initial;
}

.status-button {
  &::before {
    content: "";
    width: 10px;
    height: 10px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    margin-right: 8px;
  }

  font-size: 12px;
  margin-right: 30px;
  align-items: center;
  padding: 8px 30px;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
}

.paid{
  &::before {
    background: #33d69f;
  }
  color: #ff8f00;
  background: rgba(51,214,160,0.1);
}
.pending{
  &::before {
    background: #ff8f00;
  }
  color: #ff8f00;
  background: rgba(255,145,0,0.1);
}
.draft {
  &::before {
    background-color: #dfe3fa;
  }
  color: #dfe3fa;
  background-color: rgba(223, 227, 250, 0.1);
}

.box {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
</style>
