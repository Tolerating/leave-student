<template>
    <div class="c_main">
        <div class="card">
            <div class="c_header"><span>{{ title }}</span></div>
            <div class="c_body">
                <p>事&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;由:<span>{{ reason }}</span></p>
                <p>开始时间:<span>{{ sTime }}</span></p>
                <p>结束时间:<span>{{ eTime }}</span></p>
                <p>请假时间:<span>{{ putTime }}</span></p>
                <p>请假结果:<span>{{ status }}</span></p>
                <p v-if="title === '上课请假'">节&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;数: <span>{{ lessonNum }}节</span></p>
            </div>
        </div>
    </div>   
</template>

<script>
export default {
    name:"leaveCard",
    props:{
        title:String,
        reason:String,
        sTime:String,
        eTime:String,
        putTime:String,
        lessonNum:String,
        status:String
    }
}
</script>

<style scoped>
.c_main{
    width: 100%;
    height: 150px;
    padding:0px 15px 0px 15px;
    margin-bottom: 20px;
}
.card{
    width:100%;
    height: 100%;
}
.c_header{
    color:black;
    float: left;
    text-align: center;
    width: 30px;
    height: 100%;
    font-size: 20px;
    color: #2f3542;
    border-top-left-radius: 30%;
    border-bottom-left-radius: 30%;
    background-color: #ef4f4f;
    vertical-align: middle; 
    position: relative;
}
.c_header span{
    position: absolute;
    top:50%;
    left: 0;
    right: 0;
    transform: translateY(-50%);
}
.c_body{
    padding: 0px 5px 0px 5px;
    margin-left: 30px;
    background-color: #f1f2f6;
    height: 100%; 
}
.c_body p{
    margin-top: 2px;
}
.c_body p span{
    margin-left: 10px;
    font-weight: 700;
}
</style>
