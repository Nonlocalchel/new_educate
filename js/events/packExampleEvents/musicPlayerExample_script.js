export function changeProgress(){
    const value = this.value
    const maxValue = this.max
    const progress = (value/maxValue)*100+'%'
    this.style.setProperty('--progress-line',progress)
}


