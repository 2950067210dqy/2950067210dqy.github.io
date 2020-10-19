//记录导航栏之前点击的下标
var nav_oldClick_index=0;
//记录登录验证码
var logocode="";
//记录注册验证码
var registcode="";







$(document).ready(function () {
	nav_init();
	LRBtn_init();
	
		canvas_init();
		setCookies();
	regist_check();
	logo_check();
}
);
//cookie格式初始化
function setCookies() {
	if($.cookie("user")==null||$.cookie("user")==0||$.cookie("user")==""||$.cookie("user")==undefined){
		$.cookie("user","{'username':"+'[]'+",'password':"+'[]'+",'email':"+'[]'+"}",{expires:365});
	}
}
//生成验证码
function canvas_init() {
	
	logocode_init();
	registcode_init();

}

function logocode_init() {
	try {
		logocode=drawPic2("logo_canvas");
		console.log(logocode);
	}catch (e) {
		console.log(e);
	}
}

function registcode_init() {
	try {
		registcode=drawPic2("regist_canvas");
		console.log(registcode);
	}catch (e) {
		console.log(e);
	}
}



//检测登录是否有该用户
 function check_user() {
	var emailbool=false,passwordbool=false;
	 var user=eval('('+$.cookie("user")+')');
	 console.log($("#inputPassword").val());
	 for(var i =0;i<user.email.length;i++){
		 if ($("#inputEmail").val()==user.email[i]){
		 	emailbool=true;
		 	break;
		 }
	 }
	 for(var i =0;i<user.password.length;i++){
		 if ($("#inputPassword").val()==user.password[i]){
			 passwordbool=true;
			 break;
		 }
	 }
	 if(emailbool&&passwordbool){
	 	return true;
	 }else{
	 	alert("用户名或密码错误");
	    return false;
	 }
	 
	 
 }
//检查注册是否规范
function regist_check() {
	$("#inputEmailByRegist").on("keyup blur",function () {
		var regEmail = /^([a-zA-Z0-9_.-]+)@([da-z.-]+).([a-z.]{2,6})$/;
		var email=$("#inputEmailByRegist").val();
		$("#inputEmailByRegistTip").css("color","none");
		if(!regEmail.test(email)){
			if($($("#regist").find(".form-group")[0]).hasClass("has-success")){
				$($("#regist").find(".form-group")[0]).removeClass("has-success");
			}
			$($("#regist").find(".form-group")[0]).addClass("has-error");
			$("#inputEmailByRegistTip").text("email格式不正确");
			$("#inputEmailByRegistTip").css("color","#ff0705");
		}else {
			if($($("#regist").find(".form-group")[0]).hasClass("has-error")){
				$($("#regist").find(".form-group")[0]).removeClass("has-error");
			}
			$($("#regist").find(".form-group")[0]).addClass("has-success");
	
			$("#inputEmailByRegistTip").html("email格式正确");
			$("#inputEmailByRegistTip").css("color","#4cae4c");
		}
		
		check_registBtn();
		
	});
	$("#inputUsernameByRegist").on("keyup blur",function () {
		var username=$("#inputUsernameByRegist").val();
		$("#inputUsernameByRegistTip").css("color","none");
		if(username.length<6){
			if($($("#regist").find(".form-group")[1]).hasClass("has-success")){
				$($("#regist").find(".form-group")[1]).removeClass("has-success");
			}
			$($("#regist").find(".form-group")[1]).addClass("has-error");
			$("#inputUsernameByRegistTip").text("用户名少于6位");
			$("#inputUsernameByRegistTip").css("color","#ff0705");
		}else {
			if($($("#regist").find(".form-group")[1]).hasClass("has-error")){
				$($("#regist").find(".form-group")[1]).removeClass("has-error");
			}
			$($("#regist").find(".form-group")[1]).addClass("has-success");
			
			$("#inputUsernameByRegistTip").html("用户名格式正确");
			$("#inputUsernameByRegistTip").css("color","#4cae4c");
		}
		
		check_registBtn();
		
	});
	$("#inputPasswordByRegist").on("keyup blur",function () {
		var password=$("#inputPasswordByRegist").val();
		$("#inputPasswordByRegistTip").css("color","none");
		if(password.length<6){
			if($($("#regist").find(".form-group")[2]).hasClass("has-success")){
				$($("#regist").find(".form-group")[2]).removeClass("has-success");
			}
			$($("#regist").find(".form-group")[2]).addClass("has-error");
			$("#inputPasswordByRegistTip").text("密码少于6位");
			$("#inputPasswordByRegistTip").css("color","#ff0705");
		}else {
			if($($("#regist").find(".form-group")[2]).hasClass("has-error")){
				$($("#regist").find(".form-group")[2]).removeClass("has-error");
			}
			$($("#regist").find(".form-group")[2]).addClass("has-success");
			
			$("#inputPasswordByRegistTip").html("密码格式正确");
			$("#inputPasswordByRegistTip").css("color","#4cae4c");
		}
		
		check_registBtn();
	});
	$("#inputRePasswordByRegist").on("keyup blur",function () {
		var repassword=$("#inputRePasswordByRegist").val();
		$("#inputRePasswordByRegistTip").css("color","none");
		if(repassword!=$("#inputPasswordByRegist").val()){
			if($($("#regist").find(".form-group")[3]).hasClass("has-success")){
				$($("#regist").find(".form-group")[3]).removeClass("has-success");
			}
			$($("#regist").find(".form-group")[3]).addClass("has-error");
			$("#inputRePasswordByRegistTip").text("两次密码不一样");
			$("#inputRePasswordByRegistTip").css("color","#ff0705");
		}else {
			if($($("#regist").find(".form-group")[3]).hasClass("has-error")){
				$($("#regist").find(".form-group")[3]).removeClass("has-error");
			}
			$($("#regist").find(".form-group")[3]).addClass("has-success");
			
			$("#inputRePasswordByRegistTip").html("两次密码一样");
			$("#inputRePasswordByRegistTip").css("color","#4cae4c");
		}
		check_registBtn();
	
	});
	$("#inputcheckByRegist").on("keyup blur",function () {
		var checkcode=$("#inputcheckByRegist").val();
		$("#inputRecheckByRegistTip").css("color","none");
		if(checkcode!=registcode){
			if($($("#regist").find(".form-group")[4]).hasClass("has-success")){
				$($("#regist").find(".form-group")[4]).removeClass("has-success");
			}
			$($("#regist").find(".form-group")[4]).addClass("has-error");
			$("#inputcheckByRegistTip").text("验证码错误");
			$("#inputRecheckByRegistTip").css("color","#ff0705");
		}else {
			if($($("#regist").find(".form-group")[4]).hasClass("has-error")){
				$($("#regist").find(".form-group")[4]).removeClass("has-error");
			}
			$($("#regist").find(".form-group")[4]).addClass("has-success");
			
			$("#inputcheckByRegistTip").html("验证码正确");
			$("#inputcheckByRegistTip").css("color","#4cae4c");
		}
		check_registBtn();
	});
}
//检查登录是否规范
function logo_check() {
	
	$("#inputEmail").on("keyup blur",function () {
		$("#inputEmailTip").css("color","none");
		if($("#inputEmail").val().trim().length==0){
			if ($($("#logo").find(".form-group")[0]).hasClass("has-success")){
				$($("#logo").find(".form-group")[0]).removeClass("has-success");
			}
			$($("#logo").find(".form-group")[0]).addClass("has-error");
			$("#inputEmailTip").html("邮箱不能为空!");
			$("#inputEmailTip").css("color","#ff0705");
		}else{
			if ($($("#logo").find(".form-group")[0]).hasClass("has-error")){
				$($("#logo").find(".form-group")[0]).removeClass("has-error");
			}
			$($("#logo").find(".form-group")[0]).addClass("has-success");
			$("#inputEmailTip").html("");
			$("#inputEmailTip").css("color","#4cae4c");
		}
		check_logoBtn();
	});
	$("#inputPassword").on("keyup blur",function () {
		$("#inputPasswordTip").css("color","none");
		if($("#inputPassword").val().trim().length==0){
			if ($($("#logo").find(".form-group")[1]).hasClass("has-success")){
				$($("#logo").find(".form-group")[1]).removeClass("has-success");
			}
			$($("#logo").find(".form-group")[1]).addClass("has-error");
			$("#inputPasswordTip").html("密码不能为空!");
			$("#inputPasswordTip").css("color","#ff0705");
		}else{
			if ($($("#logo").find(".form-group")[1]).hasClass("has-error")){
				$($("#logo").find(".form-group")[1]).removeClass("has-error");
			}
			$($("#logo").find(".form-group")[1]).addClass("has-success");
			$("#inputPasswordTip").html("");
			$("#inputPasswordTip").css("color","#4cae4c");
		}
		check_logoBtn();
	});
	$("#inputcheck").on("keyup blur",function () {
		$("#inputcheckTip").css("color","none");
		if($("#inputcheck").val()!=logocode){
			if ($($("#logo").find(".form-group")[2]).hasClass("has-success")){
				$($("#logo").find(".form-group")[2]).removeClass("has-success");
			}
			$($("#logo").find(".form-group")[2]).addClass("has-error");
			$("#inputcheckTip").html("验证码错误!");
			$("#inputcheckTip").css("color","#ff0705");
		}else{
			if ($($("#logo").find(".form-group")[2]).hasClass("has-error")){
				$($("#logo").find(".form-group")[2]).removeClass("has-error");
			}
			$($("#logo").find(".form-group")[2]).addClass("has-success");
			$("#inputcheckTip").html("");
			$("#inputcheckTip").css("color","#4cae4c");
		}
		check_logoBtn();
	});
}
//检测注册按钮是否可以点击
function check_registBtn() {
	if($("#inputEmailByRegist").val().trim().length!=0&&
		$("#inputUsernameByRegist").val().trim().length!=0&&
		$("#inputPasswordByRegist").val().trim().length!=0&&
		$("#inputRePasswordByRegist").val().trim().length!=0&&
		$("#inputcheckByRegist").val().trim().length!=0&&
		$($("#regist").find(".form-group")[0]).hasClass("has-success")&&
		$($("#regist").find(".form-group")[1]).hasClass("has-success")&&
		$($("#regist").find(".form-group")[2]).hasClass("has-success")&&
		$($("#regist").find(".form-group")[3]).hasClass("has-success")&&
		$($("#regist").find(".form-group")[4]).hasClass("has-success")
	){
		
		$("#registBtn").removeClass("disabled");
		$("#registBtn").removeAttr("disabled");
		$("#registBtn").on("click",function () {
			if($.cookie("user")==null||$.cookie("user")==0||$.cookie("user")==""||$.cookie("user")==undefined){
				$.cookie("user","{'username':"+'[]'+",'password':"+'[]'+",'email':"+'[]'+"}",{expires:365});
			}else{
				console.log($.cookie("user"));
				var user=eval('('+$.cookie("user")+')');
		
				user.username.push($("#inputUsernameByRegist").val());
				user.password.push($("#inputPasswordByRegist").val());
				user.email.push($("#inputEmailByRegist").val());
				$.cookie("user", JSON.stringify(user),{expires:365});
			}
		});

	}
}
//检测登录按钮是否可以点击
function check_logoBtn() {
	if($("#inputEmail").val().trim().length!=0&&
		$("#inputPassword").val().trim().length!=0&&
		$("#inputcheck").val().trim().length!=0&&
		$($("#logo").find(".form-group")[0]).hasClass("has-success")&&
		$($("#logo").find(".form-group")[1]).hasClass("has-success")&&
		$($("#logo").find(".form-group")[2]).hasClass("has-success")
	){
		$("#logoBtn").removeClass("disabled");
		$("#logoBtn").removeAttr("disabled");
	}
}

//左右翻页按钮初始化
function LRBtn_init(){
	$(".leftBtn").on("click",function (e) {
		canvas_init();
		if (nav_oldClick_index==0){
			$(this).attr("href","#panel_"+($("header").find("li").length-1));
			nav_oldClick_index=$("header").find("li").length-1;
		}else{
			$(this).attr("href","#panel_"+(--nav_oldClick_index));
		}
		$("header").find("li").removeClass("active");
		$($("header").find("li")[nav_oldClick_index]).addClass("active");
		addAnimateCss(".panel","slideInDown")
		
	});
	$(".rightBtn").on("click",function (e) {
		canvas_init();
		if(nav_oldClick_index==$("header").find("li").length-1){
			$(this).attr("href","#panel_0");
			nav_oldClick_index=0;
		}else{
			$(this).attr("href","#panel_"+(++nav_oldClick_index));
		}
		$("header").find("li").removeClass("active");
		$($("header").find("li")[nav_oldClick_index]).addClass("active");
		addAnimateCss(".panel","slideInUp")
	});
}
//导航栏初始化
function nav_init() {
	$("header").find("li").each(function (i) {
		$(this).find("a").attr({"href":"#panel_"+i});
		$(this).on("click",()=>{
			canvas_init();
			$("header").find("li").removeClass("active");
			$(this).addClass("active");
			if(i>=nav_oldClick_index){
				addAnimateCss(".panel","slideInUp");
			}else{
				addAnimateCss(".panel","slideInDown");
			}
			
			nav_oldClick_index=i;
		});
	});
	//鼠标滑动监听
	//	火狐浏览器
		if(window.navigator.userAgent.indexOf("Firefox")>=0){
			$(window).on("DOMMouseScroll",function (e) {
				canvas_init();
				//向下滚动
				if(e.originalEvent.detail>0){
					if (nav_oldClick_index<$("header").find("li").length-1){
						// $(".self_info>iframe",window.parent.document).attr("src",'works.html#panel_'+(++nav_oldClick_index));
						$(location).attr('href','#panel_'+(++nav_oldClick_index));
						$("header").find("li").removeClass("active");
						$($("header").find("li")[nav_oldClick_index+""]).addClass("active");
						addAnimateCss(".panel","slideInUp");
					}
					
				}
				//向上滚动
				else{
					if (nav_oldClick_index>0){
						// $(".self_info>iframe",window.parent.document).attr("src",'works.html#panel_'+(--nav_oldClick_index));
						$(location).attr('href','#panel_'+(--nav_oldClick_index));
						$("header").find("li").removeClass("active");
						$($("header").find("li")[nav_oldClick_index+""]).addClass("active");
						addAnimateCss(".panel","slideInDown");
					}
				}
				
			});
		}
		//谷歌浏览器 其他
		else{
			$(window).on("mousewheel",function (e) {
				//向下滚动
				
				if(e.deltaY<0){
					if (nav_oldClick_index<3){
						// $(".self_info>iframe",window.parent.document).attr("src",'works.html#panel_'+(++nav_oldClick_index));
						$(location).attr('href','#panel_'+(++nav_oldClick_index));
						// $(window).scrollTop(777*(++nav_oldClick_index));
						$("header").find("li").removeClass("active");
						$($("header").find("li")[nav_oldClick_index+""]).addClass("active");
						// addAnimateCss(".panel","slideInUp");
					}
					
				}
				//向上滚动
				else{
					if (nav_oldClick_index>0){
						// $(window).scrollTop(777*(--nav_oldClick_index));
						// $(".self_info>iframe",window.parent.document).attr("src",'works.html#panel_'+(--nav_oldClick_index));
						$(location).attr('href','#panel_'+(--nav_oldClick_index));
						$("header").find("li").removeClass("active");
						$($("header").find("li")[nav_oldClick_index+""]).addClass("active");
						// addAnimateCss(".panel","slideInDown");
					}
				}
				
			});
		}
}

function drawPic2(id) {
	var node=$("#"+id);
	var img="";
	var code="";
	var str="0123456789";
	for(var i = 1;i <= 5; i++) {
		var txt = str[randomNum(0,str.length)];
		code=code+txt;
		img=img+"<img src='code_img/"+txt+".png' style='width: 25px;height: 50px'>";
	}
	node.html(img);
	return code;
}

/**绘制验证码图片**/
function drawPic(id) {
	var canvas = self.document.getElementById(id);
	var width = canvas.width;
	var height = canvas.height;
	//获取该canvas的2D绘图环境
	var ctx = canvas.getContext('2d');
	ctx.textBaseline ='bottom';
	/**绘制背景色**/
	ctx.fillStyle = randomColor(180, 240);
	//颜色若太深可能导致看不清
	ctx.fillRect(0,0,width,height);
	/**绘制文字**/
	var str ='ABCEFGHJKLMNPQRSTWXY123456789abcefghjklmnpqrstwxy';
	var code="";
	//生成四个验证码
	for(var i = 1;i <= 4; i++) {
		var txt = str[randomNum(0,str.length)];
		code=code+txt;
		ctx.fillStyle = randomColor(50,160);
		//随机生成字体颜色
		
		// ctx.font = randomNum(90,110) +'px Verdana';
		//随机生成字体大小
		var x = 10 + i * 50;
		var y = randomNum(100, 135);
		var deg = randomNum(-30, 30);
		//修改坐标原点和旋转角度
		ctx.translate(x, y);
		ctx.rotate(deg * Math.PI /180);
		ctx.fillText(txt,0,0);
		//恢复坐标原点和旋转角度
		ctx.rotate(-deg * Math.PI /180);
		ctx.translate(-x, -y);
	}
	
	/**绘制干扰线**/
	for(var i=0;i<3;i++) {
		ctx.strokeStyle = randomColor(40, 180);
		ctx.beginPath();
		ctx.moveTo(randomNum(0,width/2), randomNum(0,height/2));
		ctx.lineTo(randomNum(0,width/2), randomNum(0,height));
		ctx.stroke();
	}
	/**绘制干扰点**/
	for(var i=0;i <50;i++) {
		ctx.fillStyle = randomColor(255);
		ctx.beginPath();
		ctx.arc(randomNum(0, width), randomNum(0, height),1,0,2* Math.PI);
		ctx.fill();
	}
	return code;
}
/**生成一个随机数**/
function randomNum(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}
/**生成一个随机色**/
function randomColor(min, max) {
	var r = randomNum(min, max);
	var g = randomNum(min, max);
	var b= randomNum(min, max);
	return "rgb(" + r + "," + g + "," + b + ")";
}
