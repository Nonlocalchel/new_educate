//скролл до конца страницы по двойному клику мыши
document.addEventListener('dblclick',(e)=>{
    const scrollHeight = computedHeight()
    window.scrollBy(0,scrollHeight)
    e.preventDefault()
})

function computedHeight(){
    return Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight
  );
}


