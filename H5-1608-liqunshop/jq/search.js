//搜索页面js

$(function() {

	$("img.lazy").lazyload({
		effect: "fadeIn",
		placeholder: "../imgs/search-img/wait2.gif",
		threshold: 500
	});

	$(".item_title").click(function() {
		var $tar = $(this).next(".item_list");
		if($tar.is(":visible")) {
			$tar.stop(true, false).slideUp(400);
			$(this).children("i").css("background-position", "-17px 0")
		} else {
			$tar.stop(true, false).slideDown(400);
			$(this).children("i").css("background-position", "0 0");
		}
	})

	//添加购物车
	var flag = true;

	$(".src_product li").on("click", ".addshopcar", function(e) {
		if(flag) {
			flag = false;
			var
				oTemp = {}; //创建临时对象用于存储生成的新对象
				goodsName = $(e.delegateTarget).find("#goodsName").text(),
				goodsPrice = $(e.delegateTarget).find("#goodsPrice").text(),
				tarPic = $(e.delegateTarget).find("#goodsPic"),
				goodsPic = tarPic.attr("data-src"),
				goodsNum = 1;
			$temp = $("<img/>");
			$temp.attr("src", goodsPic);
			$temp.css({
				height: tarPic.height(),
				width: tarPic.width(),
				position: "absolute",
				left: 0,
				top: 0,
				opacity: 1,
				zIndex: 999
			});
			tarPic.parent().append($temp);
			$temp.animate({
				left: tarPic.width() - 50,
				top: tarPic.height() + 60,
				height: 0,
				width: 0,
				opacity: 0,
			}, 1500, function() {
				$temp.remove();
				//显示数量
				oTemp.gName = goodsName;
				oTemp.gPrice = goodsPrice;
				oTemp.gPic = goodsPic;
				oTemp.gNum = goodsNum;
				goodsCookie({
					cookiename: "goods",
					aTar: oTemp,
					delete: false,
				});
//				购物车数量增加
				num=JSON.parse($.cookie("goods")).length;
				$(".headerCarCount").text(num);
				flag = true;
			})
		}
	})





	//购物车操作cookie
	function goodsCookie(otar) {
		/*		首先判断是否存在goods的cookie
				如果不存在就使用单例模式创建一个空cookie*/
		var
			cookieName = otar.cookiename || "myCookie", //cookie的名字
			aTar = otar.aTar || {}, //传入的对象
			bool = otar.delete || false; //是否删除cookie中的对象
		if(!$.cookie(cookieName)) {
			aGoods = [];
			aGoods.push(aTar);
			$.cookie(cookieName, JSON.stringify(aGoods),{expires:7,path: "/H5-1608-liqunshop"});
		} else {
			//然后再判断cookie中是否存在输入的对象
			aGoods = JSON.parse($.cookie(cookieName));
			//			遍历cookie数组,如果数组中存在要输入的对象就把num++
			var flag = false; //用于判断是否操作数组了
			$.each(aGoods, function(index, obj) {
					if(obj.gName == aTar.gName) {
						if(!bool) {
							obj.gNum += aTar.gNum;
						} else {
							if(obj.gNum - aTar.gNum > 0) {
								obj.gNum -= aTar.gNum;
							} else {
								aGoods = $.grep(aGoods, function(n, i) {
									return index == i ? false : true;
								})
							}
						}
						flag = true;
						return false;
					} else {
						//如果没有商品了再删除也会走着一条路
						flag = false;
					}
				})
				//				遍历过之后更新cookie
				//				如果flag为true则说明原来数组中存在该对象
				//				如果为false则说明不存在该对象要重新push进去
			if(flag){
				$.cookie(cookieName, JSON.stringify(aGoods),{expires:7,path: "/H5-1608-liqunshop"})
			} else if(!bool){
				aGoods.push(aTar);
				$.cookie(cookieName, JSON.stringify(aGoods),{expires:7,path: "/H5-1608-liqunshop"});
			}else{
				$.cookie(cookieName, JSON.stringify(aGoods),{expires:7,path: "/H5-1608-liqunshop"});
			}
		}
	}













})