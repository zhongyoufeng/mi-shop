/*
 * 注册账号
 */
var register = (function() {
	var accountNum = document.querySelector(".account-land");
	var pwd = document.querySelector(".pwd");
	var btn = document.querySelector(".btn");
	var confirm = document.querySelector(".confirm");
	var requestAccount = document.querySelector(".request-account");
	var requestConfirm = document.querySelector(".request-confirm");
	var VerificationInput = document.querySelector(".Verification-input");
	var request = document.querySelector(".request-verification");
	return {
		init() {
			this.event();
		},
		event() {
			var that = this;
			accountNum.onblur = function() {
				var regs = /^[a-zA-Z0-9_-]{4,16}$/;
				if(regs.test(accountNum.value)) {
					requestAccount.style.opacity = 0;
				} else {
					requestAccount.style.opacity = 1;
					this.value = '';
				}
			};
			confirm.onblur = function() {
				if(pwd.value !== confirm.value) {
					requestConfirm.style.opacity = 1;
				} else {
					requestConfirm.style.opacity = 0;
				}
			};
			btn.onclick = function() {
				var user = {
					'username': accountNum.value,
					'password': pwd.value
				};
				that.jude('users', 'username', accountNum.value, function(status) {
					if(status === 0) {
						alert('用户已存在！');
						accountNum.value = '';
						pwd.value = '';
                        confirm.value='';
					} else if(accountNum.value === "" || pwd.value === "" || confirm.value === "") {
						alert("信息填写有误，请重新输入")
					} else if(status === 1) {
						that.add("users", user, function() {
							alert("注册成功");
							location.href = "login.html";
						})
					}
				})
			}

		},
		add(key, user, callBack) {
			var users = null;
			if(localStorage[key]) {
				users = JSON.parse(localStorage[key]);
			} else {
				users = [];
			}
			users.push(user);
			localStorage[key] = JSON.stringify(users);
			if(callBack) {
				callBack();
			}
		},
		jude(key, gist, value, response) {
			if(!localStorage[key]) {
				response(1);
				return;
			}
			var users = JSON.parse(localStorage[key]);
			var tag = false;
			for(var i = 0; i < users.length; i++) {
				if(users[i][gist] === value) {
					tag = true;
				}
			}
			tag ? response(0) : response(1);
		}

	}

}())

register.init();