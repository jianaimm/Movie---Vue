//动画帧兼容
(function() {
	var lastTime = 0;
	var vendors = ['webkit', 'moz'];
	for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
	    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
	    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||    // name has changed in Webkit
	                                  window[vendors[x] + 'CancelRequestAnimationFrame'];
	}

	if (!window.requestAnimationFrame) {
	    window.requestAnimationFrame = function(callback, element) {
	        var currTime = new Date().getTime();
	        var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
	        var id = window.setTimeout(function() {
	            callback(currTime + timeToCall);
	        }, timeToCall);
	        lastTime = currTime + timeToCall;
	        return id;
	    };
	}
	if (!window.cancelAnimationFrame) {
		window.cancelAnimationFrame = function(id) {
	    	clearTimeout(id);
		};
	}
}());

//动画形式公式
var Tween = {
	linear: function (t, b, c, d){
		return c*t/d + b;
	},
	easeIn: function(t, b, c, d){
		return c*(t/=d)*t + b;
	},
	easeOut: function(t, b, c, d){
		return -c *(t/=d)*(t-2) + b;
	},
	easeBoth: function(t, b, c, d){
		if ((t/=d/2) < 1) {
			return c/2*t*t + b;
		}
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInStrong: function(t, b, c, d){
		return c*(t/=d)*t*t*t + b;
	},
	easeOutStrong: function(t, b, c, d){
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeBothStrong: function(t, b, c, d){
		if ((t/=d/2) < 1) {
			return c/2*t*t*t*t + b;
		}
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	elasticIn: function(t, b, c, d, a, p){
		if (t === 0) {
			return b;
		}
		if ( (t /= d) == 1 ) {
			return b+c;
		}
		if (!p) {
			p=d*0.3;
		}
		if (!a || a < Math.abs(c)) {
			a = c;
			var s = p/4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	elasticOut: function(t, b, c, d, a, p){
		if (t === 0) {
			return b;
		}
		if ( (t /= d) == 1 ) {
			return b+c;
		}
		if (!p) {
			p=d*0.3;
		}
		if (!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	elasticBoth: function(t, b, c, d, a, p){
		if (t === 0) {
			return b;
		}
		if ( (t /= d/2) == 2 ) {
			return b+c;
		}
		if (!p) {
			p = d*(0.3*1.5);
		}
		if ( !a || a < Math.abs(c) ) {
			a = c;
			var s = p/4;
		}
		else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		if (t < 1) {
			return - 0.5*(a*Math.pow(2,10*(t-=1)) *
					Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		}
		return a*Math.pow(2,-10*(t-=1)) *
				Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
	},
	backIn: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
		   s = 1.70158;
		}
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	backOut: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 1.30158;  //回缩的距离
		}
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	backBoth: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 1.70158;
		}
		if ((t /= d/2 ) < 1) {
			return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		}
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	bounceIn: function(t, b, c, d){
		return c - Tween['bounceOut'](d-t, 0, c, d) + b;
	},
	bounceOut: function(t, b, c, d){
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
		}
		return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
	},
	bounceBoth: function(t, b, c, d){
		if (t < d/2) {
			return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
		}
		return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
	}
}
// 获取或者设置样式
function css(el,attr,val){//三个参数是设置，两个是获取；
	var transform = ['rotate','rotateX','rotateY','rotateZ','scale','scaleX','scaleY','skewX','skewY','translateX','translateY','translateZ'];
	for(var i = 0; i < transform.length; i++){
		if(attr == transform[i]){
			return setTransform(el,attr,val);
		}
	}
	if(arguments.length == 2){
		if(el.currentStyle){
			val = el.currentStyle[attr];
		} else {
			val = getComputedStyle(el)[attr];
		}
		if(attr == "opacity"){
			return val*100;
		}
		return parseFloat(val);
	} else {
		if(attr == "opacity"){
			el.style.opacity = val/100;
			el.style.filter = "alpha(opacity= "+val+")";
		} else if(attr == "zIndex"){
			el.style[attr] = Math.round(val);
		}else {
			el.style[attr] = val + "px";
		}
	}
}
//获取设置transform；
function setTransform(el,attr,val){//三个参数是设置，两个是获取；
	if(!el.transform){
		el.transform = {};
		//如果元素没有这个自定义属性我们就创建一下，格式是个对象
	}
	if(typeof val == "undefined"){
		return el.transform[attr];//属性值不存在，代表是要获取属性，不是设置；
	} else {//传入val,表示要设置属性；
		el.transform[attr] = val;
		var value = "";
		for(var s in el.transform){
			//console.log(s,el.transform[s]);
			switch(s){
				case "rotate":
				case "rotateX":
				case "rotateY":
				case "rotateZ":
				case "skewX":
				case "skewY":
					value += (s+"("+el.transform[s]+"deg) ");
					break;
				case "translateX":
				case "translateY":
				case "translateZ":
					value += (s+"("+el.transform[s]+"px) ");
					break;
				case "scale":
				case "scaleX":
				case "scaleY":
					value += (s+"("+el.transform[s]/100+") ");
					break;
			}
		}
		el.style.WebkitTransform = value;
		el.style.MozTransform = value;
		el.style.msTransform = value;
		el.style.transform = value;
	}
}
/*
 startMove(init)
 init{
 	el: el,要动画的元素
	target: {
		attr: val
	},
	time: 动画时间，
	type: '动画形式'，
	callBack: 动画结束后，回调函数fn,
	callIn: 动画同时执行的函数fn2
 }
 * */
//执行动画
function startMove(init){
	cancelAnimationFrame(init.el.timer);
	init.time = init.time>0&&init.time<200?200:init.time;
	var t = 0;
	var b = {};
	var c = {};
	var d = Math.ceil(init.time/20);
	for( var s in init.target){
		b[s] = css(init.el,s);
		c[s] = init.target[s] - b[s];
	}
	init.el.timer = requestAnimationFrame(move);
	function move(){
		t++;
		if(t > d){
			clearInterval(init.el.timer);
			init.callBack&&init.callBack();
		} else {
			for(var s in init.target){
				var val = Tween[init.type](t,b[s],c[s],d);
				css(init.el,s,val);
			}
			init.callIn&&init.callIn();
			init.el.timer = requestAnimationFrame(move);
		}
	}
}
/*
init: {
	wrap: el, 滑动区域
	//scroll: el, 移动的元素 (一般移动的元素wrap.chilren[0])
	[dir:('x'|'y')] dir 滑动方向默认为Y默认y
	over: "ease","backOut","none" 超出之后，需要怎么处理(ease：平滑回来，backOut：回弹，none:不允许超出)
	showBar: (true||false) 是否显示滚动条,默认值为true
	start:fn 按下时的回调
	move: fn 移动时的回调
	up: fn 抬起时的回调
	end: fn 动画结束时的回调
}
*/
//mScroll(init)手机拖拽滑动函数；
function mScroll(init){
	var IN = { //配置参数
		dir: "y",
		over: "backOut",
		showBar: true
	};
	for(var s in init){
		IN[s] = init[s];
	}
	IN.scroll = IN.wrap.children[0];//被滑动的元素
	var startPoint = {};//初始手指位置
	var startElOffset = {};//初始元素位置
	var lastSpeed = 0;
	var lastTime = 0;
	var lastP = {};
	var bar;
	var scale = 1;
	var offMove = true;
	var MaxT = {
		x:0,
		y:0
	};
	var MinT = {
		x:0,
		y:0
	};
	var F = .3;//拉力系数
	var isFrist = true;
	var isMove = {x:false,y:false};//是否是复合我们要求的方向
	var MoveType = "easeOutStrong";//动画形式
	css(IN.scroll,"translateX",0);
	css(IN.scroll,"translateY",0);
	css(IN.scroll,"translateZ",.01);//3d硬件加速；

	//不能让内容比父级高度小，会出问题
	IN.scroll.style.minHeight = "100%";
	IN.scroll.style.minWidth = "100%";

	if(IN.showBar){
		bar = document.createElement("div");
		bar.className = "bar";
		if(getComputedStyle(IN.wrap)["position"] == "static"){
			IN.wrap.style.position = "relative";
		}
		bar.style.cssText = "position:absolute;background:rgba(0,0,0,.4);border-radius:3px;transition:.6s opacity;opacity:0;";
		if(IN.dir == "x"){
			bar.style.cssText += "height:6px;left:0;bottom:0;";
			scale = IN.wrap.clientWidth/IN.scroll.offsetWidth;
			bar.style.width = IN.wrap.clientWidth * scale + "px";
		} else {
			bar.style.cssText += "width:6px;right:0;top:0;";
			scale = IN.wrap.clientHeight/IN.scroll.offsetHeight;
			bar.style.height = IN.wrap.clientHeight * scale + "px";
		}
		IN.wrap.appendChild(bar);
	}
	IN.wrap.addEventListener('touchstart', function(e) {
		clearInterval(IN.scroll.timer);
		IN.start&&IN.start();
		var touch = e.changedTouches[0];
		startPoint = {
			x: Math.round(touch.pageX),
			y: Math.round(touch.pageY)
		}
		startElOffset = getScroll();
		MinT = {
			x: IN.wrap.clientWidth - IN.scroll.offsetWidth,
			y: IN.wrap.clientHeight - IN.scroll.offsetHeight
		};
		lastSpeed = 0;
		lastTime = Date.now();
		lastP = {x:startPoint.x,y:startPoint.y};
		isFrist = true;
		isMove = {
			x: false,
			y: false
		}
		if(IN.dir == "x"){
			scale = IN.wrap.clientWidth/IN.scroll.offsetWidth;
			bar.style.width = IN.wrap.clientWidth * scale + "px";
		} else {
			scale = IN.wrap.clientHeight/IN.scroll.offsetHeight;
			bar.style.height = IN.wrap.clientHeight * scale + "px";
		}
	});
	IN.wrap.addEventListener('touchmove', function(e) {
		if(isMove[(IN.dir == "x"?"y":"x")]){
			return;
		}
		var touch = e.changedTouches[0];
		var nowPoint = {
			x: Math.round(touch.pageX),
			y: Math.round(touch.pageY)
		};
		if(lastP.x == nowPoint.x&&lastP.y == nowPoint.y){
			return;
		}
		var dis = {
			x: nowPoint.x - startPoint.x,
			y: nowPoint.y - startPoint.y
		};
		if(isFrist){
			//第一次移动的时候
			if(Math.abs(dis.x) > Math.abs(dis.y)&&Math.abs(dis.x) > 2){
					isMove.x = true;
					isFrist = false;
					return;
			}
			if(Math.abs(dis.x) < Math.abs(dis.y) && Math.abs(dis.y) > 2 ) {
				isMove.y = true;
				isFrist = false;
				return;
			}
			if(Math.abs(dis.y) > 2 && Math.abs(dis.x) > 2 ) {
				isMove[IN.dir] = true;
				isFrist = false;
				return;
			}
			return;
			//按照我们要求在移动的时候，再去显示滚动条
		}
		if(isMove[IN.dir]){
			bar&&(css(bar,"opacity",100));
		}
		var nowTime = Date.now();
		var traslate = {
			x: dis.x + startElOffset.x,
			y: dis.y + startElOffset.y
		}
		if(IN.over == "none"){
			traslate[IN.dir] = Math.min(traslate[IN.dir],MaxT[IN.dir]);
			traslate[IN.dir] = Math.max(traslate[IN.dir],MinT[IN.dir]);
		} else if(IN.over == "ease"||IN.over == "backOut"){
			if(traslate[IN.dir] > MaxT[IN.dir]){
				traslate[IN.dir] *= F;
			} else if(traslate[IN.dir] < MinT[IN.dir]) {
				var over = traslate[IN.dir] - MinT[IN.dir];
				over *= F;
				traslate[IN.dir] = MinT[IN.dir] + over;
			}
		}
		if(IN.dir == "x")
		{
			css(IN.scroll,"translateX",traslate.x);

		} else {
			css(IN.scroll,"translateY",traslate.y);
		}
		bar&&(css(bar,IN.dir == "x"?"left":"top",-traslate[IN.dir]*scale));
		lastSpeed = (nowPoint[IN.dir] - lastP[IN.dir])/(nowTime - lastTime);
		lastTime = nowTime;
		lastP = {
			x: nowPoint.x,
			y: nowPoint.y
		};
		IN.move&&IN.move();
	});
	IN.wrap.addEventListener('touchend', function(e) {
		if(isMove[(IN.dir == "x"?"y":"x")]){
			return;
		}
		if(Date.now()-lastTime > 100){
			lastSpeed = 0;
		}
		lastSpeed = Number(lastSpeed)?lastSpeed:0;
		var time = 220;
		var dis = lastSpeed*time;
		var target = getScroll()[IN.dir] + dis;

		// 目标过界限制
		if(IN.over == "backOut"
		 &&(MaxT[IN.dir] < target||MinT[IN.dir] > target)){
		 	MoveType = "backOut";
		} else {
			MoveType = "easeOutStrong";
		}
		target = Math.min(MaxT[IN.dir],target);
		target = Math.max(MinT[IN.dir],target);
		//重置滑动时间
		time = Math.abs(target - getScroll()[IN.dir])*1.7;

		target = (IN.dir == "x"?{translateX:target}:{translateY:target});
		easeMove({
			el: IN.scroll,
			target:target,
			time:time,
			type: MoveType,
			callBack: function(){
				bar&&(css(bar,"opacity",0));
				IN.move&&IN.move();
				IN.end&&IN.end();
			},
			callIn: function(){
				var traslate = getScroll();
				bar&&(css(bar,IN.dir == "x"?"left":"top",-traslate[IN.dir]*scale));
				IN.move&&IN.move();
			}
		});
		IN.up&&IN.up();
		offMove = true;
		isMove = true;
		isFrist = true;
	});
	function getScroll(){ //获取当前的滚动位置
		return {x:css(IN.scroll,"translateX"),y:css(IN.scroll,"translateY")};
	}
}
/*
 easeMove(init),(效果同startMove,只是加了一个缓冲动画)
 init{
 	el: el,要动画的元素
	target: {
		attr: val
	},
	time: 动画时间，
	type: '动画形式'，
	callBack: 动画结束后，回调函数fn,
	callIn: 动画同时执行的函数fn2
 }
 * */
//运用同startMove(init),只是easeMove(init)里加了一个缓冲动画；
function easeMove(init){
	if(init.type != "easeOutStrong"){
		startMove(init);
		return;
	}
	var F = .08;
	cancelAnimationFrame(init.el.timer);
	init.el.timer = requestAnimationFrame(move);
	function move(){
		var isOver = true;
		var now = {};
		for( var s in init.target){
			var speed = (init.target[s] - css(init.el,s))*F;
			speed = speed>0?Math.ceil(speed):Math.floor(speed);
			now[s] = css(init.el,s) + speed;
			if(Math.abs(init.target[s] - now[s])<2){
				now[s] = init.target[s];
			} else {
				isOver = false;
			}
		}
		for(var s in now){
			css(init.el,s,now[s]);
		}
		if(isOver){
			init.callBack&&init.callBack();
		} else {
			init.callIn&&init.callIn();
			init.el.timer = requestAnimationFrame(move);
		}
	}
}
/*
touchEvent(init)封装常用的一些事件
init:{
	el:el,要添加事件的元素
	tap:fn, 点击
	longTap:fn, 长按
	singleTap:fn, 单击
	doubleTap:fn, 双击
	swipe: fn,滑动
	swipeLeft: fn,向左滑动
	swipeRight: fn,向右滑动
	swipeUp: fn,向上滑动
	swipeDown: fn向下滑动
}
*/
//滑屏事件，手势操作；当不操作在元素上，直接进行屏幕切换时，叫滑动；
function touchEvent(init){
	var el = init.el;
	var isTap = true;//是否发生点击
	//在按下和抬起之间没有发生过移动,就是点击
	var isDblTap = false;
	var lastPoint = {};
	var startPoint = {};
	var dbTimer = 0;
	var longTapTimer = 0;
	el.addEventListener('touchstart', function(e) {
		lastPoint = {
			x: Math.round(e.changedTouches[0].clientX),
			y: Math.round(e.changedTouches[0].clientY)
		};
		startPoint = {
			x: Math.round(e.changedTouches[0].clientX),
			y: Math.round(e.changedTouches[0].clientY)
		}
		longTapTimer = setTimeout(function(){
			init.longTap&&init.longTap.call(el,e);
		},750);
	});
	/* 安卓下，在touchstart时，触发面积过大时很容易一块触发move */
	el.addEventListener('touchmove', function(e) {
		var nowPoint = {
			x: Math.round(e.changedTouches[0].clientX),
			y: Math.round(e.changedTouches[0].clientY)
		}
		if(nowPoint.x == lastPoint.x&&nowPoint.y == lastPoint.y){
			return;
		}
		//下边写move时要执行的内容
		if(Math.abs(nowPoint.x - startPoint.x)>5
		&&Math.abs(nowPoint.y - startPoint.y)>5){
			clearTimeout(longTapTimer);
		}

		//上边写 move时 要执行的内容
		lastPoint = {
			x: nowPoint.x,
			y: nowPoint.y
		}
	});
	el.addEventListener('touchend', function(e) {
		var nowPoint = {
			x: Math.round(e.changedTouches[0].clientX),
			y: Math.round(e.changedTouches[0].clientY)
		}
		if(Math.abs(nowPoint.x - startPoint.x)<5
		&&Math.abs(nowPoint.y - startPoint.y)<5){
			isTap = true;
		} else {
			isTap = false;
		}
		isTap&&init.tap&&init.tap.call(el,e);
		e.startPoint = startPoint;
		/* 判断用户是否执行双击操作 */
		clearTimeout(longTapTimer);
		if(isTap){
			if(isDblTap){
				clearTimeout(dbTimer);
				init.doubleTap&&init.doubleTap.call(el,e);
				isDblTap = false;
			} else {
				isDblTap = true;
				dbTimer = setTimeout(function(){
					isDblTap = false;
					init.singleTap&&init.singleTap.call(el,e);
				},300);
			}
		}
		if(getDis(nowPoint,startPoint) >= 20){
			//在屏幕中滑动了，滑屏事件执行；
			init.swipe&&init.swipe.call(el,e);;
		}
		if(nowPoint.x - startPoint.x >= 20){//右滑；
			init.swipeRight&&init.swipeRight.call(el,e);;
		} else if(nowPoint.x - startPoint.x <= -20){//左滑；
			init.swipeLeft&&init.swipeLeft.call(el,e);;
		}
		if(nowPoint.y - startPoint.y >= 20){//下滑；
			init.swipeDown&&init.swipeDown.call(el,e);;
		} else if(nowPoint.y - startPoint.y <= -20){//上滑；
			init.swipeUp&&init.swipeUp.call(el,e);
		}
		isTap = true;
	});
}
function getDis(Point,Point2){
	return Math.sqrt((Point.x - Point2.x)*(Point.x - Point2.x) + (Point.y - Point2.y)*(Point.y - Point2.y));
}

export default {
    css,// 获取设置样式
    touchEvent,//移动端事件
    mScroll,//滑屏，上下，左右
    startMove//动画
}
//使用方法：import MTouch from './assets/js/m.touch'
//然后直接调用就可以了 MTouch.css(); MTouch.mScroll();
