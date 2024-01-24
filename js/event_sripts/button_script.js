export function sendDeleteRequest(){
    fetch('https://jsonplaceholder.typicode.com/posts/1',{method:'DELETE'})
      .then(response => response.json())
      .then(json => console.log(json))
}

export function toggleClass(){
    this.classList.toggle('fill-heart')
}

export function alertMessage(){
    setTimeout(() => alert('Это же просто пример'), 100);
}

