
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