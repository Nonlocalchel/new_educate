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

//Достаем имя документа
const docName=document.location.href.match(/\/?(\w*\.html)/)[1]

//Обьект хранящий данные доступв=а к событиям в документе
const docTasksObj = {
    'test.html':['buttonsTask'],
    'pack_comElems.html':['buttonsTask'],
    'defaultTasks':Object.keys(tasksObj)
}

//если в странице в списке прсваиваем перемнной нужные параметры,если нет-пресваиваем параметры по умолчанию(все)
const tasks = docTasksObj.hasOwnProperty(docName)?docTasksObj[docName]:docTasksObj.defaultTasks

//Обходим массив
for (const iterator of tasks) {
    let taskIterator = tasksObj[iterator]
    taskIterator.forEach(task=>addListen(...task))
}
