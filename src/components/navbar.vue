<template>
    <nav class="qj_navigation" >
        <ul ref="applyLeave">
            <li><a href="#"><router-link tag="img" data-title="上课请假" src="img/common.png" to="/applyLeave/lessonLeave"/><p>上课请假</p></a></li>
            <li><a href="#"><router-link tag="img" data-title="早自习请假" src="img/early.png" to="/applyLeave/zaozixi"/><p>早自习请假</p></a></li>
            <li><a href="#"><router-link tag="img" data-title="周末请假" src="img/week.png" to="/applyLeave/weekLeave"/><p>周末请假</p></a></li>
            <li><a href="#"><router-link tag="img" data-title="不留宿请假" src="img/common.png" to="/applyLeave/notSleep"/><p>不留宿请假</p></a></li>
            <li><a href="#"><router-link tag="img" data-title="早出请假" src="img/early.png" to="/applyLeave/earlyLeave"/><p>早出请假</p></a></li>
            <li><a href="#"><router-link tag="img" data-title="晚归请假" src="img/evening.png" to="/applyLeave/evening"/><p>晚归请假</p></a></li>
        </ul>
    </nav>
</template>
<script>
export default {
    name:"navbar",
    methods:{
        
    },
    mounted(){
        
    }
}
</script>
<style scoped>
.qj_navigation{
    width: 100%;
    height: 60%;
    background-color: rgba(162, 188, 206, 0.5);
    padding: 10px;
}

.qj_navigation ul{
    width: 100%;
    height: 100%;
}
.qj_navigation ul li{
    float: left;
    height: 31%;
    width: 50%;
    padding: 20px;
    color: aquamarine;
    font-family: 'Times New Roman', Times, serif;
}
.qj_navigation ul li a{
    height: 100%;
    width: 50%;
    display: block;
    margin: 0 auto;
}
.qj_navigation ul li a img{
    display: block;
    margin: 0 auto;
    height: 90%;
    width: 100%;
}
.qj_navigation ul li a p{
    text-align: center;
    margin-top: 4px;
}
</style>
