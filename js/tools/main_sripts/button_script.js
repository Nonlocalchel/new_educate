//обработка клика на кнопки
function addListen(name,funcName,event='mousedown'){
    try {
        const list = document.getElementsByName(name)
        list.forEach($elem=>$elem.addEventListener(event,funcName))
    } catch (error) {
        console.log(console.error)
    }
}

function sendDeleteRequest(){
    fetch('https://jsonplaceholder.typicode.com/posts/1',{method:'DELETE'})
      .then(response => response.json())
      .then(json => console.log(json))
}

function toggleClass(){
    this.classList.toggle('fill-heart')
}

function alertMessage(){
    setTimeout(() => alert('Это же просто пример'), 100);
}

const taskArray = [
    ['like',toggleClass,],
    ['delete',sendDeleteRequest],
    ['simple',alertMessage]
]

taskArray.forEach((param)=>{addListen(...param)})

