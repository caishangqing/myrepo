//商品详情页

$(document).ready(function() {

	//放大镜
	$(".drml_smimg").on("mousemove mouseleave", function(e) {
		//		设置移动距离并且要考虑到页面的滚动距离
		if(e.type == "mousemove") {
			var
				oleft = e.clientX - $(this).offset().left + $(document).scrollLeft() - ($(".glass").width() / 2),
				otop = e.clientY - $(this).offset().top + $(document).scrollTop() - ($(".glass").height() / 2);
			//边界判断
			if(oleft < 0) {
				oleft = 0;
			} else if(oleft > $(this).width() - $(".glass").width()) {
				oleft = $(this).width() - $(".glass").width();
			}
			if(otop < 0) {
				otop = 0;
			} else if(otop > $(this).height() - $(".glass").height()) {
				otop = $(this).height() - $(".glass").height();
			}
			$(".glass").css({
					display: "block",
					left: oleft,
					top: otop
				})
				//		公式是oleft/放大镜一共能移动的距离=图片的left/大图一共能移动的距离
			var
				imgx = (oleft / ($(this).width() - $(".glass").width())) * ($(".drml_bgimg img").width() - $(".drml_bgimg").width()),
				imgy = (otop / ($(this).height() - $(".glass").height())) * ($(".drml_bgimg img").height() - $(".drml_bgimg").height());
			console.log(imgx)
			$(".drml_bgimg img").css({
				display: 'block',
				left: -imgx,
				top: -imgy,
			})
		} else if(e.type == "mouseleave") {
			$(".glass").css({
				display: "none",
				right: 0,
				bottom: 0,
			})
			$(".drml_bgimg img").css({
				display: "none"
			})
		}
	})

	//	加入购物车

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
							obj.gNum += parseInt(aTar.gNum);
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

	$(".drm_right").on("click", ".detail_addshopcar", function(e) {
		var
			$tar = $(e.delegateTarget),
			gName = $tar.find(".drmr_title h3").text(),
			gPrice = $tar.find(".price").text(),
			gNum = parseInt($tar.find(".goods_num").val()),
			gPic = $tar.prev().find(".drml_smimg img").attr("src"),
			aTar = {};
		aTar.gName = gName;
		aTar.gPrice = gPrice;
		aTar.gPic = gPic;
		aTar.gNum = gNum;
		var $img =$tar.prev().find(".drml_smimg img").clone();
		$img.css({
			left:0,
			top:0,
			position:"absoulte"
		})
		$img.appendTo(".drml_smimg");
		$img.animate({
			left:760,
			top:-400,
			height:0,
			width:0,
			opacity:0
		},1000,function(){
			$img.remove();
			//写入cookie
			goodsCookie({
			cookiename: "goods",
			aTar: aTar,
			delete: false,
			})
		})
	})

	//增加和减少

	$(".num_prev").click(function() {
		var num = $(this).next(".goods_num").val();
		$(this).next(".goods_num").val(num <= 1 ? 1 : --num);
	})
	$(".num_next").click(function() {
		var num = $(this).prev(".goods_num").val();
		$(this).prev(".goods_num").val(num >= 999 ? 999 : ++num);
	})

	$(".goods_num").on("blur", function() {
		var num = $(this).val();
		if(isNaN(num) || num <= 1) {
			$(this).val(1);
		} else if(num >= 999) {
			$(this).val(999);
		}
	})

})