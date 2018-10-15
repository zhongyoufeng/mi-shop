/**
 * 
 * 功能：回到顶部
 */

var back = (function() {
	var oBtn = document.getElementById('backToBtn');
	var offset = 0;
	return {
		init() {
			this.event();
		},
		event() {
			var that = this;
			that.addEvent(window, 'scroll', function() {
				offset = document.documentElement.scrollTop || document.body.scrollTop;
				if(offset > 200) {
					oBtn.style.display = 'block';
				} else {
					oBtn.style.display = 'none';
				}
			});
			that.addEvent(oBtn, 'click', function() {
				var duration = 500;
				var interval = 15;
				var speed = Math.ceil(offset / (duration / interval));

				var t = setInterval(function() {
					if(offset > 0) {
						document.documentElement.scrollTop = document.body.scrollTop = offset - speed;
					} else {
						document.documentElement.scrollTop = document.body.scrollTop = 0;
						clearInterval(t);
					}
				}, interval);
			});

		},
		addEvent(target, type, callBack) {
			if(target.addEventListener) {
				addEvent = function(target, type, callBack) {
					target.addEventListener(type, callBack, false);
				}
			} else {
				addEvent = function(target, type, callBack) {
					target.attachEvent('on' + type, callBack);
				}
			}
			addEvent(target, type, callBack);
		}
	}
}())
back.init();