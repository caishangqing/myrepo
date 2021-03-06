/*
 * 首页jq
 * 时间:2016-09-02
 * */






$(function() {

	var $floor_tab = $(".floor-right");
	//选项卡
	$floor_tab.on("mouseenter", ".floor-tab li", function(e) {
		var $tar = $(e.delegateTarget).find(".tab-content");
		$tar.css("display", "none");
		$(this).addClass("active").siblings().removeClass("active");
		$tar.eq($(this).index()).stop(true, false).fadeIn(600);
	})

	//nav-right
	var $wH = $(window).innerHeight(); //获取屏幕的高度
	$(window).on("scroll", function(e) {
		var $sH = document.documentElement.scrollTop || document.body.scrollTop;
		if($sH > 1000) {
			$(".nav-right").fadeIn(400);
		} else {
			$(".nav-right").css("display", "none");
		}
	})

	//客户服务
	$(".server").on("mouseenter", function() {
		$(this).children(".header-more-service").stop(true, true).fadeIn(100, function() {
			$(".server").addClass("border");
		})
	})

	$(".server").on("mouseleave", function() {
		$(this).children(".header-more-service").stop(true, true).fadeOut(100, function() {
			$(".server").removeClass("border");
		})
	})

	//banner轮播
	var swiper1 = new Swiper('.bgslider', {
		lazyLoading: true,
		autoplay: 5000,
		loop: true,
		pagination: '.swiper-pagination',
		paginationClickable: true,
		autoplayDisableOnInteraction: false,
		paginationBulletRender: function(index, className) {
			return '<li class="' + className + '">' + (index + 1) + '</li>';
		}
	})

	// $(".swiper-container").hover(function() {
	// 	swiper1.stopAutoplay();
	// }, function() {
	// 	swiper1.startAutoplay();
	// })

	//页面中的小轮播
	var swiper2 = new Swiper('.smslider', {
			autoplay: 4000,
			loop: true,
			pagination: '.swiper-pagination',
			paginationClickable: true,
			autoplayDisableOnInteraction: false,
		})
		//	广告tab
	var swiper5 = new Swiper('.adslider', {
		loop: true,
		pagination: '.swiper-pagination',
		paginationClickable: true,
	})

	//长轮播
	var mySwiper3 = new Swiper('.longslider', {
			autoplay: 3000,
			prevButton: '.longslider .swiper-button-prev',
			nextButton: '.longslider .swiper-button-next',
			loop: true,
			autoplayDisableOnInteraction: false,
			slidesPerView: "auto",
		})
		//	带时间的轮播
	var mySwiper4 = new Swiper('.carousel', {
		autoplay: 5000,
		prevButton: '.carousel .swiper-button-prev',
		nextButton: '.carousel .swiper-button-next',
		loop: true,
		autoplayDisableOnInteraction: false,
	})

	//倒计时
	$(".time").each(function() {
		var that = this;
		var $endTime = $(this).attr("data-time");
		$(this).countdown($endTime, function(e) {
			$(that).find("span").text(e.strftime('%D天 %H:%M:%S'))
		})
	})

	//楼层显示
	$(".nav-right").on("click mouseenter mouseleave", "li", function(e) {
		var $index = $(this).index();
		if(e.type == "click") {
			$(this).siblings().each(function() {
				$(this).find("img").attr({
					"src": "imgs/index-img/nav" + ($(this).index()+1) + ".jpg",
					"data-on": ""
				})
			})
			$(this).find("img").attr({
				"src": "imgs/index-img/nav" + ($index + 1) + "r.jpg",
				"data-on": "on"
			})
		} else if(e.type == "mouseenter") {
			$(this).find("img").attr("src", "imgs/index-img/nav" + ($index + 1) + "r.jpg")
		} else if(e.type == "mouseleave") {
			if($(this).find("img").attr("data-on") != "on") {
				$(this).find("img").attr("src", "imgs/index-img/nav" + ($index + 1) + ".jpg")
			}
		}
	})

	//cookie登录
	if($.cookie("user")) {
		$("#username").text($.cookie("user")).show();
		$("#login,#regist").hide();
		$("#logout").show();
		$("#myorder").click(function() {
			location.replace("html/indent.html?username=" + $.cookie("user"))
		})
		$("#person").click(function() {
			location.replace("html/person.html?username=" + $.cookie("user"))
		})
		$("#shopcar").click(function() {
			location.replace("html/shopcar.html?username=" + $.cookie("user"))
		})

		//	购物车里的数量
		var num = ($.type($.cookie("goods")) != "undefined") ? JSON.parse($.cookie("goods")).length : 0;
		$(".headerCarCount").text(num);

	} else {
		$("#username,#logout").hide();
		$("#login,#regist").show();
		$("#myorder,#person,#shopcar").click(function() {
			location.replace("html/login.html");
		})
	}
	//	退出销毁cookie
	$("#logout").click(function() {
		$.removeCookie("user");
		location.reload();
	})

	//搜索
	$("#header-search-btn").on("click", function() {
		if($("#header-search-input").val() != "") {
			location.replace("html/search.html?keyword=" + $("#header-search-input").val());
		}
	})



	var itemIndex=-1;//初始化显示的序号
	//跨域获取数据
	$("#header-search-input").on("keyup", function(e) {
		if($(this).val()!=""&&e.which!=40&&e.which!==38&&e.which!==13){
			$.ajax({
				type:"get",
				url:"http://www.liqunshop.com//Home/GetSearch?keyWords="+ $(this).val(),
				dataType:"jsonp",
				jsonp:"callback",
				success:function(obj){
						var sHtml = "";
						$.each(obj, function(index,n) {
							return  sHtml+="<li><a href='javascript:;'>"+n.keywords+"</a></li>";
						});
						if(obj.length!=0){
							$("#list").html(sHtml).slideDown(100);
						}
				}
			});
		}else{
			var itemCount=$("#list li").length-1;
			if(e.which==40){			//向下
				$("#list li").eq(itemIndex=itemIndex<itemCount?++itemIndex:0).addClass("active").siblings().removeClass("active");
			}else if(e.which==38){		//向上
				$("#list li").eq(itemIndex=itemIndex>=0?--itemIndex:itemCount-1).addClass("active").siblings().removeClass("active");
			}else if(e.which==13){		//回车
				$(this).val($("#list li").eq(itemIndex).text());
				$("#list").html("").slideUp(100);
				itemIndex=-1;
			}
		}
	})
	//事件委托 点击li把内容添加到input
	$("#list").on("click", "li", function(e) {
		e.stopPropagation();
		$("#header-search-input").val($(this).text());
		$(e.delegateTarget).slideUp(200).html("");
	})

	$(document).on("click",function(){
		$("#list").slideUp(200).html("");
	})







})






