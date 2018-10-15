/**
 * 添加事件
 * 
 */
function addEvent(element, type, callBack) {

	if(element.attachEvent) {
		element.attachEvent('on' + type, callBack);
	} else {
		element.addEventListener(type, callBack, null);
	}
}

/**
 * 获取非行间样式
 * 
 */
function getStyle(obj, attr) {
	if(obj.currentStyle) {
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, null)[attr];
	}
}


/**
 * ajax
 *
 */
function GET(url, success, fail) {
	// 创建请求对象
	var request = new XMLHttpRequest();
	// 配置请求
	request.open("GET", url, true);
	// 发送请求
	request.send(null);
	// 监听请求
	request.onreadystatechange = function() {
		if(request.readyState == 4 && request.status == 200) {
			// 请求成功
			// 解析数据
			var response = JSON.parse(request.responseText);
			if(success) {
				success(response);
			}
		} else {
			// 请求失败
			if(fail) {
				fail(request.status);
			}
		}
	}
}

/**
 * 本地存储：添加用户
 * 
 */
function addUser(key, user, callBack) {
	// 定义存储用户信息的集合
	var users = null;
	// 判断本地是否已经存在该用户数据集合
	if(localStorage[key]) {
		// 存在，根据本地用户数据集合来初始化users
		users = JSON.parse(localStorage[key]);
	} else {
		// 不存在，创建一个空数组
		users = [];
	}
	// 添加用户
	users.push(user);
	// 更新本地数据
	localStorage[key] = JSON.stringify(users);
	// 数据存储成功之后调用回调函数
	if(callBack) {
		callBack();
	}
}

/**
 * 判断用户是否存在
 * 
 */
function determineUserIsExists(key, gist, value, response) {
	if(!localStorage[key]) {
		response(1);
		return;
	}
	// 获取本地用户数据集合
	var users = JSON.parse(localStorage[key]);
	// 遍历本地用户数据集合，判断用户是否存在
	var tag = false;
	for(var i = 0; i < users.length; i++) {
		if(users[i][gist] == value) {
			// 用户存在
			tag = true;
		}
	}
	tag ? response(0) : response(1);
}

/**
 * 判断是否登录成功
 *
 */

function login(key, gists, response) {
	// 判断本地数据用户集合是否存在
	// 如果不存在，则直接提示用户不存在
	if(!localStorage[key]) {
		response(0);
		return;
	}

	// 判断用户输入的账号或密码为空
	var username = Object.keys(gists)[0];
	var password = Object.keys(gists)[1];
	if(!gists[username] || !gists[password]) {
		response(2);
		return;
	}
	// 判断是否登录成功
	var users = JSON.parse(localStorage[key]);
	var idx = undefined;
	for(var i = 0; i < users.length; i++) {
		// 判断用户是否存在
		if(users[i][username] == gists[username]) {
			idx = i;
			break;
		}
	}
	if(idx == undefined) {
		// 用户不存在
		response(0);
	} else {
		// 用户存在
		if((users[idx][username] == gists[username]) && (users[idx][password] == gists[password])) {
			response(200);
		} else {
			response(1);
		}
	}

}
/*
 *购物车动态添加效果
 * 
 * */

function Move(ele) {
	if(typeof ele === 'string') {
		ele = document.querySelector(ele);
	}
	this.ele = ele;
	var timer = null;
}
// 给目标值, 事件,回调函数, 物体运动到目标值
// 修改多个属性
Move.prototype.moveTo = function(targetObj, time, callback) {
	ele = this.ele;
	clearInterval(ele.timer);
	var objSpeed = {};
	for(var attr in targetObj) {
		var init = parseFloat(getStyle(ele, attr));
		objSpeed[attr] = (targetObj[attr] - init) / (time / 10)
	}
	ele.timer = setInterval(function() {
		var flag = true;
		for(var attr in targetObj) {
			var speed = objSpeed[attr];
			var init = parseFloat(getStyle(ele, attr));
			if(attr == 'opacity') {
				init *= 100;
			}
			init += speed
			if((speed >= 0 && init >= targetObj[attr]) || (speed <= 0 && init <= targetObj[attr])) {
				init = targetObj[attr];
			} else {
				flag = false;
			}
			if(attr == 'opacity') {
				ele.style[attr] = init / 100;
			} else {
				ele.style[attr] = init + 'px';
			}
		}
		if(flag) {
			clearInterval(ele.timer);
			if(typeof callback == 'function') {
				callback(ele);
			}
		}
	}, 10)
}
// 修改一个一个属性
Move.prototype.move = function(attr, target, time, callback) {
	ele = this.ele;
	clearInterval(ele.timer)
	var obj = {};
	obj[attr] = target;
	this.moveTo(obj, time, callback);
}
// 横向运动
// target传一个正值, 就让你向右边移动target值,如果传入一个负值, 向左边运动
Move.prototype.moveX = function(target, time, callback) {
	ele = this.ele;
	clearInterval(ele.timer);
	this.move('left', target, time, callback)
}
// 纵向运动
Move.prototype.moveY = function(target, time, callback) {
	ele = this.ele;
	clearInterval(ele.timer);
	this.move('top', target, time, callback)
}
/*cookie操作
 */

function OperationCookie () {}
// 设置cookie值
OperationCookie.prototype.setItem = function(name, val, day) {
    document.cookie = name + '=' + val + '; max-age=' + day * 24 * 60 * 60 + ';'; 

}
// 获取cookie值
OperationCookie.prototype.getItem = function(name) {
    // "username=456; age=15; oop=mian"
    var obj = {};
    var _cookie = document.cookie;
    _cookie = _cookie.split('; ');
    for(var i = 0; i < _cookie.length; i++) {
        var arr = _cookie[i].split('=');
        obj[arr[0]] = arr[1];
    }
  
    return name ? obj[name] : obj;
}
// 删除cookie值
OperationCookie.prototype.removeItem = function(name) {
    this.setItem(name, '', 0);
}

OperationCookie.prototype.clear = function() {
    var obj = this.getItem();
    for(var i  in obj) {
        this.removeItem(i);   
    }
}