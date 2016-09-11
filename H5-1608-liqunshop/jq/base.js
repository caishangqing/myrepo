//公用js文件

$(function(){



	$(".header-class-tree").hide();
	$(".header-class").on("mouseenter", ".header-class-title", function() {
		$(".header-class-tree").stop(true, false).slideDown(400);
	})
	$(".header-class").on("mouseleave", function() {
		$(".header-class-tree").stop(true, false).slideUp(400);
	})





//cookie登录
	if($.cookie("user")) {
		$("#username").text($.cookie("user")).show();
		$("#login,#regist").hide();
		$("#logout").show();
		$("#myorder").click(function(){
			location.replace("indent.html?username="+$.cookie("user"))
		})
		$("#person").click(function(){
			location.replace("person.html?username="+$.cookie("user"))
		})
		$("#shopcar").click(function(){
			location.replace("shopcar.html?username="+$.cookie("user"))
		})
	} else {
		$("#username,#logout").hide();
		$("#login,#regist").show();
		$("#myorder,#person,#shopcar").click(function(){
			location.replace("login.html");
		})
	}

	$("#logout").click(function() {
		$.removeCookie("user",{
			path:"/H5-1608-liqunshop"
		});
		location.href="../index.html";
	})

	//搜索
	$("#header-search-btn").on("click",function(e){
		if($("#header-search-input").val()!=""){
			location.replace("search.html?keyword="+$("#header-search-input").val());
		}
	})

//	购物车里的数量
	var num=($.type($.cookie("goods")) !="undefined")?JSON.parse($.cookie("goods")).length:0;
	$(".headerCarCount").text(num);











})
