//подотовка

const popupLinks=document.querySelectorAll('.popup__button'); //список элементов по нажатиб на которые открывается попап
const body=document.querySelector('body'); //телоо скролл которого надо залочить
const lockPadding=document.querySelectorAll('.lock-padding'); //элементы которые могут слететь

let unlock=true; //лок переменная

const timeout = 800; //таймаут лока

if (popupLinks.length>0){ //если открыашки для popupa существуют
	/*for(popupLink of popupLinks){*/
	for(let index = 0; index<popupLinks.length;index++){
		const popupLink = popupLinks[index];
		popupLink.addEventListener("click",function(event){ //прослушка клика на каждую открывашку
			const popupName = popupLink.getAttribute('href'); //имя popapа
			const currentPopup=document.getElementById(popupName); //выбранный popap
			popupOpen(currentPopup);
			event.preventDefault(); //отменяем базовое поведение(здеь модно и без этого)
		});
	}
}


const popupCloseIcons = document.querySelectorAll('.close-popup');//крестик
if(popupCloseIcons.length > 0){//если список крестиков не пустой
	for(popupCloseIcon of popupCloseIcons){
		popupCloseIcon.addEventListener('click',function(event){
			popupClose(popupCloseIcon.closest('.popup-wrapper'));//ищем ближащего предка попапа для крестика и закрываем попап
			event.preventDefault(); //отменяем базовое поведение(здеь модно и без этого)
		});
	}
}


//основа

function popupOpen(currentPopup){ //функция закрытия
	if(currentPopup && unlock){ //если выбран попап и переменная не лочит
		const popupActive=document.querySelector('.popup-wrapper.open'); //ищем открытый попап
		if(popupActive){
			popupClose(popupActive,false); //если есть открытый попап то его закрыть
		}else{
			bodyLock(); //если нет то локнуть тело
		};
		currentPopup.classList.add('open'); //к выбранному попапу добавляем открывающий клсс тем самым открываем ее
		currentPopup.addEventListener('click',function(event){ //вешаем на выбранный попап прослушку клика
			console.log(event.target);
			if(!event.target.closest('.popup__row')){  //если нажатие не по попапу то закрыть 
				popupClose(event.target.closest('.popup-wrapper')); //закрыть (через оболочку)
			}
		});
	}
}

function popupClose(popupActive,doUnlock=true){
	if(unlock){ //если нет блокировки т.е. попап уже закрылся открылся
		popupActive.classList.remove('open'); //забрать у попапа класс опен тем самым закрыв его
		if(doUnlock){
			bodyUnLock(); //отлочить тело если переданны параметр doUnlock не является false,т.е. если вызов попапа не из попапа
		}
	}
}


//вспомогательные функции bodyLock и bodyUnLock

function bodyLock(){
	const lockPaddingValue=window.innerWidth - document.querySelector('.wrapper').offsetWidth +'px'; //ширина скрола в пикселях
	if(lockPadding.length>0){//если есть элементы с особым позиционированием
		for(lockEl of lockPadding){//пробегаемся по элементам с особым позиционированием
		//lockEl.style.paddingRight=lockPaddingValue;//сдвигаем их на ширину скролла
		}
	}
	body.firstElementChild.style.paddingRight=lockPaddingValue;//сдвигаем меню на ширину скролла
	body.classList.add('lock');//добавляем класс лок,наше меню залочено(по классу лок скролл убирается)

	unlock=false;//через timeout наш лок снова true(а иначе баг со скролом)
	setTimeout(function(){
		unlock=true;
	},timeout);
}


function bodyUnLock(){
	setTimeout(function(){
		if(lockPadding.length>0){//если есть элементы с особым позиционированием
			for(lockEl of lockPadding){//пробегаемся по элементам с особым позиционированием
			lockEl.style.paddingRight='0px';//сбрасываем отступ элементов с особым позиционированием до исходного значения
			} 
		}
		body.firstElementChild.style.paddingRight='0px';//сбрасываем отступ меню до исходного значения
		body.classList.remove('lock');//убираем класс лок,наше меню отлочено(по классу лок скролл убирается)
	}, timeout); //таймаут чтобы попап не дергался

	unlock=false;
	setTimeout(function(){
		unlock=true;
	},timeout);
}

//закрытие по нажатию esc

document.addEventListener('keydown',function(event){
	if(event.which===27){
		const popupActive = document.querySelector('.popup-wrapper.open');
		popupClose(popupActive);
	}
});