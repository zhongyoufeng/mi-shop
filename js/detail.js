/*放大镜
 */
var big = (function() {
	return {
		init: function() {
			this.$box = document.querySelector('.box');
			this.$showImage = this.$box.querySelector('.show-image');
			this.$showBigImage = this.$box.querySelector('.show-big-image');
			this.$ulbox = this.$box.querySelector('.img-box');
			this.$liAll = this.$ulbox.children;
			this.$filter = this.$showImage.querySelector('.filter');
			for(var i = 0; i < this.$liAll.length; i++) {
				this.$liAll[i].index = i;
			}
			this.event();
			this.mouser();

		},
		event: function() {
			var _this = this;
			this.$ulbox.onclick = function(ev) {
				ev = ev || window.event;
				var target = ev.target || ev.srcElement;
				if(target.nodeName === 'IMG') {
					_this.showImage(target.parentNode.index)
				}
			};
			this.$showImage.onmouseenter = function() {
				_this.$filter.style.display = 'block';
				_this.$showBigImage.style.display = 'block';
			}
			this.$showImage.onmouseleave = function() {
				_this.$filter.style.display = 'none';
				_this.$showBigImage.style.display = 'none';
			}
			this.$showImage.onmousemove = function(ev) {
				ev = ev || window.event;
				var x = ev.pageX - this.offsetLeft - _this.$filter.offsetWidth / 2;
				var y = ev.pageY - this.offsetTop - _this.$filter.offsetHeight / 2;

				// 获取小方块移动的最大坐标
				var maxL = this.clientWidth - _this.$filter.offsetWidth,
					maxT = this.clientHeight - _this.$filter.offsetHeight;
				if(x >= maxL) {
					x = maxL
				} else if(x <= 0) {
					x = 0;
				}
				if(y >= maxT) {
					y = maxT;
				} else if(y <= 0) {
					y = 0;
				}
				_this.$filter.style.left = x + 'px';
				_this.$filter.style.top = y + 'px';

				var img = _this.$showBigImage.querySelector('img');
				img.style.left = -3 * x + 'px';
				img.style.top = -3 * y + 'px';
			}
		},
		showImage: function(index) {
			console.log(index);
			for(var i = 0; i < this.$liAll.length; i++) {
				this.$liAll[i].className = ''
			}
			this.$liAll[index].className = 'active';
			var src = this.$liAll[index].querySelector('img').src;
			this.$showImage.querySelector('img').src = src.replace('small', 'big');
			this.$showBigImage.querySelector('img').src = src.replace('small', 'largest');
			console.log(src);
		},

		mouser: function() {
			var that = this;
			for(var i = 0; i < that.$liAll.length; i++) {
				that.$liAll[i].onmouseenter = function(ev) {
					that.showImage(this.index)
				}
			}
		}
	}

}())
big.init();

/*添加商品信息到localstorage
 */
var addshop = (function() {
	var btn = document.querySelector('.car');
	var shopname = document.querySelector('.title1');
	var shopprice = document.querySelector('.price-shop');
	var shopnum = document.querySelector('.shopnum');
	var shopcount = document.querySelector('.carcount');
	var car_icon = document.querySelector('.car_icon');
	var car_num = document.querySelector('.car_num')
	var box = new Move('.car_icon');
	var $confirm = document.querySelector('.confirm');
	var $close = document.querySelector('.close');
	var $cover = document.querySelector('.cover');
	var $box = document.querySelector('.cover_box');
	var $title = document.querySelector('.cover_title');
	var sure = document.querySelector('.sure')
	var count = 0;
	return {
		init() {
			if(!localStorage.shops || localStorage.shops == '[]') {
				shopcount.innerHTML = '购物车(0)';
				car_num.innerHTML = '0';
			} else {
				var shop = JSON.parse(localStorage.shops)
				for(var i = 0; i < shop.length; i++) {
					count = i;
				}
				shopcount.innerHTML = '购物车' + '(' + i + ')';
				car_num.innerHTML = i;

			}
			this.event();

		},
		event() {
			var that = this;
			btn.onclick = function() {
				var shop_img = document.querySelector('.img-box img').src;
				count++;
				var shop = {
					"shopname": shopname.innerHTML,
					"prcie": shopprice.innerHTML,
					"num": shopnum.value,
					'shop_img': shop_img
				};
				that.judge("shops", "shopname", shopname.innerHTML, function(status) {
					if(status == 0) {
						$cover.style.display = 'block';
						sure.innerHTML = '该商品已在购物车等候亲了';
						$confirm.innerHTML = '购物车查看';
						$confirm.onclick = function() {
							location.href = 'car.html';
						}
						$close.onclick = function() {
							$cover.style.display = 'none';
						}
					} else if(status == 1) {
						that.add("shops", shop, function() {
							shopcount.innerHTML = '购物车' + '(' + Number(count + 1) + ')';
							car_num.innerHTML = count + 1;
						})

					}

				})
				that.fade();

			}
		},
		fade() {
			car_icon.style.color = 'red';
			box.moveTo({
				"font-size": 40,
				left: 550,
				top: -75,
			}, 1500, function() {
				car_icon.style.color = '#fff';
				box.moveTo({
					"font-size": 15,
					left: 10,
					top: 10,
				}, 10)
			})

		},

		add(key, shop, callBack) {
			var shops = null;
			if(localStorage[key]) {
				shops = JSON.parse(localStorage[key]);
			} else {
				shops = [];
			}
			shops.push(shop);
			localStorage[key] = JSON.stringify(shops);
			if(callBack) {
				callBack();
			}
		},
		judge(key, gist, value, response) {
			if(!localStorage[key]) {
				response(1);
				return;
			}
			var shops = JSON.parse(localStorage[key]);
			var tag = false;
			for(var i = 0; i < shops.length; i++) {
				if(shops[i][gist] === value) {
					tag = true;
				}
			}
			tag ? response(0) : response(1);

		}
	}
}())
addshop.init();
/*选取套餐
 * 
 */
var check = (function() {
	var color_btn = document.querySelectorAll('.color button');
	var color = document.querySelector('.color');
	var size_btn = document.querySelectorAll('.size button');
	var size = document.querySelector('.size');

	return {
		init() {
			for(var i = 0; i < color_btn.length; i++) {
				color_btn[i].index = i;
			}
			for(var i = 0; i < size_btn.length; i++) {
				size_btn[i].index = i;
			}
			this.index = 0;
			this.event();
		},
		event() {
			var that = this;
			color.onclick = function(e) {
				e = e || window.event;
				var target = e.target || e.srcElement;
				if(target.nodeName == 'BUTTON') {

					that.show(target.index);
					return false;
				}
			}
			size.onclick = function(e) {
				e = e || window.event;
				var target = e.target || e.srcElement;
				if(target.nodeName == 'BUTTON') {
					that.size_show(target.index);

				}
			}
		},
		show(index) {
			this.index = index;
			for(var i = 0; i < color_btn.length; i++) {
				color_btn[i].removeAttribute('class')
			}
			color_btn[index].className = 'one';

		},
		size_show(index) {
			for(var i = 0; i < size_btn.length; i++) {
				size_btn[i].removeAttribute('class')
			}
			size_btn[index].className = 'one';

		}

	}

}())
check.init();

var insert = (function() {
	var title1 = document.querySelector('.title1');
	var title2 = document.querySelector('.title2');
	var price = document.querySelector('.price-shop');
	var img = document.querySelectorAll('.box img')
	return {
		init() {
			var cookie = new OperationCookie();
			var pname = cookie.getItem('pname');
			var pprice = cookie.getItem('pprice');
			var pimg = cookie.getItem('pimg');
			if(pname || pprice || pimg) {
				this.getdata();
			}

			this.event();
		},
		event() {
			var that = this;

		},
		getdata() {
			var cookie = new OperationCookie();
			var pname = cookie.getItem('pname');
			var pprice = cookie.getItem('pprice');
			var pimg = cookie.getItem('pimg');
			var pinfo = cookie.getItem('pinfo');
			title1.innerHTML = pname;
			title2.innerHTML = pinfo;
			price.innerHTML = pprice;
			for(var i = 0; i < img.length; i++) {
				img[i].src = pimg;
			}

		}
	}
}())
insert.init();