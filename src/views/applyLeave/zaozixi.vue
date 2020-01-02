<template>
    <div class="qj_content">
        <mt-header class="qj_header" title="早自习请假">
            <router-link to="/applyLeave" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <div style="padding:10px 10px 0px 10px">
            <mt-field label="请假事由:" type="text" class="bottomBorder" placeholder="请输入请假事由" v-model.trim="leaveReason"></mt-field>
            <dateTime @sendT="receivesT" tName="开始时间:" class="bottomBorder"/>
            <dateTime @sendT="receiveeT" tName="结束时间:" class="bottomBorder"/>
            <mt-button type="primary" class="submitBtn" @click="subForm" size="large">提交假单</mt-button>
            <explain/>
        </div>
    </div>
</template>

<script>
let moment = require("moment");
import dateTime from '@/components/dateTime.vue'
import { MessageBox } from 'mint-ui'
import { Toast } from 'mint-ui';
import explain from '@/components/explain.vue'
import qs from 'qs'
export default {
    name:"zaozixi",
    data(){
        return{
           leaveReason:"",
           sTime:"",
           eTime:""

        }
    },
    components:{
        dateTime,
        explain
    },
    methods: {
        receivesT(time){
            this.sTime = time;
        },
        receiveeT(time){
            this.eTime = time;
        },
        subForm(){
            if(this.eTime < this.sTime){
                MessageBox('提示', '结束时间不能小于开始时间');
            }else if(this.leaveReason !== "" && this.lessonNum !== "" && this.eTime !== "" && this.sTime !== ""){
                let _self = this;
                MessageBox.confirm("因"+ _self.leaveReason +"原因,需"+ 
                 ""+ _self.sTime +"至"+ _self.eTime +"请假"+ _self.getDayNum +"天","早自习请假").then(function(action){
                    _self.$ajax.post(_self.baseUrl + "/StudentLeave/insertLeaveRecord",{           
                        LeaveRecordCategory:"2",
                        LeaveRecordStudentID:localStorage.StudentID,
                        StudentName:localStorage.StudentName,
                        LeaveRecordSumLesson:0,
                        LeaveRecordReason:_self.leaveReason,
                        LeaveRecordStartTime:_self.sTime,
                        LeaveRecordEndtTime:_self.eTime,
                        LeaveRecordNumDays:_self.getDayNum,
                        TeacherID:localStorage.ClassHeadTeacherID,
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
                        if(response.data == '-7'){
                            MessageBox('错误', '提交请假单失败!');
                        }else if(response.data > 0){
                            MessageBox('提示', '提交请假单成功!');
                        }else if(response.data == "未登录"){
                             _self.notLogin(_self);
                        }else{
                            MessageBox('提示', '短信发送失败，请联系班主任进行确认！');
                        }
                        _self.leaveReason = "";
                    }).catch(function(error){
                        MessageBox('错误', '提交请假单失败!');
                    });
                }).catch(function(action){
                    MessageBox('错误', '连接服务器失败!');
                    // console.log(action);
                });
                
            }
        },
    },
    computed:{
        getDayNum(){
            console.log(this.eTime);
            let end = moment(this.eTime);
            let start = moment(this.sTime);
            let days = end.diff(start);
            return Math.round(days/(1000*60*60*24)) +1;
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
</style>
