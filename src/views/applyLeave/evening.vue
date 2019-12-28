<template>
    <div class="qj_content">
        <mt-header class="qj_header" title="晚归请假">
            <router-link to="/applyLeave" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <div style="padding:10px 10px 0px 10px">
            <mt-field label="请假事由:" type="text" class="bottomBorder" placeholder="请输入请假事由" v-model.trim="leaveReason"></mt-field>
            <dateTime @sendT="evening" tName="晚归时间:" class="bottomBorder"/>
            <mt-button type="primary" class="submitBtn" @click="subForm" size="large">提交假单</mt-button>
            <p class="remind">晚归时间为21:00之后</p>
            <explain/>
        </div>

    </div>
</template>

<script>
import { MessageBox } from 'mint-ui'
import qs from 'qs'
import dateTime from '@/components/dateTime.vue'
import explain from '@/components/explain.vue'
export default {
    name:"earlyLeave",
    data(){
        return{
           leaveReason:"",
           Time:""

        }
    },
    components:{
        dateTime,
        explain
    },
    methods: {
        evening(time){
            this.Time = time;
        },
        subForm(){
            if(new Date(this.Time).getHours() > "21"){
                MessageBox('提示', '晚归请假时间不能小于21点!');
                return false;
            }
            
            if(new Date().getTime()> new Date(this.Time).getTime()){
                 MessageBox('提示', '请选择正确的早出时间!');
                return false;
            }else if(this.leaveReason !== "" && this.Time !== ""){
                let _self = this;
                MessageBox.confirm("因"+ _self.leaveReason +"原因,需"+ 
                 ""+ _self.Time +"晚归","晚归请假").then(function(action){
                    _self.$ajax.post(_self.baseUrl + "/StudentLeave/insertIntoAdvanceDelay",{           
                        StudentID:localStorage.StudentID,
                        DReson:_self.leaveReason,
                        WTIME:_self.Time,
                        classID:localStorage.StudentClassID,
                        arriveCategory:"晚归"
                    },{
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'token': localStorage.token
                        },
                        transformRequest: [function (data) {
                            data = qs.stringify(data);
                            return data;
                        }],
                    }).then(function(response){
                        console.log(response);
                         if(response.data == "1"){
                            MessageBox('提示', '提交请假单成功!');
                        }else if(response.data == "未登录"){
                            _self.notLogin(_self);
                        }else{
                            MessageBox('提示', '提交请假单失败!');
                        }
                        _self.leaveReason = "";
                    }).catch(function(error){
                        MessageBox('错误', '提交请假单失败!');
                    });
                }).catch(function(action){
                    console.log(action);
                });
            }
        }
    }
}
</script>

<style scoped>
.submitBtn{
    margin-top: 40px;
}
.bottomBorder{
    border-bottom: 1px solid gray;
}
.remind{
    margin-top: 10px;
    font-size: 15px;
    text-align: center;
}
</style>

