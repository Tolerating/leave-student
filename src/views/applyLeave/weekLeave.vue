<template>
    <div class="qj_content">
        <mt-header class="qj_header" title="周末请假">
            <router-link to="/applyLeave" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <div style="padding:10px 10px 0px 10px">
            <mt-field label="请假时间:" class="bottomBorder" placeholder="周一早8:00——周五晚9点" readonly></mt-field>
            <mt-checklist
                id="chooseL"
                v-model="value"
                :options="['周五请假', '周六请假']">
            </mt-checklist>
            <mt-field label="请假事由:" type="text" class="bottomBorder" placeholder="请输入请假事由" v-model.trim="leaveReason"></mt-field>
            <mt-button type="primary" @click="subForm" class="submitBtn" size="large">提交假单</mt-button>
            <explain/>
        </div>
        
    </div>
</template>

<script>
let moment = require("moment");
import explain from '@/components/explain.vue'
import { MessageBox } from 'mint-ui'
import qs from 'qs'
export default {
    name:"weekLeave",
    data(){
        return{
           leaveReason:"",
           value:[]
        }
    },
    components:{
        explain
    },
    methods: {
        subForm(){
            let weekdayStartTime = moment().add(5 - new Date().getDay(),'days').format('YYYY-MM-DD');
            let weekdayEndTime = moment().add(6 - new Date().getDay(),'days').format('YYYY-MM-DD');
            console.log(weekdayStartTime,weekdayEndTime);
            if(this.value.length === 0){
                MessageBox("提示","请勾选周五或周六请假");
            }else if(this.leaveReason === ""){
                return false;
            }else{
                let _self = this;
                let leaveTime = "";
                if(this.value.length === 1){
                    leaveTime = this.value[0];
                    if(this.value[0] === "周五请假"){
                        weekdayEndTime = weekdayStartTime;
                    }else{
                        weekdayStartTime = weekdayEndTime;
                    }
                }else{
                    leaveTime = this.value[0];
                    leaveTime += ", " + this.value[1];
                }
                MessageBox.confirm("因"+ _self.leaveReason +"原因,需"+ 
                 ""+ leaveTime +"","周五周六请假").then(function(action){
                    _self.$ajax.post(_self.baseUrl + "/StudentLeave/InsertWeekDays",{           
                        WeekDaysStudentID:localStorage.StudentID,
                        WeekDaysReason:_self.leaveReason,
                        WeekDaysStartTime:weekdayStartTime,
                        WeekDaysEndtTime:weekdayEndTime,
                        WeekDaysNumDays:_self.getDayNum(weekdayStartTime,weekdayEndTime),
                        LeaveRecordClassNum:localStorage.StudentClassID
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
                        if(response.data == "-1"){
                            MessageBox('提示', '请勿重复提交假单!');
                        }else if(response.data == "0"){
                            MessageBox('错误', '提交请假单失败!');
                        }else if(response.data == "1"){
                            MessageBox('提示', '提交请假单成功!');
                        }else if(response.data == "未登录"){
                             _self.notLogin(_self);
                        }else{
                            MessageBox('错误', '提交请假单失败!');
                        }
                        
                        _self.leaveReason = "";
                        _self.value = [];
                    }).catch(function(error){
                        MessageBox('错误', '连接服务器失败!');
                    });
                }).catch(function(action){
                    console.log(action);
                });
            }
            
        },
        getDayNum(s,e){
            if (s == e) {
                return 1;
            } else {
                return ((Date.parse(e) - Date.parse(s)) / (24 * 60 * 60 * 1000))+1;
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
#chooseL a{
    display: inline !important;
}
</style>
