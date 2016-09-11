//购物车js
$(function() {

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
			$.cookie(cookieName, JSON.stringify(aGoods), {
				expires: 7,
				path: "/H5-1608-liqunshop"
			});
		} else {
			//然后再判断cookie中是否存在输入的对象
			aGoods = JSON.parse($.cookie(cookieName));
			//			遍历cookie数组,如果数组中存在要输入的对象就把num++
			var flag = false; //用于判断是否操作数组了
			$.each(aGoods, function(index, obj) {
					if(obj.gName == aTar.gName) {
						if(!bool) {
							obj.gNum += aTar.gNum;
							console.log(obj.gNum)
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
			if(flag) {
				$.cookie(cookieName, JSON.stringify(aGoods), {
					expires: 7,
					path: "/H5-1608-liqunshop"
				})
			} else if(!bool) {
				aGoods.push(aTar);
				$.cookie(cookieName, JSON.stringify(aGoods), {
					expires: 7,
					path: "/H5-1608-liqunshop"
				});
			} else {
				$.cookie(cookieName, JSON.stringify(aGoods), {
					expires: 7,
					path: "/H5-1608-liqunshop"
				});
			}
		}
	}

	//增加商品
	function createPage() {
		var oCar = ($.type($.cookie("goods")) != "undefined") ? JSON.parse($.cookie("goods")) : null;
		if(oCar) {
			$.each(oCar, function(index, obj) {
				var oUl = $("<ul>");
				oUl.html("<li class='goods_name'><img src='" + obj.gPic +
					"'/><span class='name'>" + obj.gName +
					"</span></li><li class='goods_price'>" + obj.gPrice +
					"</li><li class='goods_num'><a href='javascript:;' class='reduce_num'></a>" +
					"<input type='text' class='show_num' value='" + obj.gNum + "' /><a href='javascript:;' class='add_num'></a>" +
					"</li><li class='goods_total'>¥" + (parseFloat(obj.gPrice.slice(1)) * obj.gNum).toFixed(2) + "</li><li class='goods_intergral'>126</li><li class='goods_option'><a href='javascript:;' class='clear'>清除</a></li><li class='goods_state'></li>");
				$(".cart_goods").append(oUl)
			})
		}
	}

	createPage();

	$(".cart_goods").on("click", ".reduce_num", function(e) {
		var
			$oUl = $(this).parent().parent(),
			goodsName =$oUl.find(".name").text(),
			goodsPrice = $oUl.find(".goods_price").text(),
			goodsPic = $oUl.find(".goods_name img").attr("src"),
			goodsNum = $oUl.find(".show_num")

			goodsCookie({
				cookiename:"goods",

			})
	})

})