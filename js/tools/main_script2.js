//обработка клика на кнопки
function addlisten(name,funcName){
    try {
        const list = document.getElementsByName(name)
        list.forEach($elem=>$elem.addEventListener('mousedown',funcName))
    } catch (error) {
        console.log(console.error())
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
    alert('Это же просто пример')
}

const taskArray = [
    ['like',toggleClass],
    ['delete',sendDeleteRequest],
    ['simple',alertMessage]
]

taskArray.forEach((param)=>{addlisten(...param)})
