// JavaScript Document
let random=0;
$(document).ready(
function(){

	//菜单栏hover效果
	$('li').each(function (i) {
	$(this).hover(function () {

		switch (i) {
			case 0:
				changeStyle(this,"我叫邓亲优","是一个平凡而又普通的人","  查看更多","  登录");
				$('.hero-content').addClass("animate__animated animate__bounceInDown");
				$('.hero').addClass("animate__animated animate__pulse");
				changeLiBg(this);
				changebg(i);
				$(".rightline").css("top",17*i+"%");
				$('.rightline').addClass("animate__animated animate__bounceInDown");
				break;
			case 1:
				changeStyle(this,"虽不新奇,却广泛","我的作品虽不新奇，但不妨来看看哦！","  查看更多","  登录","hobby.html");
				$('.hero-content').addClass("animate__animated animate__bounceInDown");
				$('.hero').addClass("animate__animated animate__pulse");
				changeLiBg(this);
				changebg(i);
				$(".rightline").css("top",17*i+"%");
				$('.rightline').addClass("animate__animated animate__bounceInDown");
				break;
			case 2:
				changeStyle(this,"豫章-南昌","豫章故郡，洪都新府,星分翼轸.地接衡庐。","  查看更多","  登录","hometown.html");
				$('.hero-content').addClass("animate__animated animate__bounceInDown");
				$('.hero').addClass("animate__animated animate__pulse");
				changeLiBg(this);
				changebg(i);
				$(".rightline").css("top",17*i+"%");
				$('.rightline').addClass("animate__animated animate__bounceInDown");
				break;
			case 3:
				changeStyle(this,"九江学院（JJU）","坐落于庐山之麓、鄱阳湖之畔","  查看更多","  登录","school.html");
				$('.hero-content').addClass("animate__animated animate__bounceInDown");
				$('.hero').addClass("animate__animated animate__pulse");
				changeLiBg(this);
				changebg(i);
				$(".rightline").css("top",17*i+"%");
				$('.rightline').addClass("animate__animated animate__bounceInDown");
				break;
			case 4:
				changeStyle(this,"想对我说什么","留言框，联系方式等","  查看更多","  登录","about.html");
				$('.hero-content').addClass("animate__animated animate__bounceInDown");
				$('.hero').addClass("animate__animated animate__pulse");
				changeLiBg(this);
				changebg(i);
				$(".rightline").css("top",17*i+"%");
				$('.rightline').addClass("animate__animated animate__bounceInDown");
				break;
			case 5:
				changeStyle(this," "," ","  注册","  登录","regist.html");
				$('.hero-content').addClass("animate__animated animate__bounceInDown");
				$('.hero').addClass("animate__animated animate__pulse");
				changeLiBg(this);
				changebg(i);
				$(".rightline").css("top",17*i+"%");
				$('.rightline').addClass("animate__animated animate__bounceInDown");
				break;
		}



	},function () {

		switch (i) {
			case 0:
				removeBgTm();
				removeTm();
				$('.rightline').removeClass("animate__animated animate__bounceInDown");
				break;
			case 1:
				removeBgTm();
				removeTm();
				$('.rightline').removeClass("animate__animated animate__bounceInDown");
				break;
			case 2:
				removeBgTm();
				removeTm();
				$('.rightline').removeClass("animate__animated animate__bounceInDown");
				break;
			case 3:
				removeBgTm();
				removeTm();
				$('.rightline').removeClass("animate__animated animate__bounceInDown");
				break;
			case 4:
				removeBgTm();
				removeTm();
				$('.rightline').removeClass("animate__animated animate__bounceInDown");
				break;
			case 5:
				removeBgTm();
				removeTm();
				$('.rightline').removeClass("animate__animated animate__bounceInDown");
				break;
		}


	})

	});



	//更改菜单栏位置
	var startX,startWidth,marginX;
	$("header").on("mousedown",function (e) {
		$("header").css("cursor","move");
		$("header").on("mousemove",function (e) {
			startX =e.clientX;
			marginX=parseInt($(".hero-content").css("margin-left").substr(0,$(".hero-content").css("margin-left").indexOf("p")));
			startWidth=startX-$("header").width()/2+10;
			$("header").css("left",startWidth+"px");

			if (startWidth<$(window).width()/2){
				$(".hero-content").css("margin-left","40%");
				$(".hero-content").toggleClass("animate__animated animate__bounceInDown animate__repeat-1")
			}else if(startWidth>$(window).width()/2){
				$(".hero-content").css("margin-left","15%");
			}

			//到边缘就不能拖动
			if(parseInt($("header").css("left").substr(0,$(".hero-content").css("margin-left").indexOf("p")))<=0
			||parseInt($("header").css("left").substr(0,$(".hero-content").css("margin-left").indexOf("p")))>=$(window).width()-$("header").width()*1.6
			){
				//动画效果
				$("header").removeClass("animate__animated animate__bounceInDown");
				$("header").removeClass("animate__animated animate__shakeX");
				$("header").removeClass("animate__animated animate__shakeY");
				if(random==1){
					$("header").addClass("animate__animated animate__shakeX");
					random=0;
				}else{
					$("header").addClass("animate__animated animate__shakeY");
					random=1;
				}

			//	清除拖动事件
				$("header").off("mousemove");
				$("header").off("mouseup");
				$("header").css("cursor","");
			}


		});
		$("header").on("mouseup",function (e) {
			$("header").off("mousemove");
			$("header").off("mouseup");
			$("header").css("cursor","");
			$("header").removeClass("animate__animated animate__bounceInDown");
			$("header").removeClass("animate__animated animate__shakeX");
			$("header").removeClass("animate__animated animate__shakeY");
			if(random==1){
				$("header").addClass("animate__animated animate__shakeX");
				random=0;
			}else{
				$("header").addClass("animate__animated animate__shakeY");
				random=1;
			}

		});
	});
}
);







//改变风格
function changeStyle(doc,str1="错误",str2="错误",str3="错误",str4="错误",addr1="#",addr2="logo.html") {
	changeWord(str1,str2,str3,str4);
	changeLiBg(doc);
	changeAddr(addr1,addr2);
}

//改变导航栏背景颜色
function changeLiBg(doc) {
	// if($(doc).get(0).hasAttribute("style")){
	// 	$(doc).attr("style","");
	// }else{
	// 	$(doc).attr("style","background-color:#444");
	// }
	$('li').attr("style","");
	$(doc).attr("style","background-color:#444");

}


//清除动画类
function removeTm() {
	if($(".hero-content").hasClass("animate__animated animate__bounceInLeft")){
		$(".hero-content").removeClass("animate__animated animate__bounceInLeft");
	}else{
			$(".hero-content").removeClass("animate__animated animate__bounceInDown");
	}
}

//清除背景图片动画效果
function removeBgTm() {
	$(".hero").removeClass("animate__animated animate__pulse");
}


//改变字
function changeWord(str1,str2,str3,str4) {
	$('.hero-title').text(str1);
	$('.hero-p').text(str2);
	$('.hero-b').text(str3);
	$('.hero-b2').text(str4);

}

function changeAddr(addr1,addr2) {
	$('.hero-b').attr("href",addr1);
	$('.hero-b2').attr("href",addr2);
}

function changebg(i) {
	var str="url('img/bg"+i+".jpg')";
	$('.hero').css("background-image",str);
	// console.log($('.hero').css("background-image"));
	// console.log(str);
}

function changeRL(i) {
	$(".rightline").css("top",16*i+"%");
	$(".rightline").addClass("animate");
}



