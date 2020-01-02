<template>
    <div class="mine_content">
        <mt-header class="qj_header" title="早出晚归请假记录">
            <router-link to="/mine" slot="left">
                <mt-button @click="initial" icon="back">返回</mt-button>
            </router-link>
            <mt-button v-if="isShow_record" icon="more" @click="search" slot="right"></mt-button>
        </mt-header>
        <transition enter-active-class="animated slideInRight">
            <searchModule @s_condition="receive_c" leaveType="false" v-if="isShow_search" />
        </transition>
        <transition enter-active-class="animated slideInRight">
            <div v-if="isShow_record">
                <no-record v-if="leaveRecord == ''"/>
                <advanceDelyCard v-for="item in leaveRecord" 
                    :key="item.id" 
                    :advanceReason="item.advanceReason" 
                    :advanceTime="item.advanceTime" 
                    :adLeaveTime="item.adLeaveTime"
                    :delayReason="item.delayReason" 
                    :delayTime="item.delayTime" 
                    :deLeaveTime="item.deLeaveTime"
                />    
            </div>
        </transition>      
    </div>
</template>

<script>
import advanceDelyCard from '@/components/advanceDelyCard.vue'
import noRecord from '@/components/noRecord.vue'
import searchModule from '@/components/searchRecord.vue'
import {Indicator} from 'mint-ui'
export default {
    name:"zaozixiRecord",
    data(){
        return{
            headerObj:{
                title:"不留宿请假",
                back:true
            },
            leaveRecord:"",
            isShow_record:true,
            isShow_search:false,
        }
    },
    components:{
        advanceDelyCard,
        searchModule,
        noRecord
    },
    methods:{
        getRecord(){
            let _self = this;
            this.$ajax.get(_self.baseUrl + "/StudentLeave/advanceDelyRecord",{
                headers: {
                    'token': localStorage.token
                }
            }).then(function(response){
                console.log(response);
                if(response.data == "未登录"){
                   _self.notLogin(_self);
                }
                let resData = JSON.parse(response.data);
                _self.leaveRecord = resData;
            }).catch(function(error){
                console.log(error);
            });
        },
        receive_c(sTime,eTime){
            console.log(sTime,eTime);
            Indicator.open("搜索中...");
            let _self = this;
            this.$ajax.get(_self.baseUrl + "/StudentLeave/retrievalAdDely",{           
                params:{
                    StudentID:localStorage.StudentID,
                    stime:sTime,
                    etime:eTime,
                },
                headers: {
                    'token': localStorage.token
                }
            }).then(function(response){
                Indicator.close();
                if(response.data == "未登录"){
                    _self.notLogin(_self);
                }
                _self.leaveRecord = JSON.parse(response.data);
                _self.isShow_record = true;
                _self.isShow_search = false;
            }).catch(function(error){
                Indicator.close();
                _self.isShow_record = true;
                _self.isShow_search = false;
                console.log(error);
            });
            
        },
        initial(){
            this.isShow_record = true;
            this.isShow_search = false;
        },
        search(){
            this.isShow_record = false;
            this.isShow_search = true;
        },
    },
    mounted(){
        this.getRecord();
    }
}
</script>

<style scoped>


</style>
