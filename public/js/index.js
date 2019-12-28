(function(w){
    w.bindTapEvent = function(dom,callback){
        let startTime = 0;
        let isMove = false;
        dom.addEventListener("touchstart",function(){
            startTime = Date.now();
            // console.log(startTime);
        },false);
        dom.addEventListener("touchmove",function(){
            isMove = true;
        },false);
        dom.addEventListener("touchend",function(e){
            // console.log(Date.now() - startTime);
            if(Date.now() - startTime < 150 && !isMove){
                callback && callback.call(this,e);
            }
        },false);
    }

})(window);


