//изменение цветовой схемы
let $themeSVG = document.querySelector('.color-theme')

let localDataTheme = localStorage.getItem('theme')

setTheme(localDataTheme)

if($themeSVG){
    $themeSVG.addEventListener('click',event=>{
        event.preventDefault();
        toggleTheme();
    })
}

function toggleTheme(){
    if(localStorage.getItem('theme')!='light'){
        setTheme('light')
    }else{
        setTheme('dark')
    }
}

function setTheme(theme){
    document.querySelector('body').classList=`${theme}-theme`
    $themeSVG?setSVG(theme):5
    localStorage.setItem('theme',theme)
}

function setSVG(theme){
    let $themeSVGName=theme=='dark'?'moon':'sun'
    let $useThemeSVG=$themeSVG.firstElementChild
    $useThemeSVG.setAttribute('xlink:href',`/svg/theme/${$themeSVGName}.svg#${$themeSVGName}`)
}

//изменение цветовой схемы
/*
let userColor=setUserColors(getPropertyValue('--user-color'))//основной цвет,пользовательский 

function getAllColors(varName){
    return getPropertyValue(varName)
}

function setUserColors(color){
    setPropertyValue('--user-color',null);//УСТАНАВЛИВАЕМ основной цвет,пользовательский 
	let aboutBack=`${color.slice(0,-5)} 0.70)`;
    setPropertyValue('--about-back',aboutBack); //градиент основного цвета 
    let shadow=`${color.slice(0,-5)} 0.4)`
    let focusShadow=`-2px 3px 10px 0px ${shadow}`;
    setPropertyValue('--focus-shadow',focusShadow); //цвет теней при наведении
    let popupShadow=`0px 6px 20px 0px ${shadow}`;
    setPropertyValue('--popup-shadow',popupShadow); //тень модалного окна
    let mainColorGradient=`${shadow}`;
    setPropertyValue('--main-color-gradient',mainColorGradient);
    return color
}

function setPropertyValue(property,value,elemSelector='body'){
    let $elemName = getElement(elemSelector)
    let elemstyles = $elemName.style;
    elemstyles.setProperty(property,value); 
    return 
}

function getPropertyValue(property,elemSelector='body'){
	let $elemName = document.querySelector(elemSelector)
	return window.getComputedStyle($elemName).getPropertyValue(property)
}

function getElement(elemSelector,$place=document){
    return $place.querySelector(elemSelector)
}

function getAllElements(elemSelector,$place=document){
    //console.log($place.querySelectorAll(elemSelector),elemSelector)
    return $place.querySelectorAll(elemSelector)
}

*/