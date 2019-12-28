<template>
  <div class="qj_content">
      <div class="img_m">
        <img src="img/noRecord.png">
        <p>暂无记录</p>
      </div>
      
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.qj_content{
    position: relative;
    top: 50px;
    left: 0;
    right:0;
    bottom: 0;
}
.img_m{
    width: 100px;
    height: 150px;
    text-align: center;
    left: 0;
    right: 0;
    position: absolute;
    transform: translateY(60%);
    font-size: 16px;
    margin: 0 auto;
}
.img_m img{
    width: 100px;
    height: 100px;
}
</style>