<template>
    <div class="wa_content">
        <div style="padding:10px 10px 0px 10px">
            <dateTime @sendT="sTime_m" tName="开始时间:" class="bottomBorder"/>
            <dateTime @sendT="eTime_m" ref="eTime" tName="结束时间:" class="bottomBorder"/>
            <mt-field label="请假结果" v-if="leaveType === 'true'" readonly class="bottomBorder" @click.native="showSel" v-model="leaveResult" placeholder="请选择请假结果"></mt-field>        
            <mt-button type="primary" class="submitBtn" @click="determine" size="large">搜索</mt-button>      
            <div class="select" v-show="isShow === true">
                <transition 
                    enter-active-class="animated fadeInUp"
                    leave-active-class="animated fadeOutDown"
                >
                    <div v-show="isShow === true" class="select_content">
                        <div style="height:39px;border-bottom:1px solid #eaeaea">
                            <span @click="cancel" class="s_c_action s_c_cancel f_left">取消</span>
                            <span @click="confirm" class="s_c_action s_c_cancel f_right">确定</span>
                        </div>
                        <div class="clearFix">
                            <mt-picker :slots="slots" @change="onValuesChange"></mt-picker> 
                        </div>
                    </div>
                </transition>
                <div class="bg"></div>
        </div>
        </div>
        
        
    </div>       
</template>

<script>
import dateTime from './dateTime.vue'
import { MessageBox } from 'mint-ui'
export default {
    data(){
        return{
            sTime:"",
            eTime:"",
            isShow:false,
            leaveResult:"",
            selResult:"",
            slots: [
                {
                flex: 1,
                values: this.optionsArr,
                className: 'slot1',
                textAlign: 'center'
                },
            ]
        }
    },
    props:{
        optionsArr:Array,
        leaveType:String
    },
    components:{
        dateTime
    },
    methods:{
        sTime_m(time){
            this.sTime = time;
        },
        eTime_m(time){
            this.eTime = time;
        },
        determine(){
            if(this.eTime < this.sTime){
                MessageBox('提示', '结束时间不能小于开始时间!');
            }else if(this.sTime === "" && this.eTime === ""){
                this.$emit("s_condition",this.sTime,this.eTime,this.leaveResult);
            }else if(this.sTime !== "" && this.eTime !== "" && this.leaveResult !== ""){
                this.$emit("s_condition",this.sTime,this.eTime,this.leaveResult);
            }
        },
        cancel(){
            this.isShow = false;
        },
        showSel(){
            this.isShow = true;
        },
        confirm(){
            this.isShow = false;
            this.leaveResult = this.selResult;
        },
        onValuesChange(picker, values) {
            this.selResult = picker.getValues()[0];
        },

    },
    
}
</script>

<style scoped>
.wa_content{
    width: 100%;
    /* position: absolute;;  */
    /* top:40px; */
    /* height: 100%; */
    /* overflow: scroll; */
    /* left: 0; */
    /* padding-top: 40px; */
    /* padding-bottom: 50px; */
    background-color: white;
}
.submitBtn{
    margin-top: 40px;
}
.bottomBorder{
    border-bottom: 1px solid gray;
}
.datetime{
    margin-bottom: 50px;
}
.bg{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    background: #000;
}
.select{
    width: 100%;
}
.select_content{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 20;
    background-color:white;
}
.s_c_action{
    display: inline-block;
    width: 50%;
    text-align: center;
    line-height: 40px;
    font-size: 16px;
    color: #26a2ff;
}
</style>
