//обьект с функцими 
let functionDict={
	'card__frontside-button':choiseOpacity,
	'card__backside-svg card__backside-svg--top card__backside-svg--zoom':zoomCard,
	'card__backside-svg card__backside-svg--down card__backside-svg--music':hideMusic,
	'card__backside-arrow':choiseOpacity,
	'main-button card__backside-button-back':choiseOpacity,
	'card__backside-title':hidePicture,
};

//делегирование и прослушка секций
try{
	let sections=document.querySelectorAll('.result-cards');
	for(section of sections){
		setColor();
		section.addEventListener('click',function(event){
			let targetForMouse=event.target;//обьект на котроый кликнули
			let card=targetForMouse.closest('.card');//родитель обьекта на котроый кликнули(card)
			if(card){
				let targetForMouseClass=event.target.getAttribute('class');//class того,на что кликнули дебаг-log:console.log('дед найден');
				try{
					//если натыкаемся на path самой svg всплытие не срабатывает поэтому костыль
					targetForMouseClass=='st0' ? targetForMouseClass=event.target.parentElement.getAttribute('class'):"1";//чепез classList
					functionDict[targetForMouseClass](card);
					return 0;
				}catch(err){
					console.log('функция не найдена') //функция не найдена в словаре 
				}
			}else{
				console.log('дед не найден');//клик не по карточке
			};
		});		
	}
}catch(err){
	console.log('секции не найдены')//нет секций на странице
};

/*zoom приближает карточку по клику на увеличительное стекло*/
function zoomCard(card){
	streamlineCard(card);
	let zoomButton = card.querySelector('.card__backside-svg--zoom');
	let minus = zoomButton.children[1];
	if(card.style.scale=="1.4"){
		card.style.scale="1";
		minus.style.opacity=1;
	}else{
		card.style.scale="1.4";
		minus.style.opacity=0;
	}
}
/*zoom*/

/*hide music прячет музыку при клике на соответствующую иконку*/
function hideMusic(card){
	let audioPlayer = card.querySelector('.card__backside-audio');
	let backText = card.querySelector('.card__backside-text-row');
	let wrapperka= card.querySelector('.card__backside-wrap');
	if(audioPlayer.style.height!='0px'){
		audioPlayer.style.height='0px';
		backText.style.paddingBottom="0px";
		wrapperka.style.borderRadius="0";
		card.style.setProperty('--scroll-margin','0px');
	}else{
		audioPlayer.style.height='30px';
		backText.style.paddingBottom="30px";
		wrapperka.style.borderRadius="0px 0px 0px 10px";
		card.style.setProperty('--scroll-margin','0px 21px');
	}
	
	
}	
/*hide music*/

//поправить(тернарнк)
/*set img устанавливает картинку и помогает hidePicture ее убрать*/
function setImg(card){
	let backHead=card.querySelector('.card__backside-head');
	let photo=card.getAttribute('source');
	backHead.style.background=(backHead.style.background==photo)?'transparent':photo;
}
	
/*set img*/

//поправить
/*hide pucture прячет картинку*/
function hidePicture(card){
	let backHead=card.querySelector('.card__backside-head');
	let backTopFunction=card.querySelector('.card__backside-funcs');
	let glass=card.querySelector('.card__backside-glass');
	let backText = card.querySelector('.card__backside-text-row');
	let backWall = card.querySelector('.card__backside-wall');
	if(glass.style.opacity!="0"){
		glass.style.opacity="0";
		glass.style.height="0";
		backTopFunction.style.opacity = "0";
		backHead.style.height="30px";
		backTopFunction.style.position="absolute";
		backTopFunction.style.zIndex = "-50000";
		backWall.style.paddingTop="5px";
		backText.style.maxHeight = '200px';
		setImg(card);
	}else{
		glass.style.opacity="0.3";
		backTopFunction.style.position="static";
		backTopFunction.style.zIndex = "1";
		backTopFunction.style.opacity = "1";
		backHead.style.height="136px";
		glass.style.height="136px";
		setImg(card);
		backText.style.maxHeight = '100px';
		backWall.style.paddingTop="8px";
	}
}
/*hide pucture*/


function choiseOpacity(card){ 		/*show other side by choose opacity*/
	unZoomCard(card);
	let back=card.querySelector('.card__backside');
	let front=card.querySelector('.card__frontside');
	let styles = window.getComputedStyle(back);
	let transition = getTransition(back);
	if(front.style.opacity=="1" || isEmpty(front.style.opacity)){
		front.style.opacity="0";
		setTimeout(()=>back.style.opacity="1",transition);
		setTimeout(()=>front.style.display="none",transition);
		setTimeout(()=>back.style.display="flex",transition-400);
	}else{
		back.style.opacity="0";
		setTimeout(()=>front.style.opacity="1",transition);
		setTimeout(()=>back.style.display="none",transition);
		setTimeout(()=>front.style.display="flex",transition-400);
	}
}

function getTransition(element){ 	/*return transition time*/
	let styles = window.getComputedStyle(element);
	return 400+styles.transition.slice(4,7)*1000;
}

function isEmpty(str) { /*check state of card of choosies */ 
  return str.trim() == '';
}

function streamlineCard(card){ /*unZoom other zoomed cards */
	let parent=card.parentNode;
	let sectionParent=parent.parentNode;
	let childrenCollection=sectionParent.children;
	for (key of sectionParent.querySelectorAll('.card')){
		if(key.style.scale=="1.4" && key!=card){
			unZoomCard(key);
			break;
		};
		//console.log(key);
	};
}

function unZoomCard(card){ /*Zoom other zoomed cards */
	card.style.scale="1";
	let zoomButton = card.querySelector('.card__backside-svg--zoom');
	let minus = zoomButton.children[1];
	minus.style.opacity=1;
}

//поправить
 //передает color указанный в .results__card
function setColor(){
	let cardsNode=document.querySelectorAll('.card');
	for(key of cardsNode){
		if (key.getAttribute('class')=='card'){		//прослушка наведения мыши на карточку
			setImg(key);
			//достаем цвет
			let color=key.getAttribute('color').slice(0,-6);
			//тень
			key.style.setProperty('--shadow-color1',`${color}, 0.20)`);
			key.style.setProperty('--shadow-color2',`${color}, 0.80)`);
			//передняя часть
			let resultHat=key.querySelector('.card__frontside-head');
			resultHat.style.background=`linear-gradient(${color}, 1.0), ${color}, 0.40))`;
			let button=key.querySelector('.card__frontside-button');
			button.style.background=`linear-gradient(${color}, 1.0), ${color}, 0.60))`;
			//задняя часть
			key.style.setProperty('--card-color',`${color}, 1.0)`);
		};
	};
};


