//订单处理

$(function(){

	var aGoods=$.type($.cookie("goods"))!="undefined"?JSON.parse($.cookie("goods")):null;
	var goodsprice=0;//商品价格
	var	weight=0;//商品重量
	$.each(aGoods,function(index,obj){
		var otd=$("<tr class='goods_list'>");
		otd.html("<td>01278812</td><td>"+obj.gName
		+"</td><td>"+obj.gPrice+"</td><td>"+obj.gNum+"</td><td>"+parseInt(obj.gPrice.slice(1))*obj.gNum+"</td>")
		goodsprice+=parseInt(obj.gPrice.slice(1))*obj.gNum;
		weight+=obj.gNum*1
		$(".ll").after(otd);
	})
	$("#goodsprice").text(goodsprice.toFixed(2));
	$("#weight").text(weight.toFixed(2)+"kg");
	$("#postprice").text((weight*1.8).toFixed(2));
	$("#allprice").text(((weight*1.5)+goodsprice).toFixed(2));
	$("#total").text($("#allprice").text());








})

