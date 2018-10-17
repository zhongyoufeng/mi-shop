/**
 * 
 * 功能：家电周边js部分
 */
(function electrical() {
	var aLis = Array.prototype.slice.call(document.querySelectorAll(".electrical .menu-list li"));
	// 获取数据
	GET("js/datas.json", function(response) {
		// 设置默认数据
		updateElectricalface(response["electrical"][0]);
		aLis.forEach(function(oLi, idx) {
			oLi.idx = idx;
			oLi.onmouseenter = function() {
				for(var i = 0; i < aLis.length; i++) {
					if(aLis[i].classList.contains('tab-active')) {
						aLis[i].classList.remove('tab-active');
						break;
					}
				}
				this.classList.add('tab-active');
				updateElectricalface(response["electrical"][this.idx]);
			}
		});
	}, function(fail) {});

}());

(function intelligent() {
	var aLis = Array.prototype.slice.call(document.querySelectorAll(".intelligent .menu-list li"));
	GET("js/datas.json", function(response) {
		// 设置默认数据
		updateIntelligentface(response["intelligent"][0]);
		aLis.forEach(function(oLi, idx) {
			oLi.idx = idx;
			oLi.onmouseenter = function() {
				for(var i = 0; i < aLis.length; i++) {
					if(aLis[i].classList.contains('tab-active')) {
						aLis[i].classList.remove('tab-active');
						break;
					}
				}
				this.classList.add('tab-active');
				updateIntelligentface(response["intelligent"][this.idx]);
			}
		});
	}, function(fail) {});

}());

(function match() {
	var aLis = Array.prototype.slice.call(document.querySelectorAll(".match .menu-list li"));
	GET("js/datas.json", function(response) {
		// 设置默认数据
		updateMatchface(response["match"][0]);
		aLis.forEach(function(oLi, idx) {
			oLi.idx = idx;
			oLi.onmouseenter = function() {
				for(var i = 0; i < aLis.length; i++) {
					if(aLis[i].classList.contains('tab-active')) {
						aLis[i].classList.remove('tab-active');
						break;
					}
				}
				this.classList.add('tab-active');
				updateMatchface(response["match"][this.idx]);
			}
		});
	}, function(fail) {});

}());

(function parts() {

	var aLis = Array.prototype.slice.call(document.querySelectorAll(".parts .menu-list li"));

	GET("js/datas.json", function(response) {
		// 设置默认数据
		updatePartsface(response["parts"][0]);

		aLis.forEach(function(oLi, idx) {
			oLi.idx = idx;
			oLi.onmouseenter = function() {
				for(var i = 0; i < aLis.length; i++) {
					if(aLis[i].classList.contains('tab-active')) {
						aLis[i].classList.remove('tab-active');
						break;
					}
				}
				this.classList.add('tab-active');
				updatePartsface(response["parts"][this.idx]);
			}
		});
	}, function(fail) {});

}());

(function around() {

	var aLis = Array.prototype.slice.call(document.querySelectorAll(".around .menu-list li"));

	GET("js/datas.json", function(response) {
		// 设置默认数据
		updateAroundface(response["around"][0]);

		aLis.forEach(function(oLi, idx) {
			oLi.idx = idx;
			oLi.onmouseenter = function() {
				for(var i = 0; i < aLis.length; i++) {
					if(aLis[i].classList.contains('tab-active')) {
						aLis[i].classList.remove('tab-active');
						break;
					}
				}
				this.classList.add('tab-active');
				updateAroundface(response["around"][this.idx]);
			}
		});
	}, function(fail) {});

}());
var shopcount = document.querySelector('.carcount');
var car_num = document.querySelector('.car_num');
var sidebar = document.querySelector('.sidebar')
var count = 0;
if(!localStorage.shops || localStorage.shops == '[]') {
	shopcount.innerHTML = '购物车(0)';
	car_num.innerHTML = '0'
} else {
	var shop = JSON.parse(localStorage.shops)
	for(var i = 0; i < shop.length; i++) {
		count = i;

	}
	car_num.innerHTML = i;
	shopcount.innerHTML = '购物车' + '(' + i + ')';
};
window.onscroll = function() {

	sidebar.style.top = scrollY + sidebar.offsetHeight + 'px';
}

var cookie = new OperationCookie();
var username = cookie.getItem('username');
if(username) {
	var user = document.querySelector('.navbar-user>a');
	var reg = document.querySelector('.reg')
	user.href = '#';
	user.innerHTML = '欢迎您：' + username;
	reg.href = '#';
	reg.innerHTML = '退出';
	reg.onclick = function() {
		document.cookie = `username='${username};max-age=0'`;
		location.href = 'index.html';
	}

}