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
		"本页面讲的是我的学校,\n本次展示的学校为大学，其他层次学校不予展示",
		" ",
		"works_img/school_0.jpg"),
	Panel.createNew("https://www.jju.edu.cn/",
		"江西省九江市九江学院",
		"九江学院是经国家教育部批准设立的国有公办全日制本科普通高等院校，办学历史可上溯至1901年美国基督教卫理公会创办的但福德医院护士学校，现办学体制为“省市共建、以市为主”。",
		"二本/专科",
		"img/bg3.jpg"),

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