export default{
    path:"/login",
    component:()=>import("@/views/login"),
    children:[
        {path:"forgetPwd",component:()=>import("@/views/login/forgetPwd.vue")},
    ]
}