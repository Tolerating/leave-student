<template>
    <div style="margin-top: 20px;">
        <p style="color: #ff6348;font-size: 16px;">说明：如请假情况有误或者撤销请假请联系本班班主任</p>
        <div class="tel_main">
            <div class="tel_m_left">
                班
            </div>
            <div class="tel_m_right">
                {{chargeTeacher}}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"leaveExplain",
    data(){
        return{
            chargeTeacher:localStorage.headTeacherTel
        }
    },
    methods:{
      
    }
}
</script>

<style scoped>
.tel_main{
    width: 200px;
    height: 50px;
    background-color: #ecf0f1;
    border-radius: 50px;
    margin-top: 50px;
}
.tel_m_left{
    height: 50px;
    width: 50px;
    background-color: #ced6e0;
    float: left;
    border-radius: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 25px;
    font-family: "Microsoft Yahei"
}
.tel_m_right{
    height: 50px;
    width: 140px;
    padding-left: 60px;
    /* background-color: blue; */
    text-align: center;
    line-height: 50px;
    font-size: 18px;

}
</style>
