<template>
   <div class="index_container">
        <div class="qj_content">
            <div class="mine_header" :style="{backgroundImage:'url('+ bg +')'}">
                <div class="mine_header_img">
                    <img src="img/l1.jpg">
                </div>
                <div class="mine_header_content">
                    <p>{{ studentName }}</p>
                    <p>{{ studentID }}  {{ studentClassName }}</p>
                </div>
            </div>
            <div class="mine_navbar">
                <ul>
                    <router-link tag="li" to="/mine/waitConsent">
                        <p>{{ auditNum }}</p>
                        <p>待审核</p>
                    </router-link>
                    <li>
                        <p>{{sumLeaveNum}}</p>
                        <p>请假总数</p>
                    </li>
                    <router-link tag="li" to="/mine/updatePwd">
                        <p>修改密码</p>
                    </router-link>
                </ul>
            </div>
            <mt-cell to="/mine/lessonLeaveRecord" is-link title="上课请假记录">
                <mt-badge type="primary">{{ lessonleaNum }}</mt-badge>
            </mt-cell>
            <mt-cell to="/mine/zaozixiRecord" is-link title="早自习请假记录">
                <mt-badge type="primary">{{ zaoxiNum }}</mt-badge>
            </mt-cell>
            <mt-cell to="/mine/weekLeaveRecord" is-link title="周末请假记录">
                <mt-badge type="primary">{{ weekNum }}</mt-badge>
            </mt-cell>
             <mt-cell to="/mine/notSleepRecord" is-link title="不留宿请假记录">
                <mt-badge type="primary">{{ notSleepNum }}</mt-badge>
            </mt-cell>
            <mt-cell to="/mine/delayEarlyRecord" is-link title="早出晚归请假记录">
                <mt-badge type="primary">{{ advanceDelyNum }}</mt-badge>
            </mt-cell>
            <mt-button @click="loginout" style="margin-top:15px;" type="danger" size="large">退出</mt-button>
            <Footer/>
        </div>
        <transition enter-active-class="animated fadeInRight">
            <keep-alive>
                <router-view/>
            </keep-alive>
        </transition>
        
    </div>
</template>

<script>
import { MessageBox } from 'mint-ui'
import Footer from '@/components/footer.vue'
export default {
    name:"mine",
    data(){
        return{
            studentName:localStorage.StudentName,
            studentID:localStorage.StudentID,
            studentClassName:localStorage.ClassName,
            bg:"img/xingkong.jpg",
            auditNum:0,
            lessonleaNum:0,
            zaoxiNum:0,
            weekNum:0,
            notSleepNum:0,
            advanceDelyNum:0,
        }
    },
    components:{
        Footer
    },
    methods:{
       loginout(){
           let _self = this;
            MessageBox.confirm('确定退出登录?').then(function(response) {
                localStorage.clear();
                localStorage.isLogin = false;
                // localStorage.token = "";
                _self.$router.push('login');
            }).catch(function(error){

            });
       },
       getAuditNum(){
           let _self = this;
           this.$ajax.get(_self.baseUrl + "/StudentLeave/getAuitNum",{
                headers: {
                    'token': localStorage.token
                }
            }).then(function(response){
                if(response.data == "未登录"){
                     _self.notLogin(_self);
                }
               _self.auditNum = response.data;
            }).catch(function(error){

            });
       },
       getOtherNum(){
           let _self = this;
           this.$ajax.get(_self.baseUrl + "/StudentLeave/selectLeaveCount",{ 
                headers: {
                    'token': localStorage.token
                }
            }).then(function(response){
                if(response.data == "未登录"){
                    _self.notLogin(_self);
                }
                let resData = JSON.parse(response.data);
               _self.lessonleaNum = Number(resData.lessonNum);
               _self.zaoxiNum = Number(resData.zaozixi);
               _self.weekNum = Number(resData.weekdays);
               _self.notSleepNum = Number(resData.notSleepLeave);
               _self.advanceDelyNum = Number(resData.ad);
            }).catch(function(error){
            });
       },
       checkLogin(){
          if(localStorage.isLogin === "false"){
              this.$router.push('login');
          }
      }
    },
    computed:{
        sumLeaveNum(){
            let num = this.lessonleaNum + this.notSleepNum + this.zaoxiNum + this.weekNum + this.advanceDelyNum;
            return num;
        }
    },
    mounted(){
        this.getAuditNum();
        this.getOtherNum();
        // this.checkLogin();
    }
}
</script>

<style scoped>
.qj_content{
    width: 100%;
    position: absolute;; 
    top:0px;
    bottom: 50px;
    left: 0;
    background-color: white;
}
.mine_header{
    width: 100%;
    height: 20%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
}
.mine_header_img{
    float: left;
    height: 100%;
    width:30%;
    padding: 20px;
}
.mine_header_img img{
    display: block;
    position: relative;
    top: 50%;
    border: 1px solid #fff;
    transform: translateY(-50%);
    height: 75px;
    width: 75px;
    border-radius: 50%;
}
.mine_header_content{
    float: left;
    position: relative;
    width: 70%;
    top: 50%; 
    transform: translateY(-50%);
    padding-left: 10px;
    
}
.mine_header_content p{
    color: white !important;
}
.mine_navbar{
    height: 10%;
    background-color: #f1f2f6;
    width: 100%;
}
.mine_navbar ul{
    width: 100%;
    height: 100%;
}
.mine_navbar ul li{
    float: left;
    width: 33.33%;
    text-align: center;
    position: relative;
    top:50%;
    transform: translateY(-50%);
}
.mine_navbar ul li p{
    padding: 0;
    margin: 0;
}
.mine_record{
    width: 100%;
}
.hide{
    display: none;
}
</style>
