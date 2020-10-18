//记录导航栏之前点击的下标
var nav_oldClick_index=0;



//定义一个介绍网页的类

var Panel={
	createNew:function (works_addre,works_name,works_introduction,works_tec,works_img_addre) {
		let panel= {};
		panel.works_addre=works_addre;
		panel.works_name=works_name;
		panel.works_introduction=works_introduction;
		panel.works_tec=works_tec;
		panel.works_img_addre=works_img_addre;
		return panel;
	}
	
};
//导航栏元素
var Panel_list=[
	Panel.createNew("#",
		"前言",
		"本人的作品都是由大作业或兴趣写成的,\n本次展示的作品都是网页，小程序不予展示",
		" ",
		"img/bg18.jpg"),
	Panel.createNew("http://47.94.164.171/phpproject2/HTML/index.php",
		"沁柚商城",
		"实现购物车，收藏，商家，用户，管理员，好友聊天功能等的网页商城",
		"php html mysql jquery bootstrap",
		"works_img/works_2.png"),
	Panel.createNew("http://47.94.164.171/phpproject2/BILIBILI/bilibili.php",
		"哔哩哔哩排行榜",
		"爬取bilibili排行榜的数据存储到数据库上并且展示到网页上。",
		"python爬虫 mysql linux定时任务 php js html",
		"works_img/works_1.png"),
	
	Panel.createNew("http://47.94.164.171/shzyhxjzg/html/index.html",
		"社会主义核心价值观",
		"简单网页，展示社会主义核心价值观",
		"html js",
		"works_img/works_3.png"),
	Panel.createNew("http://47.94.164.171/jju_scenery/jju_thing/index.html",
		"九江学院四季",
		"简单网页，展示九江学院四季",
		"html js",
		"works_img/works_4.png"),
	Panel.createNew("http://47.94.164.171",
		"更多",
		"想看更多,请点击图片",
		" ",
		"works_img/works_5.png"),
];




$(document).ready(function () {
	
	panel_init();
	nav_init();
	LRBtn_init();
}
);



//左右翻页按钮初始化
function LRBtn_init(){
	$(".leftBtn").on("click",function (e) {
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
		$(this).find("a").text(Panel_list[i].works_name);
		$(this).on("click",()=>{
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
				//向下滚动
				if(e.originalEvent.detail>0){
					if (nav_oldClick_index<$("header").find("li").length-1){
						// $(".self_info>iframe",window.parent.document).attr("src",'works.html#panel_'+(++nav_oldClick_index));
						$(location).attr('href','works.html#panel_'+(++nav_oldClick_index));
						$("header").find("li").removeClass("active");
						$($("header").find("li")[nav_oldClick_index+""]).addClass("active");
						addAnimateCss(".panel","slideInUp");
					}
					
				}
				//向上滚动
				else{
					if (nav_oldClick_index>0){
						// $(".self_info>iframe",window.parent.document).attr("src",'works.html#panel_'+(--nav_oldClick_index));
						$(location).attr('href','works.html#panel_'+(--nav_oldClick_index));
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
//作品介绍面板初始化
function panel_init() {
$(".panel-title").each(
		function (i) {
			$(this).find("a").attr({"href":Panel_list[i].works_addre,"title":Panel_list[i].works_name});
			$(this).find("a").text(Panel_list[i].works_name);
			$(this).find("span").text("#"+(i+1));
		}
	);
	
	$(".panel-body").each(
		function (i) {
			$(this).find("a").attr({"href":Panel_list[i].works_addre,"title":Panel_list[i].works_name});
			$(this).find("a>img").attr("src",Panel_list[i].works_img_addre);
			$(this).find(".introduce").text(Panel_list[i].works_introduction);
		}
	);
	
	$(".panel-footer").each(
		function (i) {
			$(this).find(".tech>small").text(Panel_list[i].works_tec);
		}
	)
	
	
	
	
}