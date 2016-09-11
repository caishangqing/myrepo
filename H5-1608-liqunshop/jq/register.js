//表单验证

$().ready(function() {

	//	表单验证
	$("#reg_form").validate({
		//表单提交事件句柄
		submitHandler: function(form) {

			$.cookie("user",$("#reg_name").val(),{
				expires:7,
				path:"/H5-1608-liqunshop"
			});
			location.href="../";
		},

		rules: {
			reg_name: {
				emailorphone: true,
				required: true,
				rangelength: [6, 18]
			},
			reg_pwd: {
				required: true,
				rangelength: [6, 18]
			},
			reg_repwd: {
				rangelength: [6, 18],
				equalTo: "#reg_pwd"
			},
			reg_test: {
				required: true,
				code: true
			},
			agree:"required"

		},
		messages: {
			reg_name: {
				required: "请输入账号！",
				rangelength: "账户限制在{0}-{1}位！"
			},
			reg_pwd: {
				required: "请输入密码!",
				rangelength: "密码限制在{0}-{1}位！"
			},
			reg_repwd: {
				rangelength: "密码限制在{0}-{1}位！",
				equalTo: "两次密码不同"
			},
			reg_test: {
				required: "请输入验证码!",
			},
			agree:"请阅读交易条款"
		},



		//		更改错误显示地方
		errorPlacement: function(error, element) {
			error.appendTo(element.parent());
		},
		//	错误后获得焦点移除错误
//		focusCleanup: true,

		unhighlight: function(element, errorClass) {
			if($(element).val() != "") {
				$(element).siblings(".reg_success").show();
			}
		},
		//高亮显示错误
		highlight: function(element, errorClass) {
			$(element).siblings(".reg_success").hide();
			$(element).focus(function() {
				$(element).siblings(".reg_success").hide();
			});
		},

	})




	//添加自定义邮箱或者手机号验证
	$.validator.addMethod('emailorphone', function(value, element) {
		var email = /^([\w\.\_]+)@([\w\.\_]+)\.([\w]{2,4})$/;
		var phone = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
		return this.optional(element) || (email.test(value)) || (phone.test(value));
	}, '请正确填写邮箱或者手机号');

	//验证码验证
	$.validator.addMethod('code', function(value, element) {
		var inputcode = value.toUpperCase();
		return this.optional(element) || inputcode == code ? true : false;
	}, '请输入正确的验证码！');

	var code; //全局定义验证码
	function createCode() {
		code = '';
		var codeLength = 4;
		$('#captcha').value = '';
		var selectchar = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'G', 'K', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
		for(var i = 0; i < codeLength; i++) {
			var charIndex = Math.floor(Math.random() * 32);
			code += selectchar[charIndex];
		}
		if(code.length != codeLength) {
			createCode();
		}
		$('#test_code').text(code);
	}
	createCode();
	$('#checkcode').click(function() {
		createCode();
	});



	//自动补全
	$("#reg_name").autocomplete({
		 source: function (request, response) {//request是用来获取输入值而response是用来全部呈现数据源
                var hosts = ['qq.com', '168.com', '126.com', 'sina.com', 'gmail.com', 'hotmail.com', 'sohu.com', 'yahoo.com'],
                term = request.term,	   		//获取用户输入内容
                name = term, 					//邮箱的用户名
                host = '',					//邮箱的域名
                ix = term.indexOf('@'),		//@的位置
                result = [];					//提示的结果集
                //结果第一条为自己输入的值
                result.push(term);
                //当@有的时候，重新分配用户名和域名
                if (ix > -1) {
                    name = term.slice(0, ix);
                    host = term.slice(ix + 1);
                }
                if (name) {
                //如果用户名已经输入@和后面的域名，
                // 那么就找到相关的域名提示比如a@1就提示a@168.com，
                // 如果用户还没有输入@和后面的内容，
                // 那么就把所有域名都提示出来
                var findedHosts = (host ? $.grep(host, function (value, index) {
                    return value.indexOf(host) > -1;
                }) : hosts),
                //最终列表中的邮箱
                findedResults = $.map(findedHosts, function (value, index) {
                    return name + '@' + value;
                });
                //增加到result数组中一个自我输入
                result = result.concat(findedResults);
            }
            response(result);
        },
        delay: 0,
        autoFocus: true

	});











})