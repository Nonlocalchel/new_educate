//импорт функций
import * as buttonFunks from './button_script.js'

//навешиваем события
function addListen(name,funcName,event='mousedown'){
    try {
        const list = document.querySelectorAll(name)
        list.forEach($elem=>$elem.addEventListener(event,funcName))
    } catch (error) {
        console.log(console.error)
    }
}


//Обьект хранящий данные для навешивания событий
const tasksObj = {
    buttonsTask : [
        ['[name="like"]',buttonFunks.toggleClass],
        ['[name="delete"]',buttonFunks.sendDeleteRequest],
        ['[name="simple"]',buttonFunks.alertMessage]
    ]
}

//Обходим обьект
for (const [key, values] of Object.entries(tasksObj)) {
    values.forEach(value=>addListen(...value))
}
