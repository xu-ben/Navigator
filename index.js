updateTime();
addScrollListener(window, wheelHandle);
document.onkeydown = keyDownHandle;
window.onload = onReload;
window.onresize = onReload;

if(isMobileDevice()) {//只针对移动设备做的事情
	//兼容iPhone和android的屏幕旋转事件，function() { alert(window.orientation);}
	var supportsOrientationChange = "onorientationchange" in window,
	orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";
	window.addEventListener(orientationEvent, onReload, false);
	
	window.addEventListener('touchstart', onTouchStart, false);
	window.addEventListener('touchmove', onTouchMove, false);
	window.addEventListener('touchend', onTouchEnd, false);
	//window.addEventListener('touchcancel', onTouchCancel, false);	
}



/**
 * 每个页面的宽度和高度
 */
var pagewidth, pageheight;
getHeightAndWidth();

/**
 * 页面数
 */
var pagenum = lists.length;

/**
 * 默认页面的页面号
 */
var curpagenum = 4;

function getHeightAndWidth() {
	pagewidth = window.innerWidth - 20;
	pageheight = window.innerHeight - 50;
	if(!isMobileDevice()) {
		//移动设备一般都是全屏，所以在宽度上不用减，非移动设备多留点边以便更加美观
		pagewidth -= 30;
	}
}

/**
 * 填写生成一个searchtable的html内容
 * @param se1
 * @param se2
 * @returns {String}
 */
function getSearchtable(se1, se2) {
	var html = '<table class = "searchtable"><tr>';
	
	html += '<td align="center"><form action="';
	html += se1.url + '" method="get"><input type="text" name="' + se1.name + '"></input><button>' + se1.title + '</button>';
	html += '</form></td>';
	
	if(pagewidth < 800) {
		html += '</tr><tr>';
	}
	
	html += '<td align="center"><form action="';
	html += se2.url + '" method="get"><input type="text" name="' + se2.name + '"></input><button>' + se2.title + '</button>';
	html += '</form></td>';
	
	html += '</tr></table>';
	return html;
}

/**
 * 填写生成一个page div的html内容
 * @param title 页面的标题
 * @param searchtable 搜索引擎table的html
 * @param list 网址列表
 * @returns {String}
 */
function renderpage(title, searchtable, list) {
	var html = '<div class = "page">';
	html += '<h1 align = "center">' + title + '</h1>';
	html += searchtable;
	html += '<table class = "maintable"><tr>';
	
	var itemNumInALine;
	if(pagewidth >= 1280) {
		itemNumInALine = 5;
	}else if(pagewidth >= 1000) {
		itemNumInALine = 4;
	}else if(pagewidth >= 800){
		itemNumInALine = 3;
	}else if(pagewidth >= 600){
		itemNumInALine = 2;
	}else {
		itemNumInALine = 1;
	}
	
	for(var i = 0; i < list.length; i++) {
		if(i > 0 && i % itemNumInALine == 0) {
			html += "</tr><tr>";
		}
		var item = list[i];
		html += '<td><a href="';
		html += item.url + '">' + item.name;
		html += "</a></td>";
	}
	html += "</tr></table>";
	html += "</div>";
	return html;
}

function onReload() {
	getHeightAndWidth();
	updatePageCont();
	updatePageSize();
	updateCSS();
//	var mytest = document.getElementById('mytest'); 
//	mytest.innerHTML = pagewidth + "x" + pageheight;
}

function updatePageCont() {
	var html = '';
	for(var i = 0; i < pagenum; i++) {
		var item = lists[i];
		var searchtable = getSearchtable(item.searchengine[0], item.searchengine[1]);
		html += renderpage(item.title, searchtable, item.list);
//		render("content" + i, lists[i]);
	}
	html += '<div class="clear"></div>';
	var pagecont = document.getElementById('pagecont'); 
	pagecont.innerHTML = html;
}

function updatePageSize() {
	var wrapper = document.getElementById('wrapper');
	wrapper.style.width = pagewidth + "px";
	wrapper.style.height = pageheight + "px";

	var pagewindow = document.getElementById('pagewindow');
	pagewindow.style.width = pagewidth + "px";
	
	var pagecont = document.getElementById('pagecont'); 
	pagecont.style.width = pagenum * pagewidth + "px";
	pagecont.style.left = (1 - curpagenum) * pagewidth + "px";
	
	var bottom = document.getElementById('bottom');
	bottom.style.width = pagewidth + "px";
	
	updateCSS();
}

function updateCSS() {
	var sheet = document.styleSheets[0];
	var rules = sheet.cssRules || sheet.rules;
	var tablerule = rules[0];
	var pagerule = rules[1];
	tablerule.style.width = pagewidth + "px";
	pagerule.style.width = pagewidth + "px";

	var wrapperrule = rules[2];
	var fontsize = computeFontSize();
	wrapperrule.style.fontSize = fontsize + "px"; 
}

function computeFontSize() {
	var refer;
	if(pagewidth * 0.75 < pageheight) {
		refer = pagewidth * 0.75;
	}else {
		refer = pageheight;
	}
	var ret = refer / 25;
	if(ret < 15) {
		ret = 15;
	}
	if(ret > 30) {
		ret = 30;
	}
	return ret;
}
