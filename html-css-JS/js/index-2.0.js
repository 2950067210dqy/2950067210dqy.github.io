//记录导航栏之前点击的下标
var nav_oldClick_index=0;
//记录导航栏现在点击的下标
var nav_newClick_index=0;
var hero_b_click_bool=false;
//nav导航栏所有文字
//创建一个导航栏元素模拟类
var NUMBER=0
var Nav={
	createNew:function (hero_title,hero_p,hero_b,hero_b2,hero_b_addre,all_color=[],head_img_addre,flag=NUMBER++) {
		let nav={
			//改变导航栏文字
			changeWords:function () {
				$('.hero-title').text(this.hero_title);
				$('.hero-p').text(this.hero_p);
 	            $('.hero-b').text(this.hero_b);
 	            $('.hero-b2').text(this.hero_b2);
			},
			//改变导航栏链接地址
			changeAddre:function (addre="#") {
				$(".self_info>iframe").attr("src",this.hero_b_addre);
				$(".self_info>iframe").attr("href",this.hero_b_addre);
				// $('.hero-b').attr("href",this.hero_b_addre);
				$('.hero-b2').attr("href",addre);
				$(".hero-b").css({"display":"inline-block"});
				$(".hero-b2").css({"display":"inline-block"});
			},
			//改变导航栏li标签的背景颜色
			changeNavBg:function (doc,background_color="#444") {
				background_color="background-color:"+background_color;
				$('li').attr("style","");
				$(doc).attr("style",background_color);
			},
			//改变导航栏右横线的位置
			changeRL:function() {
			$(".rightline").css("top",17*this.flag+"%");
			},
			//改变导航栏顶部横线的位置
			changeTL:function(){
				$(".rightline").css("left",7+15*this.flag+"%");
			},
			//改变背景
			changeBg:function(){
				let str="url('img/bg"+this.flag+".jpg')";
				$('.hero').css("background-image",str);
				// $('body').css("background-image",str);
			},
			//改变所有区域里的颜色
			changeAllColor:function (doc) {
				$(".self_introduce").css({"background":this.all_color[0]});
				$(".website_msg").css({"background":this.all_color[1]});
				$(".head_img>img").attr("src",this.head_img_addre);
				if(hero_b_click_bool){
					$("header").css("background",nav_text_list[this.flag].getAll_color()[0]);
					console.log(nav_text_list[this.flag].getAll_color()[0]);
					$(".rightline").css("background",nav_text_list[this.flag].getAll_color()[1]);
					this.changeNavBg(doc,nav_text_list[this.flag].getAll_color()[1]);
				}
			}
			,
			getAll_color:function () {
				return this.all_color;
			}
			,
			changeStyle:function (doc,header_id,nav_index,li_width=0,li_height=0,) {
				this.changeWords();
				this.changeAddre();
				this.changeNavBg(doc);
				this.changeBg();
				this.changeAllColor(doc);
				if(header_id=="header_horizontal"){
					
					
					this.changeTL();
					if(nav_index>=nav_oldClick_index){
						addAnimateCss(".rightline","slideInLeft");
						addAnimateCss('.hero',"slideInRight");
						addAnimateCss('.hero-content',"slideInRight");
					}else{
						addAnimateCss(".rightline","slideInRight");
						addAnimateCss('.hero',"slideInLeft");
						addAnimateCss('.hero-content',"slideInLeft");
					}
					$(".self_info>iframe").contents().find("img").removeClass("img_vertical").addClass("img_horizontal");
				}else{
					
					this.changeRL();
					if(nav_index>=nav_oldClick_index){
						addAnimateCss(".rightline","slideInDown");
						addAnimateCss('.hero',"slideInDown");
						addAnimateCss('.hero-content',"slideInDown");
					}else{
						addAnimateCss(".rightline","slideInUp");
						addAnimateCss('.hero',"slideInUp");
						addAnimateCss('.hero-content',"slideInUp");
					}
					$(".self_info>iframe").contents().find(".img_vertical").removeClass("img_horizontal").addClass("img_vertical");
				}
				if(nav_index>=nav_oldClick_index){
					addAnimateCss('.self_info',"slideInDown");
				}else{
					addAnimateCss('.self_info',"slideInUp");
				}
				
				
				nav_oldClick_index=nav_index;
				
			}
		};
		nav.flag=flag;
		nav.hero_title=hero_title;
		nav.hero_p=hero_p;
		nav.hero_b=hero_b;
		nav.hero_b2=hero_b2;
		nav.hero_b_addre=hero_b_addre;
		nav.all_color=all_color;
		nav.head_img_addre=head_img_addre;
		return nav;
	}

};
//导航栏元素
var nav_text_list=[
	Nav.createNew("我叫邓亲优","是一个平凡而又普通的人","  注册","  登录","#",["#337ab7","#008899"],"use_img/head.jpg"),
	Nav.createNew("虽不新奇,却广泛","我的作品虽不新奇，但不妨来看看哦！","  查看更多","  登录","works.html#panel_0",["#337ab7","#008899"],"use_img/head.jpg"),
	Nav.createNew("豫章-南昌","豫章故郡，洪都新府,星分翼轸.地接衡庐。","  查看更多","  登录","hometown.html#panel_0",["#460e44","#003472"],"use_img/head_1.jpg"),
	Nav.createNew("九江学院（JJU）","坐落于庐山之麓、鄱阳湖之畔","  查看更多","  登录","school.html#panel_0",["#640125","#16160e"],"use_img/head_3.jpg"),
	Nav.createNew("想对我说什么","留言框，联系方式等","  查看更多","  登录","about.html#panel_0",["#bf242a","#946243"],"use_img/head_4.jpg"),
	Nav.createNew(" "," ","  注册","  登录","logo.html",["#392f41","#5d513c"],"use_img/head_5.jpg"),
];




$(document).ready(
	()=>new Promise((resolve, reject) => {
		removeStartAnimation(resolve);
	}).then(resolve=>{
		nav_click();
		nav_location();
		nav_position();
		changeBgBySelf();
		hero_b_click();
		
		check_logo();
		console.log(resolve);
	})
);
//退出登录
function exitLogo() {
	if (confirm("您确定要退出登录吗？")){
		$.removeCookie("logoing");
		location.href="index.html";
	}
}


//判断是否登录，并展示相应的效果
function check_logo() {
	var QueryString=window.location.href;
	QueryString=decodeURIComponent(QueryString);
	QueryString=QueryString.slice(QueryString.indexOf("?")+1);
	if(QueryString.indexOf("email")!=-1){
		logo_changeHtml(QueryString);
	}
	if($.cookie("logoing")!=undefined){
		$("#logo").find("span").html($.cookie("logoing")+"欢迎您,<a href='#' onclick='exitLogo()'>退出登录</a>");
	}
}
//如果登录，就改变HTML
function logo_changeHtml(string) {
	var username="";
	var email=getValue(string,"email");
	var user=eval('('+$.cookie("user")+')');
	for(var i =0;i<user.email.length;i++){
		if(user.email[i]==email){
			username=user.username[i];
		}
	}
	$("#logo").find("span").text(username+"欢迎您,<a href='#' onclick='exitLogo()'>退出登录</a>");
	$.cookie("logoing",username,{expires:365});
	
}
//获得get的值
function getValue(string,name) {
	var value= string.slice(string.indexOf(name)+name.length+1,string.indexOf("&"));
	return value;
}

//用户点击查看更多或登录或注册按钮时
function hero_b_click() {
   
	   $(".hero-b,.hero-b2").on("click",e=>{
	   	    if($(e.target).hasClass("hero-b")){
		        hero_b_click_bool=true;
		        if($("header").attr("id")=="header_vertical"){
			        changeStyleByFindAllByheader_vertical();
		        }else{
			        changeStyleByFindAllByheader_horizontal();
		        }
		    }else{
		       
		        hero_b_click_bool=true;
		        if($("header").attr("id")=="header_vertical"){
			        changeStyleByFindAllByheader_vertical(true);
		        }else{
			        changeStyleByFindAllByheader_horizontal(true);
		        }
	        }
		 
		   
			
	});
}




//查看内容时需要更换的样式(当导航栏横的)
function  changeStyleByFindAllByheader_horizontal(hero_b2_bool=false) {
	if (hero_b2_bool){
		$('li').attr("style","");
		$(".rightline").css("left",7+15*($("nav>ul:first>li").length-1)+"%")
		$(".self_info>iframe").attr({"src":"logo.html#panel_1","href":"logo.html#panel_1"});
		$(".self_info>iframe").contents().find("li").removeClass("active");
		$($(".self_info>iframe").contents().find("li")[1]).addClass("active");
		$("header").css({"box-shadow":"none","z-index":"5","opacity":"0.95"});
		nav_text_list[nav_text_list.length-1].changeAllColor($("nav>ul:first>li")[$("nav>ul:first>li").length-1]);
	}else {
		$("header").css({"box-shadow":"none","z-index":"5","background":nav_text_list[nav_newClick_index].getAll_color()[0],"opacity":"0.95"});
	}
	
	$(".self_info>iframe").contents().find("img").removeClass("img_vertical").addClass("img_horizontal");
	
	$(".self_info>iframe").contents().find("li").removeClass("active");
	$($(".self_info>iframe").contents().find("li")[0]).addClass("active");
	
	$("body").css({"background-image":"none","background-color":"whitesmoke"})
	$("#nav_menu").css({"right":"1%","top":"2%"});
	$(".hero-content").css({"display":"none"});
	
	$("#nav_position_button").css({"display":"none"});
	$(".self_info").css({"display":"inline-block","width":"73%","top":"9.5%"});
	$(".sub_nav").css({"display":"inline-block","top":"8%"});
	addAnimateCss("header","slideInLeft");
	addAnimateCss("#nav_menu","slideInRight");
	addAnimateCss(".hero","slideInRight")
	addAnimateCss(".self_info","slideInRight");
	addAnimateCss(".sub_nav","slideInRight");
}
//查看内容时需要更换的样式(当导航栏竖的)
function  changeStyleByFindAllByheader_vertical(hero_b2_bool=false) {
	if (hero_b2_bool){
		$('li').attr("style","");
		$(".rightline").css("top",17*($("nav>ul:first>li").length-1)+"%")
		$(".self_info>iframe").attr({"src":"logo.html#panel_1","href":"logo.html#panel_1"});
		$(".self_info>iframe").contents().find("li").removeClass("active");
		$($(".self_info>iframe").contents().find("li")[1]).addClass("active");
		nav_text_list[nav_text_list.length-1].changeAllColor($("nav>ul:first>li")[$("nav>ul:first>li").length-1]);
		$("header").css({"left":"27%","border-radius":"3%","box-shadow":"none","z-index":"1","opacity":"0.95"});
	}else {
		$("header").css({"left":"27%","border-radius":"3%","box-shadow":"none","z-index":"5","background":nav_text_list[nav_newClick_index].getAll_color()[0],"opacity":"0.95"});
	}
	
	$(".self_info>iframe").contents().find("img").removeClass("img_horizontal").addClass("img_vertical");
	$(".self_info>iframe").contents().find("li").removeClass("active");
	$($(".self_info>iframe").contents().find("li")[0]).addClass("active");
	$("body").css({"background-image":"none","background-color":"whitesmoke"})
	$("#nav_menu").css({"right":"59%","top":"63%"});
	$(".hero-content").css({"display":"none"});
	
	$("#nav_position_button").css({"display":"none"});
	$(".self_info").css({"display":"inline-block"});
	$(".sub_nav").css({"display":"inline-block"});
	addAnimateCss("header","slideInLeft");
	addAnimateCss("#nav_menu","slideInRight");
	addAnimateCss(".hero","slideInRight")
	addAnimateCss(".self_info","slideInRight");
	addAnimateCss(".sub_nav","slideInRight");
}



//实现用户自主更换壁纸
function changeBgBySelf() {
	try{
		$("#changeBG").find("img").each(function (i) {
		$(this).on("click",function(e){
			let header_id=$("header").attr("id");
			$('.hero').css("background-image",`url('${$(this).attr("src")}')`);
			if(header_id=="header_horizontal"){
				addAnimateCss(".hero","slideInRight");
			}else{
				addAnimateCss(".hero","slideInDown");
			}
			
		});
	})
	}catch (e) {
		console.log(e);
	}
	
}

//实现导航栏点击效果
function nav_click(header_id) {
	$("nav>ul:first>li").each(function(i){
		$(this).on("click",()=>{
			nav_newClick_index=i;
			nav_text_list[i].changeStyle(this,$("header").attr("id"),i);
		});
	});
}

//实现改变导航栏的排列方式
function nav_position() {
	//改变排列方式的具体做法
	change_nav_position=()=>{
		let header_id=$("header").attr("id");
		$("#nav_position_button").toggleClass("fa-rotate-270");
		if(header_id=="header_vertical"){
			$("header").css("top","0");
			$("header").css("left","0");
			$("header").attr("id","header_horizontal");
			$(".hero-content").css({"padding-top":"17%","margin-left":"40%"});
			addAnimateCss(".hero-content","bounceInUp");
			addAnimateCss("header","bounceInUp");
		}else if(header_id=="header_horizontal"){
			$("header").css("top","0");
			$("header").css("left","14%");
			$("header").attr("id","header_vertical");
			$(".hero-content").css({"padding-top":"14%","margin-left":"50%"});
			addAnimateCss(".hero-content","bounceInRight");
			addAnimateCss("header","bounceInLeft");
			
		}
		
	};
	$("#nav_position_button").on("click",e=>{
		change_nav_position();
	});
	

}



//实现可拖动导航栏位置
function nav_location() {
//更改菜单栏位置
	let startX,startWidth,marginX,startY,startHeight,marginY,random=0;

	$("header").on("mousedown",e=> {
		let header_id=$("header").attr("id");
		$("header").css("cursor","move");
		$("header").on("mousemove",e=>{
			if(header_id=="header_vertical"){
				startX =e.clientX;
				marginX=parseInt($(".hero-content").css("margin-left").substr(0,$(".hero-content").css("margin-left").indexOf("p")));
				startWidth=startX-$("header").width()/2;
				$("header").css("left",startWidth+"px");
				if (startWidth<$(window).width()/2){
					$(".hero-content").css("margin-left","55%");
					addAnimateCss(".hero-content","bounceInLeft");
				}else if(startWidth>$(window).width()/2){
					$(".hero-content").css("margin-left","15%");
					addAnimateCss(".hero-content","bounceInRight");
				}
				//到边缘就不能拖动
				if(parseInt($("header").css("left").substr(0,$(".hero-content").css("margin-left").indexOf("p")))<=0
					||parseInt($("header").css("left").substr(0,$(".hero-content").css("margin-left").indexOf("p")))>=$(".hero").width()-$("header").width()*1.5
				){
					//动画效果
					if(random==1){
						addAnimateCss("header","shakeX");
						random=0;
					}else{
						addAnimateCss("header","shakeY");
						random=1;
					}
					//	清除拖动事件
					$("header").off("mousemove");
					$("header").off("mouseup");
					$("header").css("cursor","");
				}
			}else if(header_id=="header_horizontal"){
				startY =e.clientY;
				console.log(startY);
				marginY=parseInt($(".hero-content").css("padding-top").substr(0,$(".hero-content").css("padding-top").indexOf("p")));
				startHeight=startY-$("header").height()/2;
				$("header").css("top",startHeight+"px");
				if (startHeight<$(window).height()/2){
					$(".hero-content").css("padding-top","17%");
					addAnimateCss(".hero-content","bounceInUp");
				}else if(startHeight>$(window).height()/2){
					$(".hero-content").css("padding-top","8%");
					addAnimateCss(".hero-content","bounceInDown");
				}
				//到边缘就不能拖动
				if(parseInt($("header").css("top").substr(0,$(".hero-content").css("padding-top").indexOf("p")))<=-10
					||parseInt($("header").css("top").substr(0,$(".hero-content").css("padding-top").indexOf("p")))>=$(window).height()-$("header").height()*1.6
				){
					//动画效果
					if(random==1){
						addAnimateCss("header","shakeX");
						random=0;
					}else{
						addAnimateCss("header","shakeY");
						random=1;
					}
					//	清除拖动事件
					$("header").off("mousemove");
					$("header").off("mouseup");
					$("header").css("cursor","");
				}
			}
		
			
		});
		$("header").on("mouseup",function (e) {
			$("header").off("mousemove");
			$("header").off("mouseup");
			$("header").css("cursor","");
			// if(random==1){
			// 	addAnimateCss("header","shakeX");
			// 	random=0;
			// }else{
			// 	addAnimateCss("header","shakeY");
			// 	random=1;
			// }
			
		});
	});
}

//清除一开始添加的动画类
function removeStartAnimation(resolve) {
	let flag1=false,flag2=false,flag3=false;
	$("header").one("animationend",()=>{
		$('header').removeClass(`animate__animated animate__bounceInDown`);
		flag1=true;
		if(flag1&&flag2&&flag3){
			resolve("加载完毕，动画全部演示完毕");
		}
	});
	$(".hero").one("animationend",()=>{
		$('.hero').removeClass(`animate__animated animate__pulse`);
		flag2=true;
		if(flag1&&flag2&&flag3){
			resolve("加载完毕，动画全部演示完毕");
		}
	});
	$(".hero-content").one("animationend",()=>{
		$('.hero-content').removeClass(`animate__animated animate__bounceInUp`);
		flag3=true;
		if(flag1&&flag2&&flag3){
			resolve("加载完毕，动画全部演示完毕");
		}
	});

}