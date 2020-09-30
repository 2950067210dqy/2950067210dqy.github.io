
//创建添加动画函数
const addAnimateCss=(element,animate,animate_preStr="animate__")=>new Promise(((resolve, reject) => {
	const animateName=`${animate_preStr}${animate}`;
	let node;
	node=$(element);
	node.addClass(`${animate_preStr}animated ${animateName}`);
	//当动画结束时，调用此函数
	function handleAnimationEnd() {
		node.removeClass(`${animate_preStr}animated ${animateName}`);
		resolve(element+"动画结束了");
	}
	
	//添加动画结束监听
	node.one("animationend",handleAnimationEnd);
}));

//nav导航栏所有文字
//创建一个导航栏元素模拟类
let NUMBER=0
let Nav={
	createNew:function (hero_title,hero_p,hero_b,hero_b2,hero_b2_addre,flag=NUMBER++) {
		let nav={
			//改变导航栏文字
			changeWords:function () {
				$('.hero-title').text(this.hero_title);
				$('.hero-p').text(this.hero_p);
 	            $('.hero-b').text(this.hero_b);
 	            $('.hero-b2').text(this.hero_b2);
			},
			//改变导航栏链接地址
			changeAddre:function (addre="logo.html") {
				$('.hero-b').attr("href",addre);
				$('.hero-b2').attr("href",this.hero_b2_addre);
			},
			//改变导航栏li标签的背景颜色
			changeNavBg:function (doc,background_color="background-color:#444") {
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
			//改变背景颜色
			changeBg:function(){
				let str="url('img/bg"+this.flag+".jpg')";
				$('.hero').css("background-image",str);
				// $('body').css("background-image",str);
			},
			changeStyle:function (doc,header_id,li_width=0,li_height=0,) {
				this.changeWords();
				this.changeAddre();
				this.changeNavBg(doc);
				this.changeBg();
				if(header_id=="header_horizontal"){
					this.changeTL();
					addAnimateCss(".rightline","slideInLeft");
					addAnimateCss('.hero',"slideInRight");
					addAnimateCss('.hero-content',"slideInRight");
				}else{
					this.changeRL();
					addAnimateCss(".rightline","slideInDown");
					addAnimateCss('.hero',"slideInDown");
					addAnimateCss('.hero-content',"slideInDown");
				}
				
				
			}
		};
		nav.flag=flag;
		nav.hero_title=hero_title;
		nav.hero_p=hero_p;
		nav.hero_b=hero_b;
		nav.hero_b2=hero_b2;
		nav.hero_b2_addre=hero_b2_addre;
		return nav;
	}

};
//导航栏元素
let nav_text_list=[
	Nav.createNew("我叫邓亲优","是一个平凡而又普通的人"," 查看更多","  登录","logo.html"),
	Nav.createNew("虽不新奇,却广泛","我的作品虽不新奇，但不妨来看看哦！","  查看更多","  登录","hobby.html"),
	Nav.createNew("豫章-南昌","豫章故郡，洪都新府,星分翼轸.地接衡庐。","  查看更多","  登录","hometown.html"),
	Nav.createNew("九江学院（JJU）","坐落于庐山之麓、鄱阳湖之畔","  查看更多","  登录","school.html"),
	Nav.createNew("想对我说什么","留言框，联系方式等","  查看更多","  登录","about.html"),
	Nav.createNew(" "," ","  注册","  登录","regist.html"),
];




// console.log(nav_text_list);



$(document).ready(
	()=>new Promise((resolve, reject) => {
		removeStartAnimation(resolve);
	}).then(value=>{
		nav_hover();
		nav_location();
		nav_position();
		changeBgBySelf();
		nav_click();
		console.log(value);
	})
);


//用户点击导航栏时
function nav_click() {
	$("nav>ul>li").each(function (i) {
		if(i>0&&i<$("nav>ul>li").length-1){
			$(this).find("a").removeAttr("href");
			$(this).on("click",e=>{
				$(".hero").css({"width":"50%"});
				$("body").css({"background-image":"none","background-color":"whitesmoke"})
				$("#nav_menu").css({"right":"none","left":"1%"});
				$(".hero-content").css({"display":"none"});
				$("header").css({"left":"34%"});
				$("#nav_position_button").css({"display":"none"});
				$(".self_info").css({"display":"block"});
				addAnimateCss("header","slideInLeft");
				addAnimateCss("#nav_menu","slideInRight");
				addAnimateCss(".hero","slideInRight")
			});
		}else{
			$(this).on("click",e=>{
				$(".hero").css({"width":"100%"});
				$("body").css({"background-image":"url('../img/index_body.jpg')"})
				$("#nav_menu").css({"left":"none","right":"1%"});
				$(".hero-content").css({"display":"block"});
				$("#nav_position_button").css({"display":"block"});
				$(".self_info").css({"display":"none"});
			});
		}
		
	});
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

//实现导航栏hover效果
function nav_hover(header_id) {
	$("nav>ul:first>li").each(function(i){
		$(this).on("mouseover",()=>{
			nav_text_list[i].changeStyle(this,$("header").attr("id"));
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
			if(random==1){
				addAnimateCss("header","shakeX");
				random=0;
			}else{
				addAnimateCss("header","shakeY");
				random=1;
			}
			
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