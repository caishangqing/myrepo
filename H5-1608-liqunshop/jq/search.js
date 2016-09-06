
//搜索页面js

$(function(){


$(".item_title").click(function(){
	var $tar=$(this).next(".item_list");
	if($tar.is(":visible")){
		$tar.stop(true,false).slideUp(400);
		$(this).children("i").css("background-position","-17px 0")
	}else{
		$tar.stop(true,false).slideDown(400);
		$(this).children("i").css("background-position","0 0");

	}
})










})
