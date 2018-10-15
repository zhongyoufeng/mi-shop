var phone = (function() {
	var shopcount = document.querySelector('.carcount');
	var car_icon = document.querySelector('.car_icon');
	var car_num = document.querySelector('.car_num');
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

		}

	}
}())
phone.init();
/*添加商品到购物车*/
var add = (function() {
	var phone = document.querySelector('.phone');
	var p_title = document.querySelectorAll('.p_con h1');
	var p_price = document.querySelectorAll('.p_price');
	var p_img = document.querySelectorAll('.start_top img')
	var add_car = document.querySelectorAll('.add_car');
	var car_num = document.querySelector('.car_num');
	var add_car2 = document.querySelectorAll('.add_car2');
	var f_img = document.querySelectorAll('.start_fo img');
	var $h2 = document.querySelectorAll('.fo_l h2');
	var f_price = document.querySelectorAll('.fo_r>p');
	var p_detail = document.querySelectorAll('.p_detail');
	var p_detail2 = document.querySelectorAll('.p_detail2');
	var p_info = document.querySelectorAll('.p_info');
	var fo_info=document.querySelectorAll('.fo_info');
	var $confirm = document.querySelector('.confirm');
	var $close = document.querySelector('.close');
	var $cover = document.querySelector('.cover');
	var $box = document.querySelector('.cover_box');
	var $title = document.querySelector('.cover_title');
	var count = localStorage.shops;
	if(count) {
		count = JSON.parse(count);
		count = count.length;
	} else {
		count = 0;
	}

	return {
		init() {
			this.event();
		},
		event() {
			var that = this;
			phone.onclick = function(e) {
				e = e || window.event;
				var target = e.target || e.srcElement;
				if(target.className == 'add_car') {
					e.preventDefault();
					count++;
					for(var i = 0; i < add_car.length; i++) {
						add_car[i].index = i
					}
					var title_v = p_title[target.index].innerHTML;
					var price_v = p_price[target.index].innerHTML;
					price_v = '￥' + parseInt(price_v);
					var shop_img = p_img[target.index].src;
					var shop = {
						"shopname": title_v,
						"prcie": price_v,
						"num": 1,
						'shop_img': shop_img
					};
					that.judge("shops", "shopname", 1, function(status) {
						that.add("shops", shop, function() {
							car_num.innerHTML = count;
						})

					})
					$cover.style.display='block';
					
				} else if(target.className == 'add_car2') {
					e.preventDefault();
					count++;
					for(var i = 0; i < add_car2.length; i++) {
						add_car2[i].index = i
					}
					var title_v = $h2[target.index].innerHTML;
					var price_v = f_price[target.index].innerHTML;
					price_v = '￥' + parseInt(price_v);
					var shop_img = f_img[target.index].src;
					var shop = {
						"shopname": title_v,
						"prcie": price_v,
						"num": 1,
						'shop_img': shop_img
					};
					that.judge("shops", "shopname", 1, function(status) {
						that.add("shops", shop, function() {
							car_num.innerHTML = count;
						})

					})
                           	$cover.style.display='block';
				} else if(target.className == 'p_detail') {
					
					target.style.transform = 'scale(1.05)';
					for(var j = 0; j < p_detail.length; j++) {
						p_detail[j].l = j;
					}
					var title_v = p_title[target.l].innerHTML;
					var price_v = p_price[target.l].innerHTML;
					price_v = '￥' + parseInt(price_v);
					var shop_img = p_img[target.l].src;
					var pinfo_v = p_info[target.l].innerHTML;
					var cookie = new OperationCookie();
					cookie.setItem("pname", title_v, 1);
					cookie.setItem("pprice", price_v, 1);
					cookie.setItem("pimg", shop_img, 1);
					cookie.setItem("pinfo", pinfo_v, 1);
				}else if(target.className=='p_detail2'){
					target.style.transform = 'scale(1.05)';
					for(var j = 0; j < p_detail2.length; j++) {
						p_detail2[j].l = j;
					}
					var title_v = $h2[target.l].innerHTML;
					var price_v = f_price[target.l].innerHTML;
					price_v = '￥' + parseInt(price_v);
					var shop_img = f_img[target.l].src;
					var pinfo_v = fo_info[target.l].innerHTML;
					var cookie = new OperationCookie();
					cookie.setItem("pname", title_v, 1);
					cookie.setItem("pprice", price_v, 1);
					cookie.setItem("pimg", shop_img, 1);
					cookie.setItem("pinfo", pinfo_v, 1);
				}
			};
			
			$confirm.onclick=function(){
				location.href='car.html';
			};
			$close.onclick=function(){
				$cover.style.display='none';
			}

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

		},
		getStyle(ele, attr) {
			if(window.getComputedStyle) {
				return window.getComputedStyle(ele, null)[attr];
			} else {
				obj.currentStyle[arr]
			}
		},

	}
}())
add.init();