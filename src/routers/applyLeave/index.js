export default{
    path:"/applyLeave",
    component:()=>import("@/views/applyLeave"),
    children:[
        {path:"lessonLeave",component:()=>import("@/views/applyLeave/lessonLeave.vue")},
        {path:"zaozixi",component:()=>import("@/views/applyLeave/zaozixi.vue")},
        {path:"weekLeave",component:()=>import("@/views/applyLeave/weekLeave.vue")},
        {path:"notSleep",component:()=>import("@/views/applyLeave/notSleep.vue")},
        {path:"earlyLeave",component:()=>import("@/views/applyLeave/earlyLeave.vue")},
        {path:"evening",component:()=>import("@/views/applyLeave/evening.vue")},
    ]
}