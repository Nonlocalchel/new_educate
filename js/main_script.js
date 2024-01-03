


//прослушка нажатия перехода на гостевую страницу
document.addEventListener('keydown', function(event) {
 	if (event.code == 'KeyQ' && (event.ctrlKey || event.metaKey)) {
    	document.location="guests_shell.html"
  	}
});

/*обработка нажатия на регистраия вход*/
try{
	let buttonLogin=document.querySelector('.login-link');
	let buttonLoginRes=document.querySelector('.btn_enter');
	buttonLoginRes.onclick=buttonLogin.onclick=()=>{
	if(!(window.location.href.slice(22,) =="login.html" || window.location.href.slice(22,)=="register.html")){
		let answer=confirm("Нужно ли зарегистрироваться?");
		window.location.href=(answer?"register.html":"login.html");
		};
	};
}catch(err){
	console.log('кнопка вход не найдена');
};

//поправить
//странце-определитель и менятель
try{
	let navigationMenu=document.querySelector('nav');
	let linkList=navigationMenu.querySelectorAll('a');
	for(key of linkList){
		let location=window.location.href;
		let children=key.children;
		if(location==key.href && key.getAttribute('class')!="logo__image-img"){ //тут красим основную навигацию
			if(key.href.slice(22,)!="index.html" && key.href.slice(22,)!="profile.html"){
				key.style.setProperty('--el-opacity','1');//прозрачность псевдоэлементов
				key.style.setProperty('--transition-time','0s');//время перехода псевдоэлементов
				let svg=children[0];//nav__list__el__svg
				let span=children[1];//nav__list__el__span
				svg.style.fill=span.style.color=userColor;
				svg.style.transition=span.style.transition='0s';
			}
		}else if(location.slice(22,) =="login.html" || location.slice(22,)=="register.html"){ //тут красим login и register
			if(key.getAttribute('class')=="login__link"){
				//console.log(location.slice(22,));
				key.style.cssText=`
				border: 1px solid var(--main-color);
  				color:var(--main-color);
  				outline-color: rgba(255, 185, 14, 0);
  				outline-offset: 15px;
				`
			}
		};
	};
}catch(err){
	console.log('навигаицонное меню не найдено(или возникла ошибка в процесе определения страницы)');
};

//поправить(тернарник) и класс повесить
//меню при прокрутке
try{
	let menuNav=document.querySelector('.header__row');
	let navHeight=menuNav.offsetHeight;
	window.addEventListener('scroll',function(event){
		if(scrollY>=50){
			menuNav.classList.add("header__row--short");
		}else{
			menuNav.classList.remove("header__row--short");
		}
	})
}catch(error){
	console.log('навигационное меню не найдено')
}
