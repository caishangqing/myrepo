/*
 * 注册登录页面
 * 时间：2016-09-05
 * */

$(function() {

	$(".header-class").on("mouseenter", ".header-class-title", function() {
		$(".header-class-tree").slideDown(400);
	})
	$(".header-class").on("mouseleave", function() {
		$(".header-class-tree").slideUp(400);
	})




})