<template>
    <div class="login_container">
    	<div class="login_main">
    		<div class="login_logo">
    			<img src="img/logo.png" >
    		</div>
			<div class="login_input">
				<form method="post">
					<input type="number" name="name" v-model.trim="loginID" placeholder="学号" />
					<input type="password" name="pwd" v-model.trim="pwd" placeholder="密码"/>
					<router-link tag="a" src="#" to="/login/forgetPwd">忘记密码?</router-link>
					<button type="button" @click="loginLeave">登录</button>
				</form>
			</div>
    	</div>
		<transition enter-active-class="animated slideInRight">
            <router-view/>
        </transition>     
    </div>
</template>

<script>
import { MessageBox } from 'mint-ui'
import {Indicator} from 'mint-ui'
import qs from 'qs'
export default {
    name:"Login",
	data(){
		return{
			loginID:"",
			pwd:"",
		}
	},
	methods:{
		loginLeave(){
			if(this.loginID !== "" && this.pwd !== ""){
				Indicator.open("登录中...");
				let _self = this;
				this.$ajax.post(_self.baseUrl + "/LoginModule/loginLeave",{           
					Name:_self.loginID,
					Pwd:_self._self.pwd,
					
				},{
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
					transformRequest: [function (data) {
						data = qs.stringify(data);
						return data;
					}],
				}).then(function(response){
					console.log(response);
					let data = response.data;
					if(data.result == "0"){
						localStorage.token = response.data.message;
						_self.$ajax.get(_self.baseUrl + '/StudentLeave/GetStudentInfo',{
							headers: {
								'token': localStorage.token
							}
						})
						.then(function (response) {
							console.log("学生信息:",response.data);
							let resData = JSON.parse(response.data);
							localStorage.password = _self.pwd;
							localStorage.StudentID = _self.loginID;
							localStorage.StudentName = resData.StudentName;
							localStorage.StudentClassID = resData.StudentClassID;
							_self.$ajax.get(_self.baseUrl + '/StudentLeave/getClassInfo',{
								params:{
									classNum:localStorage.StudentClassID
								},
								headers: {
									'token': localStorage.token
								}
							})
							.then(function (response) {
								console.log("班级信息:",response);
								let resData = JSON.parse(response.data);
								localStorage.ClassName = resData.ClassName;
								localStorage.ClassHeadTeacherID = resData.ClassHeadTeacherID;
								_self.$ajax.get(_self.baseUrl + '/StudentLeave/headTeacherTel',{
									params:{
										teacherId:localStorage.ClassHeadTeacherID
									},
									headers: {
										'token': localStorage.token
									}
								})
								.then(function (response) {
									console.log(response);
									localStorage.headTeacherTel = response.data;
									localStorage.isLogin = true;
									Indicator.close();
									_self.$router.push('applyLeave');
								})
								.catch(function (error) {
									Indicator.close();
									MessageBox('班主任电话获取失败', '请再次登录!');
								});
							})
							.catch(function (error) {
								Indicator.close();
								MessageBox('错误', '请再次登录!');
							});
						})
						.catch(function (error) {
							Indicator.close();
							MessageBox('错误', '请再次登录!');
						});
						
					}else{
						Indicator.close();
						MessageBox('提示', '用户名或密码错误!');
					}
				}).catch(function(error){
					Indicator.close();
					MessageBox('错误', '连接服务器失败!');
				});
			}
		},
		judgeLogin(){
			if(localStorage.isLogin === "true"){
				this.$router.push('applyLeave');
			}
		}
		
	},
	mounted(){
		this.judgeLogin();
	}
}
</script>

<style scoped>
.login_main{
	width: 100%;
	height: 100%;
	padding: 50px;
}

.login_logo{
	margin-top: 20px;
	width: 100%;
	margin-bottom: 10px;
}

.login_logo img{
	display: block;
	margin: 0 auto;
}

.login_input{
	width: 100%;
}
.login_input form input{
	border: none;
	border-bottom: 1px solid black;
	background-color: transparent;
	width: 100%;
	height: 50px;
	margin-top: 10px;
	font-size: 18px;
	opacity: 0.7;
	text-align:center;
}

.login_input form a{
	float: right;
	margin-top: 5px;
	font-size: 15px;
}

.login_input form button{
	border: none;
	border-radius: 30px;
	background-color: #1e90ff;
	width: 100%;
	height: 50px;
	margin-top: 10px;
	font-size: 18px;
	text-align:center;
	outline: none;
}
</style>
