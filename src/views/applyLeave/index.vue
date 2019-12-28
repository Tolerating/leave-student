<template>
    <div class="index_container">
        <mt-header class="index_header" title="首页"></mt-header>
        <div class="index_content">
            <Shuffling/>
            <Navbar ref="test"/>
        </div>
        <Footer/>
        <transition enter-active-class="animated slideInRight">
            <router-view/>
        </transition>      
    </div>
</template>

<script>
import Navbar from '@/components/navbar.vue'
import Shuffling from '@/components/shuffling.vue'
import Footer from '@/components/footer.vue'
export default {
    name:"homePage",
    data(){
        return{
           
        }
    },
    components:{
        Footer,
        Navbar,
        Shuffling
    },
    methods: {
      checkLogin(){
          if(localStorage.isLogin === "false"){
              this.$router.push('login');
          }
      }
      
    },
    mounted(){
        // this.checkLogin();
    }
}
</script>

<style scoped>
.hide{
    display: none;
}
</style>
