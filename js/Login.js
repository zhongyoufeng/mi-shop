/**
 * 登录
 */
var login = (function() {
	var scan = document.getElementById("scan-login");
	var account = document.querySelector(".accounts");
	var main = document.getElementById("main");
	var mainFooter = document.getElementById("main-footer");
	var scanBox = document.querySelector(".scan-box");
	var btn = document.querySelector(".obtn");
	var register = document.querySelector(".register");

	return {
		init() {
			this.event();
			this.login('users')
		},
		event() {
			var that = this;
			scan.onclick = function() {
				main.style.display = "none";
				mainFooter.style.display = "none";
				scanBox.style.display = "block";
			};
			account.onclick = function() {
				main.style.display = "block";
				mainFooter.style.display = "block";
				scanBox.style.display = "none";
			}

		},
		login(key) {
			var btn = document.querySelector(".obtn");
			var register = document.querySelector(".register");
			btn.onclick = function() {
				//获取值
				var ID = document.querySelector(".ID").value,
					pwd = document.querySelector(".pwd").value;
				if(localStorage.users) {
					var user = JSON.parse(localStorage[key]);
					for(var i = 0; i < user.length; i++) {
						if(user[i].username === ID && user[i].password === pwd) {
							alert("登录成功")
							//跳转页面
							document.cookie = `username=${ID}; max-age=100000`;
							location.href = `index.html`;
							break;
						} else if(ID === "" || pwd === "") {
							alert("请输入帐号或密码");
							break;
						} else if(user[i].username !== ID && user[i].password !== pwd) {
							alert("帐号或密码错误");
							break;
						}
					}
				} else {
					alert("账号不存在，请前往注册");
					location.href = 'register.html';
				}

			};
			window.onkeydown = function(e) {
				var keyCode = e.keyCode || e.which;
				if(keyCode == 13) {
					var ID = document.querySelector(".ID").value,
						pwd = document.querySelector(".pwd").value;
					if(localStorage.users) {
						var user = JSON.parse(localStorage[key]);
						for(var i = 0; i < user.length; i++) {
							if(user[i].username === ID && user[i].password === pwd) {
								alert("登录成功")
								//跳转页面
								document.cookie = `username=${ID}; max-age=100000`;
								location.href = `index.html`;
								break;
							} else if(ID === "" || pwd === "") {
								alert("请输入帐号或密码");
								break;
							} else if(user[i].username !== ID && user[i].password !== pwd) {
								alert("帐号或密码错误");
								break;
							}
						}
					} else {
						alert("账号不存在，请前往注册");
						location.href = 'register.html';

					}
				}
			}
			register.onclick = function() {
				location.href = "register.html"
			}
		}

	}
}())


login.init();