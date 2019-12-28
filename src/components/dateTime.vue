<template>
    <div>
        <mt-field :label="tName" ref="triggerTime" disabled v-model="showTime" @click.native="tarDate" placeholder="选择时间"></mt-field>
        <mt-datetime-picker
            ref="picker"
            type="datetime"
            @confirm="setDate"
            hour-format="{value}时"
            minute-format="{value}分"
            v-model="selTime">
        </mt-datetime-picker>             
    </div>
</template>
<script>
let moment = require("moment");
export default {
    name:"dateTime",
    data(){
        return{
           selTime:new Date(),
           showTime:"" 
        }
    },
    props:{
        tName:{
            type:String,
            default:"请假时间"
        }
    },
    methods:{
        tarDate(){
            let _self = this;
            this.$refs.picker.open();
            this.$refs.picker.$el.classList.add("datetime");  
        },
        setDate(){
            this.showTime = moment(this.selTime).format("YYYY-MM-DD HH:mm");
            this.$emit("sendT",this.showTime);
        }
    },
    mounted(){
       
    }
    
}
</script>

<style scoped>
/* .datetime{
    margin-bottom: 50px;
} */
</style>
