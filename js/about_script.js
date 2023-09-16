//убрать меню
function clean(){
	let head = document.querySelector('header');
	let windowScrollTop = window.pageYOffset;
	let menu = document.querySelector('.header');
	if(windowScrollTop>head.offsetHeight && menu.style.position!='static'){
 		windowScrollTop = window.pageYOffset;
 		menu.style.position='static';}
 	else{
 		menu.style.position='sticky';
 	}
 };
//вешаем событие на всю секцию
let aboutSection=document.querySelector('.about');
aboutSection.addEventListener('click',clean);

//вешаем стили через атрибуты
let aboutArticle=document.querySelectorAll('.about__person');
for(key of aboutArticle){
	let mainSource=key.getAttribute('img_source');
	key.style.background=mainSource+'0 0/100% 100% no-repeat';
	let aboutContent=key.querySelector('.about__person-content');
	aboutContent.style.flexDirection=aboutContent.getAttribute('flex_direction');
	let aboutText=key.querySelector('.about__person-text');
	aboutText.style.top=aboutText.getAttribute('top');
	aboutText.style.left=aboutText.getAttribute('left');
	let aboutPhoto=key.querySelector('.about__person-photo');
	aboutPhoto.style.top=aboutPhoto.getAttribute('top');
	aboutPhoto.style.left=aboutPhoto.getAttribute('left');

}