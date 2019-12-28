<template>
    <div class="mine_content">
        <mt-header class="qj_header" title="待审核">
            <router-link to="/mine" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <no-record v-if="leaveRecord == ''"/>
        <Audit v-for="item in leaveRecord" 
            :key="item.key" 
            :title="item.title" 
            :time="item.time" 
            :reason="item.reason" 
        />
        
    </div>
</template>

<script>
import Audit from '@/components/toAudit.vue'
import noRecord from '@/components/noRecord.vue'
export default {
    name:"waitConsent",
    data(){
        return{
            leaveRecord:""
        }
    },
    components:{
        Audit,
        noRecord
    },
    methods:{
        getRecord(){
            let _self = this;
            this.$ajax.get(_self.baseUrl+"/StudentLeave/selectAudit",{  
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
        }
    },
    mounted(){
        this.getRecord();
    }
}
</script>

<style scoped>

</style>
