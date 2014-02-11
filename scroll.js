/**
 * 标记是否正在做切屏动画
 */
var animateflag = false;

/**
 * 将一个"***px"型的字符串转换成数值
 */
function getvalue(str) {
	return parseInt(str.substr(0, str.length - 2));
}

/**
 * 判断滚轮事件类型，大于0表示向上滚，小于0表示向下滚
 */
function wheeltype(e) {
    if(e.wheelDelta) { // IE, KHTML, Opera
        return e.wheelDelta;
    } else { // Gecko
        return -e.detail;
    }				
}

/**
 * 切屏的函数
 * @param flag 指示切屏方向的标记，1表示上一页，-1表示下一页
 */
function pagechange(flag) {
	if(animateflag) {//正在切屏，则忽略本次请求
		return ;
	}
	/*
	 * 获得一屏的宽度
	 */
	var win = document.getElementById("pagewindow");
	var width = getvalue(win.style.width);

	var cont = document.getElementById("pagecont");
	var left = getvalue(cont.style.left);
	var bound = getvalue(cont.style.width) - width;
	
	var s = left;
	var e = left + flag * width;
	var step = width / 1000;
	step = step * step * 10 * flag;
	
	if(e <= 0 && e >= -bound) {
		animateflag = true;
		animate(s, e, step);
	}
	
	if(e > 0) {
		e = 0;
	}
	if(e < -bound) {
		e = -bound;
	}
	cont.style.left = e + "px";
}

/**
 * 做一个将cont.style.left从s变至e的动画
 * @param s
 * @param e
 * @param step 每个单位时间移动的步长
 */
function animate(s, e, step) {
	if((step > 0 && s >= e) || (step < 0 && s <= e) ) {
		animateflag = false;
		return ;
	}
	s += step;
	var cont = document.getElementById("pagecont");
	cont.style.left = s + "px";
	setTimeout("animate(" + s + "," + e + "," + step + ")", 1);	
}

/**
 * 滚轮事件响应函数
 * @param e 事件
 */
function wheelHandle(e) {
	if(wheeltype(e) > 0) {
		pagechange(1);
	}else {
		pagechange(-1);
	}
}

/**
 * 键盘事件响应函数
 * @param e 事件
 */
function keyDownHandle(e) {
	var evt = e || window.event;
	if(evt.keyCode == 39) {
		pagechange(-1);
	}else if(evt.keyCode == 37) {
		pagechange(1);
	}
};


/**
 * 注册滚轮事件函数
 * @param element     : 注册的事件对象
 * @param wheelHandle : 注册事件函数
 */
function addScrollListener(element, wheelHandle) {
    if(typeof element != 'object') return;
    if(typeof wheelHandle != 'function') return;
    // 监测浏览器
    if(typeof arguments.callee.browser == 'undefined') {
        var user = navigator.userAgent;
        var b = {};
        b.opera = user.indexOf("Opera") > -1 && typeof window.opera == "object";
        b.khtml = (user.indexOf("KHTML") > -1 || user.indexOf("AppleWebKit") > -1 || user.indexOf("Konqueror") > -1) && !b.opera;
        b.ie = user.indexOf("MSIE") > -1 && !b.opera;
        b.gecko = user.indexOf("Gecko") > -1 && !b.khtml;
        arguments.callee.browser = b;
    }
    if(element == window)
        element = document;
    if(arguments.callee.browser.ie)
        element.attachEvent('onmousewheel', wheelHandle);
    else
        element.addEventListener(arguments.callee.browser.gecko ? 'DOMMouseScroll' : 'mousewheel', wheelHandle, false);
}

/**
 * 划动的类型
 * -2表示没有开始触摸，0表示没有划动，1表示向左划，-1表示向右划
 */
var moveType = -2;
/**
 * 触摸起始点坐标
 */
var startX;

function onTouchStart(e) {
	if(e.touches.length != 1) {
		return ;
	}
	moveType = 0;
	startX = e.touches[0].clientX;
}

function onTouchMove(e) {
//	alert("hehe");
	e.preventDefault();
	if(e.touches.length != 1 || moveType == -2) {
		return ;
	}
	if (e.touches[0].clientX - startX > 10) {
		moveType = -1;
	}else if(startX - e.touches[0].clientX > 10) {
		moveType = 1;
	}
}

function onTouchEnd(e) {
	//alert('he');
	e.preventDefault();
	if(moveType == 1 || moveType == -1) {
		pagechange(-moveType);
	}
    moveType = -2;
}

function onTouchCancel(e) {
    moveType = -2;
}
