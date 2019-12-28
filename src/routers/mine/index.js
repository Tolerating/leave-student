export default{
    path:"/mine",
    component:()=>import("@/views/mine"),
    children:[
        {path:"waitConsent",component:()=>import("@/views/mine/waitConsent.vue")},
        {path:"updatePwd",component:()=>import("@/views/mine/updatePwd.vue")},
        {path:"lessonLeaveRecord",component:()=>import("@/views/mine/lessonLeaveRecord.vue")},
        {path:"zaozixiRecord",component:()=>import("@/views/mine/zaozixiRecord.vue")},
        {path:"weekLeaveRecord",component:()=>import("@/views/mine/weekLeaveRecord.vue")},
        {path:"notSleepRecord",component:()=>import("@/views/mine/notSleepRecord.vue")},
        {path:"delayEarlyRecord",component:()=>import("@/views/mine/delayEarlyRecord.vue")},
    ]
}