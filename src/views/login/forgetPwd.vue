<template>
<div class="wa_content">
    <mt-header class="qj_header" title="忘记密码">
        <router-link to="/login" slot="left">
            <mt-button @click="clearInput" icon="back">返回</mt-button>
        </router-link>
    </mt-header>
    <div class="login_input">
        <mt-field label="学号" placeholder="请输入学号" :readonly="isStuIDreadonly" ref="stuID" type="number" v-model="stuID"></mt-field>
        <mt-field label="验证码:" placeholder="请输入验证码" type="text" v-model="code">
            <mt-button @click="verifyCode" :disabled="disvCode" ref="vCode" size="small">{{vCodeTitle}}</mt-button>
        </mt-field>
        <mt-field label="新密码" placeholder="新密码" v-if="code === serverCode" :state="rePwd_s" type="password" v-model="newPwd"></mt-field>
        <mt-field label="确认密码" placeholder="确认密码" v-if="code === serverCode" :state="rePwd_s" type="password" @change="checkRePwd" v-model="reNewPwd"></mt-field>
        <mt-button @click="updatePwd" ref="update" :disabled="isShow" style="margin-top:15px;" type="primary" size="large">修改</mt-button>
    </div>
</div>
</template>

<script>
import { MessageBox } from 'mint-ui';
import { Toast } from 'mint-ui';
export default {
    name:"updatePwd",
    data(){
        return{
            stuID:"",
            isStuIDreadonly:false,
            code:"",
            serverCode:"123",
            newPwd:"",
            reNewPwd:"",
            rePwd_s:"",
            isShow:true,
            disvCode:false,
            disTime:60,
            vCodeTitle:"获取验证码"
        }
    },
    components:{

    },
    methods:{
        updatePwd(){
            if(this.stuID !== "" && this.newPwd !== "" && this.reNewPwd !== ""){
                let _self = this;
                this.$ajax.post(_self.baseUrl + "/LoginModule/upStuPwd",{           
                    ID:localStorage.StudentID,
                    passnew:_self.reNewPwd
                },{
                    headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
					transformRequest: [function (data) {
						data = qs.stringify(data);
						return data;
					}],
                }).then(function(response){
                    if(response.data == 1){
                         MessageBox.alert('密码修改成功').then(function(){
                            localStorage.isLogin = false;
                            localStorage.code = null;
                            _self.$router.push('/login');
                        });
                    }else{
                        MessageBox("密码修改失败,请稍后再试!");
                    }
                   
                }).catch(function(error){
                    MessageBox("错误!");
                });
            }
        },
        checkRePwd(){
            if(this.reNewPwd !== this.newPwd){
                this.rePwd_s = "error";
                Toast('两次密码输入不一致');
                this.reNewPwd = "";
                this.isShow = true;
            }else{
                this.rePwd_s = "success";
            }
        },
        clearInput(){
            this.oldPwd_s = "";
            this.rePwd_s = "";
            this.oldPwd = "";
            this.newPwd = "";
            this.reNewPwd = "";
        },
        verifyCode(){
            if(this.stuID !== ""){
                let _self = this;
                this.$ajax.get(_self.baseUrl + "/LoginModule/sendSMS",{           
                    params:{
                        userID:_self.stuID, 
                        post:"学生"                       
                    },
                    headers:{
                        'token': localStorage.token
                    }
                }).then(function(response){
                    if(response.data == -7){
                         MessageBox('学生预留手机号码不存在');
                    }else if(response.data == -1){
                        MessageBox("短信发送失败,请稍后再试!");
                    }else if(response.data > 0){
                        Toast({
                            message: '短信发送成功',
                            duration:2000
                        });
                        localStorage.code = String(response.data);
                        _self.serverCode = localStorage.code;
                        _self.isStuIDreadonly = true;
                        _self.disvCode = true;
                        let countDown = setInterval(function(){
                            if(_self.disTime !== 0){
                                _self.vCodeTitle = _self.disTime--;
                            }else{
                                clearInterval(countDown);
                                _self.disvCode = false;
                                _self.disTime = 60;
                                _self.vCodeTitle = "获取验证码";
                            }                            
                        },1000);
                    }                   
                }).catch(function(error){
                    MessageBox("服务器错误!");
                });
            }
        },
        test(){
            console.log(this.$refs.stuID);
        }
    },
    watch:{
        reNewPwd(value){
            if(value === this.newPwd){
                this.isShow = false;
            }else{
                this.isShow = true;
            }
        }
    },
    mounted(){
        this.test();
    }
}
</script>

<style scoped>
.wa_content{
    width: 100%;
    position: absolute;; 
    top:0px;
    bottom: 0px;
    left: 0;
    background-color: white;
}
.login_input{
	width: 100%;
}
</style>
