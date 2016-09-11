/*
 * 注册登录页面
 * 时间：2016-09-05
 * */

$(function() {

	$("#login_form").validate({
		submitHandler: function() {
			$.cookie("user", $("#id").val(), {
				expires: 7,
				path: "/H5-1608-liqunshop"
			});
			location.href = "../";
		},
		rules: {
			id: {
				required: true,
				rangelength: [6, 18]
			},
			password: {
				required: true,
				remote: {
					url: "user.php",
					type: "POST",
					dataType: 'json',
					data: {
						id: function() {
							return $("#id").val();
						},
						password: function() {
							return $("#password").val();
						}
					}
				}
			},
		},
		messages: {
			id: {
				required: "请输入账号!",
				rangelength: "账号输入错误！"
			},
			password: {
				required: "请输入密码!",
				rangelength: "密码输入错误！",
				remote: "账号或密码错误！请重新输入。"
			}
		},
		//		错误放的地方
		errorClass: "showmsg",
		errorElement: 'div',
		errorPlacement: function(error, element) {
			error.prependTo('#login_form');
		},

	})









})