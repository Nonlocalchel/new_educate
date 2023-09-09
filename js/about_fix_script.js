//скрипт-костыль,т.к. стили загружаються значительно быстрее чем скрипт за счет картинок
let navSpisok=document.querySelectorAll('.nav__list__el__link ');
let aboutCostil=navSpisok[1].children;
let spanCostil=aboutCostil[0];
let svgCostil=aboutCostil[1];
navSpisok[1].style.setProperty('--transition-time','0s');
svgCostil.style.transition=spanCostil.style.transition='0s';