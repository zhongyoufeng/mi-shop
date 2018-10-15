/*
 * 购物车
 */
var car = (function() {
	var tbox = document.querySelector('.tbox');
	var shop_null = document.querySelector('.shop-null');
	var empty = document.querySelector('.empty');
	var table = document.querySelector('table');
	var con = document.querySelector('.page-main>.con');
	var shopsum = document.querySelector('.sum');
	var sum = document.querySelector('.shop_sum');
	var $confirm = document.querySelector('.confirm');
	var $close = document.querySelector('.close');
	var $cover = document.querySelector('.cover');
	var $box = document.querySelector('.box');
	var $title = document.querySelector('.title');
	var check1 = document.querySelector('#check1');
	var sum_count = document.querySelector('.sum_count');
	var add_car = document.querySelectorAll('.add_car');
	var $li = document.querySelectorAll('.car_list li');
	var car_more = document.querySelector('.car_more');
	var sure = document.querySelector('.sure')

	var arr = [];
	var arr2 = [];
	var summ = 0;
	var count = 1;
	var xj_sum = 3660;
	return {
		init() {
			this.event();
			this.getData();

		},
		event() {
			var that = this;
			tbox.onclick = function(e) {
				var btn_del = document.querySelectorAll('.btn-del');
				var shop = JSON.parse(localStorage.shops);
				e = e || window.event();
				var target = e.target || e.srcElement;
				for(var j = 0; j < btn_del.length; j++) {
					btn_del[j].index = j;
				}
				if(target.className == 'btn-del') {
					$cover.style.display = 'block';
						sure.innerHTML = '您确定删除该商品吗？';
							$confirm.innerHTML = '确定';
					$confirm.onclick = function() {
						var delshop = shop.splice(target.parentNode.firstChild.index, 1);
						localStorage.shops = JSON.stringify(shop);
						$cover.style.display = 'none';
						//target.parentNode.parentNode.parentNode.remove();
						$box.style.left = window.innerWidth / 2 - $box.offsetWidth + 'px';
						$box.style.top = window.innerHeight / 2 - $box.offsetHeight + 'px';
						location.href = 'car.html';
					}
					$close.onclick = function() {
						$cover.style.display = 'none';
						$box.style.left = window.innerWidth / 2 - $box.offsetWidth + 'px';
						$box.style.top = window.innerHeight / 2 - $box.offsetHeight + 'px';
					}
				}
			};
			$title.onmousedown = function(e) {
				e = e || window.event;
				var titleX = e.offsetX,
					titleY = e.offsetY;
				document.onmousemove = function(e) {
					e = e || window.event;
					var x = e.pageX,
						y = e.pageY;
					var selfx = parseInt(that.getStyle($box, 'margin-left'));
					var selfY = parseInt(that.getStyle($box, 'margin-top'));
					var maxX = window.innerWidth - $box.offsetWidth / 2;
					var maxY = window.innerHeight - $box.offsetHeight / 2;
					x = x - titleX - selfx;
					y = y - titleY - selfY;
					if(x < $box.offsetWidth / 2) {
						x = $box.offsetWidth / 2;
					} else if(x > maxX) {
						x = maxX;
					}
					if(y < $box.offsetHeight / 2) {
						y = $box.offsetHeight / 2;
					} else if(y > maxY) {
						y = maxY
					}
					$box.style.left = x + 'px';
					$box.style.top = y + 'px';
				}
			};
			document.onmouseup = function() {
				document.onmousemove = null;
			};
			tbox.addEventListener('click', function(e) {
				e = e || window.event;
				var target = e.target;
				if(target.className == 'jian') {
					var shop = JSON.parse(localStorage.shops);
					var inp_v = document.querySelectorAll('.jian');
					for(var i = 0; i < inp_v.length; i++) {
						inp_v[i].index = i;
					}
					var s_num = shop[target.index].num;
					var v_input = document.querySelectorAll('.inp_v');
					var xj = document.querySelectorAll('.xj');
					v_input[target.index].value--;
					shop[target.index].num--;
					localStorage.shops = JSON.stringify(shop);
					if(v_input[target.index].value <= 1) {
						v_input[target.index].value = 1;
						shop[target.index].num = 1;
						localStorage.shops = JSON.stringify(shop);
					}
					var dj = shop[target.index].prcie.split('￥')[1];
					var xj_sum = v_input[target.index].value * dj;
					xj[target.index].innerHTML = '￥' + xj_sum;
					var allsum = 0;
					var arr = [];
					for(var j = 0; j < xj.length; j++) {
						arr.push(xj[j].innerHTML.split('￥')[1])
					}
					arr.forEach(function(item, index) {
						return allsum += Number(item);
					})
					sum.innerHTML = allsum;

				} else if(target.className == 'jia') {
					var shop = JSON.parse(localStorage.shops);
					var inp_v = document.querySelectorAll('.jia');
					for(var i = 0; i < inp_v.length; i++) {
						inp_v[i].index = i;
					}
					var v_input = document.querySelectorAll('.inp_v');
					var xj = document.querySelectorAll('.xj');
					v_input[target.index].value++;
					if(v_input[target.index].value >= 10) {
						v_input[target.index].value = 10;
					shop[target.index].num=10;
					localStorage.shops = JSON.stringify(shop);
					}
					var dj = shop[target.index].prcie.split('￥')[1];
					shop[target.index].num++;
					localStorage.shops = JSON.stringify(shop);
					var xj_sum = v_input[target.index].value * dj;
					xj[target.index].innerHTML = '￥' + xj_sum;
					var allsum = 0;
					var arr = [];
					for(var j = 0; j < xj.length; j++) {
						arr.push(xj[j].innerHTML.split('￥')[1])
					}
					arr.forEach(function(item, index) {
						return allsum += Number(item);
					})
					sum.innerHTML = allsum;
				}

			});
			check1.onclick = function() {
				var checkall = document.querySelectorAll('.Checkbox');
				if(check1.checked == true) {
					for(var i = 0; i < checkall.length; i++) {
						checkall[i].checked = true;
					}
				} else {
					for(var i = 0; i < checkall.length; i++) {
						checkall[i].checked = false;
					}
				}

			};
			for(let i = 0; i < $li.length; i++) {
				$li[i].onmouseenter = function() {
					add_car[i].style.display = 'block';
				}
				$li[i].onmouseleave = function() {
					add_car[i].style.display = 'none';
				}

			};
			car_more.onclick = function(e) {
				e = e || window.event;
				var target = e.target || e.srcElement;
				e.preventDefault();
				if(target.className == 'add_car') {
					e.preventDefault();
					var car_img = document.querySelectorAll('.car_img');
					var sj_name = document.querySelectorAll('.sj_name')
					var sj_price = document.querySelectorAll('.sj_price');
					for(var i = 0; i < add_car.length; i++) {
						add_car[i].index = i;
					}
					var car_img_src = car_img[target.index].src;
					var sj_name_v = sj_name[target.index].innerHTML;
					var sj_price_v = sj_price[target.index].innerHTML;
					var shop = {
						"shopname": sj_name_v,
						"prcie": sj_price_v,
						"num": 1,
						'shop_img': car_img_src
					};
					that.judge("shops", "shopname", sj_name_v, function(status) {
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
								location.href = 'car.html'
							})

						}

					})

				}
			}

		},
		getData() {
			if(localStorage.shops == "[]" || !localStorage.shops) {
				con.style.background = '#f5f5f5';
				table.style.display = 'none';
				shopsum.style.display = 'none';
				empty.style.display = 'block';
				car_more.style.display = 'none';
			} else {
				empty.style.display = 'none';
				var shop = JSON.parse(localStorage.shops);
				for(var i = 0; i < shop.length; i++) {
					arr.push(`<tr>
						        <td><input type="checkbox" class="Checkbox" id="check1">
									</td>
									<td><img src="${shop[i].shop_img}"/></td>
								<td>${shop[i].shopname}</td>
								<td>${shop[i].prcie}</td>
								<td><a class='jian'>-</a><input type="text" value="${shop[i].num}" class='inp_v'/><a class='jia'>+</a></td>
								<td class='xj'>${shop[i].prcie}</td>
								<td><button class="btn-del">删除</button></td>
							</tr>`);
					var sum_shop = shop[i].prcie.substr(1);
					sum_shop = Number(sum_shop) * Number(shop[i].num);
					arr2.push(sum_shop);

				}
				arr2.forEach(function(itme, index, array) {
					return summ += (Number(itme))
				})
				var len = shop.length;
				sum_count.innerHTML = len;
				sum.innerHTML = summ;
				tbox.innerHTML = arr.join('');
			}
		},
		getStyle(ele, attr) {
			if(window.getComputedStyle) {
				return window.getComputedStyle(ele, null)[attr];
			} else {
				obj.currentStyle[arr]
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

		}

	}
}());
car.init();

window.onload = function() {
	var xj = document.querySelectorAll('.xj');
	var num = document.querySelectorAll('.inp_v');
	for(var i = 0; i < xj.length; i++) {
		xj[i].innerHTML = '￥' + Number(xj[i].innerHTML.split('￥')[1]) * Number(num[i].value);
	}
}