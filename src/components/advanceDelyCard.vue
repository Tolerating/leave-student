<template>
    <div class="c_main">
        <div class="card">
            <div class="c_header">早出晚归请假记录</div>
            <div class="c_body">
                <p>早出事由:<span>{{ adReason }}</span></p>
                <p>早出时间:<span>{{ adTime }}</span></p>
                <p>请假时间:<span>{{ adleaTime }}</span></p>
                <br>
                <p>晚归事由:<span>{{ deReason }}</span></p>
                <p>晚归时间:<span>{{ deTime }}</span></p>
                <p>请假时间:<span>{{ deleaTime }}</span></p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"advanceDelayCard",
    props:{
        advanceReason:String,
        advanceTime:String,
        adLeaveTime:String,
        delayReason:String,
        delayTime:String,
        deLeaveTime:String,
    },
    computed:{
        adReason(){
            if(this.advanceReason === ""){
                return "暂无"
            }else{
                return this.advanceReason;
            }
        },
        deReason(){
            if(this.delayReason === ""){
                return "暂无"
            }else{
                return this.delayReason;
            }
        },
        adTime(){
            if(this.advanceTime === "0001/1/1 0:00:00"){
                return "暂无"
            }else{
                return this.advanceTime;
            }
        },
        adleaTime(){
            if(this.adLeaveTime === "0001/1/1 0:00:00"){
                return "暂无"
            }else{
                return this.adLeaveTime;
            }
        },
        deTime(){
            if(this.delayTime === "0001/1/1 0:00:00"){
                return "暂无"
            }else{
                return this.delayTime;
            }
        },
        deleaTime(){
            if(this.deLeaveTime === "0001/1/1 0:00:00"){
                return "暂无"
            }else{
                return this.deLeaveTime;
            }
        }
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
    border-top-left-radius: 30%;
    border-top-right-radius: 30%;
    background-color: #ef4f4f;
    /* border-bottom:1px solid black; */
}
.c_body{
    background-color: #c5c7d2;;
    padding: 0px 5px 0px 5px;
}
.c_body p{
    margin-top: 2px;
}
.c_body p span{
    margin-left: 10px;
}
</style>
