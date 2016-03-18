var main = document.querySelector('#main');
var oLis = document.querySelectorAll(".slide>li");
var winW = window.innerWidth;   //获取设备宽度
var winH = window.innerHeight;  //获取设备高度
var desW = 640;  //设计稿宽度
var desH = 960;  //设计稿高度
//适配当前设备
/*main.style.webkitTransform = "scale(" + winH / desH + ")";*/  //缩小(scale)(设备的高度 / 设计稿的高度)
if (winW / winH > desW / desH) {
    main.style.webkitTransform = "scale(" + winW / desW + ")";
} else {
    main.style.webkitTransform = "scale(" + winH / desH + ")";
}
//类数组转换成数组循坏
//forEach循坏形参 当前元素
[].forEach.call(oLis, function () {
    arguments[0].index = arguments[1];  //arguments[1]把当前元素的索引赋值给arguments[0].index 当前元素的自定义属性index
    //addEventListener 添加DOM二级事件
    arguments[0].addEventListener('touchstart', start, false);  //手触摸的时候执行start方法 false 在冒泡阶段执行
    arguments[0].addEventListener('touchmove', move, false);  //滑动的时候执行move方法
    arguments[0].addEventListener('touchend', end, false);  //手松开的时候执行end方法
})
function start(e) {
    this.startY = e.changedTouches[0].pageY;  // changedTouches 类数组 所有触碰点集合 pageY 当前到body的垂直距离
}
function move(e) {
    e.preventDefault(); //阻止默认行为
    /*阻止默认行为*/
    var touchMove = e.changedTouches[0].pageY;  //把当前上/下的动态值赋给touchMove的变量
    var changePos = touchMove - this.startY;    //用动态值-startY固定值  判断是向下还是向上
    var cur = this.index;  //把当前元素的索引赋值给cur
    /*var step = 1/3;
    var scalePos =(Math.abs(changePos)/winH)*step; //取changePos绝对值 / 设备高度 * step(1/2)*/
    [].forEach.call(oLis,function(){
        if(arguments[1]!=cur){   //在move方法移动的时候，除了当前元素外，把所有元素都隐藏
            arguments[0].style.display="none";
        }
        //当前元素移动的时候，清除掉当前元素的class
        arguments[0].className="";
        arguments[0].firstElementChild.id="";  //清除当前元素子元素的第一个儿子id
    })
    if (changePos > 0) {/*往下滑*/
        var pos = -winH+changePos;
        //如果当前的索引是第一张就把上一张变成最后一张，否则减1
        this.preSIndex = cur == 0 ? oLis.length - 1 : cur - 1;
    } else if (changePos < 0) {/*往上滑*/
        var pos = winH+changePos;
        //如果当前的索引是最后一张就把上一张变成第一张，否则加1
        this.preSIndex = cur == oLis.length - 1 ? 0 : cur + 1;
    }
    // translate(x轴,y轴)平移 translateX(x轴平移) translateY(y轴平移)
    oLis[this.preSIndex].style.webkitTransform = "translateY("+pos+"px)";
    //当前元素显示在最上面
    oLis[this.preSIndex].className = "zIndex";
    oLis[this.preSIndex].style.display="block";
    //把当前元素按照比例缩放  1- 是因为要从大到小缩放  translate 平移的距离
    oLis[cur].style.webkitTransform = "scale("+(1/*-scalePos*/)+") translate(0,"+changePos+"px)";
}
function end(e) {  //手松开的时候
    oLis[this.preSIndex].style.webkitTransform ="translate(0,0)"; //平移结束
    oLis[this.preSIndex].style.webkitTransition="2s";  //动画的时间
    //addEventListener添加DOM二级事件 webkitTransitionEnd 动画结束
    oLis[this.preSIndex].addEventListener('webkitTransitionEnd',function(){
        this.style.webkitTransition="";
        this.firstElementChild.id = "a"+(this.index+1);
    },false);
}
/*音乐*/
window.addEventListener("load", function () {
    //init music
    var music = document.querySelector(".music");
    var musicAudio = music.querySelector("audio");
    //canplay:音频资源文件已经加载一部分,可以播放了
    //canplaythrough:音频文件已经全部加载完成,播放不会出现卡顿
    musicAudio.addEventListener("canplay", function () {
        music.style.display = "block";
        music.className = "music bounce";
    }, false);
    musicAudio.play();
    $t.tap(music, {
        end: function () {
            if (musicAudio.paused) {
                musicAudio.play();
                music.className = "music bounce";
                return;
            }
            musicAudio.pause();
            music.className = "music";
        }
    });
}, false);
document.addEventListener('touchmove',function(){

},false);
