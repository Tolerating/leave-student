<template>
    <div class="qj_shuffling" ref="qj_shuffling">
        <!-- <ul @touchstart="tStart($event)"
            @touchmove="tMove($event)"
            @touchend="tEnd($event)"
            @transitionend="transtionEnd()"
        >
            <li><a href="#"><img src="img/l4.jpg" alt=""></a></li>
            <li><a href="#"><img src="img/l1.jpg" alt=""></a></li>
            <li><a href="#"><img src="img/l2.jpg" alt=""></a></li>
            <li><a href="#"><img src="img/l3.jpg" alt=""></a></li>
            <li><a href="#"><img src="img/l4.jpg" alt=""></a></li>
            <li><a href="#"><img src="img/l1.jpg" alt=""></a></li>
        </ul>
        <ul>
            <li class="now"></li>
            <li></li>
            <li></li>
            <li></li>
        </ul> -->
        <mt-swipe style="width:100%;height:100%;" :auto="3000" :speed="1500">
            <mt-swipe-item><img class="imgs" src="img/l1.jpg" alt=""></mt-swipe-item>
            <mt-swipe-item><img class="imgs" src="img/l2.jpg" alt=""></mt-swipe-item>
            <mt-swipe-item><img class="imgs" src="img/l3.jpg" alt=""></mt-swipe-item>
            <mt-swipe-item><img class="imgs" src="img/l4.jpg" alt=""></mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
export default {
    name:"shuffling",
    data(){
        return{
            index:1,
            time:"",
            imgBox:"",
            listBox:"",
            widthNow:"",
            startX:0,
            distanceX:0,
            isMove:0,

        };
    },
    methods:{
        tStart(e){
            this.startX = e.changedTouches[0].clientX;
            // clearInterval(this.time);
        },
        tMove(e){
            let moveX = e.changedTouches[0].clientX;
            this.distanceX = moveX - this.startX;
            let translateX = -this.index*this.widthNow + (moveX - this.startX);
            this.removeTransition(); 
            this.setTransform(translateX);
            this.isMove = true;
        },
        tEnd(e){
            let endX = e.changedTouches[0].clientX;
            let endDis = endX - this.startX;
            let transDis = this.widthNow - this.distanceX;
            this.setTransiton();
            if(this.isMove){
                if(Math.abs(endDis) > this.widthNow/4){
                    if(endDis <0){  //左滑
                        this.index ++;
                    }else{    //右滑
                        this.index --; 
                    }
                }
                this.setTransform(-this.index*this.widthNow);
            }
            this.startX = 0;
            this.distanceX = 0;
            this.isMove = false;
            clearInterval(this.time);
            let Nthis = this;
            this.time = setInterval(function(){
                Nthis.index ++;
                Nthis.setTransiton();
                Nthis.setTransform(-Nthis.index*Nthis.widthNow);
            },2000);
        },
        transtionEnd(){
            if(this.index >= 5){
                this.index=1;
                this.removeTransition();
                this.setTransform(-this.index*this.widthNow);
            }else if(this.index <= 0){
                this.index = 4;
                this.removeTransition();
                this.setTransform(-this.index*this.widthNow);
            }
            this.listBox.forEach(function(index){
                index.classList.remove("now");
            });
            this.listBox[this.index-1].classList.add("now");
        },
        shuffling(){
            let shuffling = document.querySelector(".qj_shuffling");
            this.widthNow = shuffling.offsetWidth;
            let Nthis = this;
            // console.log(this.index);
            // console.log(widthNow);
            this.imgBox = shuffling.querySelector("ul:first-child");
            this.listBox = shuffling.querySelectorAll("ul:last-child li");
            // console.log(this.imgBox);
            this.index =1;
            let time = setInterval(function(){
                Nthis.index++;
                Nthis.setTransiton();
                Nthis.setTransform(-Nthis.index*Nthis.widthNow);
            },2000);
            this.time = time;
        },
        setTransiton(){
            this.imgBox.style.transition = "all 1s";
            this.imgBox.style.webkitTransition = "all 1s";
        },
        setTransform(translateX){
            this.imgBox.style.transform = 'translateX('+ translateX +'px)';
            this.imgBox.style.webkitTransform = 'translateX('+ translateX +'px)';
        },
        removeTransition(){
            this.imgBox.style.transition = "none";
            this.imgBox.style.webkitTransition = "none";
        }
    },
    mounted(){
        // this.shuffling();
    }
}
</script>

<style scoped>
.qj_shuffling{
    width: 100%;
    height:40%;
    position: relative;
    overflow: hidden;
}
.imgs{
    width: 100%;
    height: 100%;
}

/* .qj_shuffling ul:first-child{
    width: 1000%;
    height: 100%;
    float: left;
    transform: translateX(-10%);
    -webkit-transform: translateX(-10%);
    
}
.qj_shuffling ul:first-child li{
    width: 10%;
    height: 100%;
    float: left;
}
.qj_shuffling ul:first-child li a{
    display: block;
    width: 100%;
    height: 100%;
}

.qj_shuffling ul:first-child li a img{
    display: block;
    width: 100%;
    height: 100%;
    
}
.qj_shuffling ul:last-child{
    width: 64px;
    position:absolute;
    bottom: 5px;
    margin-left: -32px;
    left: 50%;
}
.qj_shuffling ul:last-child li{
    border: 1px solid #fff;
    border-radius: 3px;
    margin-left: 10px;
    width: 6px;
    height: 6px;
    float: left;
}
.qj_shuffling .now{
    background: #fff;
} */
</style>
