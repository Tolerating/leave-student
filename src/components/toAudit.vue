<template>
    <div class="c_main">
        <div class="card">
            <div class="c_header">{{title}}</div>
            <div class="c_body">
                <p>事由: <span>{{reason}}</span></p>
                <p>请假时间: <span>{{time}}</span></p>
            </div>
        </div>
    </div>
    <!-- <div class="c_main">
        <div class="card">
            <div class="c_header"><span>{{ title }}</span></div>
            <div class="c_body">
                <p>事&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;由:<span>{{ reason }}</span></p>
                <p>请假时间:<span>{{ putTime }}</span></p>
            </div>
        </div>
    </div> -->
</template>

<script>
export default {
    name:"toAudit",
    props:{
        title:String,
        reason:String,
        time:String
    }
}
</script>

<style scoped>
.c_main{
    width: 100%;
    padding:0px 10px 0px 10px;
}
.card{
    width:100%;
    margin:10px 0px 35px 0px;
    /* border: 1px solid black; */
    border-radius:10px;
}
.c_header{
    height:25px;
    color:black;
    font-size:15px;
    line-height:25px;
    text-align: center;
    color: #2f3542;
    border-top-left-radius: 30%;
    border-top-right-radius: 30%;
    background-color: #ef4f4f;
    /* border-bottom:1px solid black; */
}
.c_body{
    padding: 0px 5px 5px 5px;
    background-color: #c5c7d2;;
}
.c_body p{
    margin-top: 2px;
}
.c_body p span{
    margin-left: 10px;
}
/* .c_main{
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
} */
</style>
