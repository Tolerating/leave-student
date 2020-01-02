<template>
    <footer class="index_footer">
        <ul>
            <li>
                <router-link tag="span" class="footer_moudle" to="/applyLeave">
                    <i class="fa fa-pencil-square-o fa-lg"  aria-hidden="true"></i>
                    <p>请假</p>
                </router-link>
            </li>
            <li>
                <router-link tag="span" class="footer_moudle" to="/mine">
                    <i class="fa fa-user-o fa-lg"  aria-hidden="true"></i>
                    <p>我的</p>
                </router-link>
            </li>
            <!-- <router-link tag="li" to="/applyLeave">申请请假</router-link> -->
            <!-- <router-link tag="li" to="/mine">我的</router-link> -->
        </ul>
    </footer>
</template>

<script>
export default {
    name:"leaveFooter",
}
</script>

<style scoped>
.index_footer ul li{
    width: 50%;
    height: 50px;
    /* text-align: center; */
    position: relative;
    float: left;
    line-height: 50px;
    /* font-size: 18px; */
    translate: 2;
}
.footer_moudle{
    height: 50px;
    width: 50px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    cursor: pointer;
    /* color: red; */
    /* right: 0; */
}
.footer_moudle i{
    position: absolute;
    top: 7px;
    left: 0;
    right: 0;
}
.footer_moudle p{
    margin-top: 10px;
}
.index_footer ul li span.router-link-active{
    color: rgb(253, 253, 253);
}

</style>
