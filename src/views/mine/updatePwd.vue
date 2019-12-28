<template>
<div class="mine_content">
    <mt-header class="qj_header" title="修改密码">
        <router-link to="/mine" slot="left">
            <mt-button @click="clearInput" icon="back">返回</mt-button>
        </router-link>
    </mt-header>
    <div class="login_input">
        <mt-field label="旧密码" placeholder="旧密码" :state="oldPwd_s" type="password" @change="checkOldPwd" v-model="oldPwd"></mt-field>
        <mt-field label="新密码" placeholder="新密码" type="password" v-model="newPwd"></mt-field>
        <mt-field label="确认密码" placeholder="确认密码" :state="rePwd_s" type="password" @change="checkRePwd" v-model="reNewPwd"></mt-field>
        <mt-button @click="updatePwd" style="margin-top:15px;" type="primary" size="large">修改</mt-button>
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
            oldPwd:"",
            newPwd:"",
            reNewPwd:"",
            oldPwd_s:"",
            rePwd_s:""
        }
    },
    components:{

    },
    methods:{
        updatePwd(){
            if(this.oldPwd !== "" && this.newPwd !== "" && this.reNewPwd !== ""){
                let _self = this;
                this.$ajax.get(_self.baseUrl+"/StudentLeave/updateStuPwd",{           
                    params:{
                        StuNum:localStorage.StudentID,
                        StuPwd:_self.reNewPwd
                    },
                     headers: {
                    'token': localStorage.token
                }
                }).then(function(response){
                    if(response.data == 1){
                         MessageBox.alert('密码修改成功').then(function(){
                            localStorage.isLogin = false;
                            _self.$router.push('/login');
                        });
                    } else if(response.data == "未登录"){
                        _self.notLogin(_self);
                    }else{
                        MessageBox("密码修改失败,请稍后再试!");
                    }
                   
                }).catch(function(error){
                    MessageBox("错误!");
                });
            }
        },
        checkOldPwd(){
            if(this.oldPwd !== localStorage.password){
                Toast('旧密码不一致');
                this.oldPwd_s = "error";
                this.oldPwd = "";
            }else{
                this.oldPwd_s = "success";
            }
        },
        checkRePwd(){
            if(this.reNewPwd !== this.newPwd){
                this.rePwd_s = "error";
                Toast('两次密码输入不一致');
                this.reNewPwd = "";
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
        }
    }
}
</script>

<style scoped>
.login_input{
	width: 100%;
}

</style>
