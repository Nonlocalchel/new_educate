//импорт функций
import * as exampleFunks from './packExampleEvents/packExampleEvents_mainScript.js'

//навешиваем события
function addListen(name,funcName,event='mousedown'){
    try {
        const list = document.querySelectorAll(name)
        list.forEach($elem=>{
            $elem.addEventListener(event,funcName)
        })
    } catch (error) {
        console.log(console.error)
    }
}

//Обьект хранящий данные для навешивания событий
const tasksObj = {
    buttonsExampleTask : [
        ['[name="buttons"] [name="like"]',exampleFunks.buttonFunks.toggleClass],
        ['[name="buttons"] [name="delete"]',exampleFunks.buttonFunks.sendDeleteRequest],
        ['[name="buttons"] [name="simple"]',exampleFunks.buttonFunks.alertMessage],
        ['[name="buttons"] [name="play"]',exampleFunks.buttonFunks.pauseOrPlay],
    ],
    musicExampleTask : [
        ['section[name=media] input[type="range"]', exampleFunks.playerFunks.changeProgress,'input'],
    ]
    
}

//Достаем имя документа
const docName=document.location.href.match(/\/?(\w*\.html)/)[1]

//Обьект хранящий данные доступа к событиям в документе
const docTasksObj = {
    'test.html':['buttonsExampleTask','musicExampleTask'],
    'pack_comElems.html':['buttonsExampleTask'],
    'defaultTasks':Object.keys(tasksObj)
}

//если в странице в списке прсваиваем перемнной нужные параметры,если нет-пресваиваем параметры по умолчанию(все)
const tasks = docTasksObj.hasOwnProperty(docName)?docTasksObj[docName]:docTasksObj.defaultTasks

//Обходим массив
for (const iterator of tasks) {
    let taskIterator = tasksObj[iterator]
    taskIterator.forEach(task=>addListen(...task))
}
