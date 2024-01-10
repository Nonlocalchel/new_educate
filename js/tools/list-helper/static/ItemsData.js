export class ItemsData{
    #params
    #values
    constructor(params,...values){
        this.#params=params
        this.#values=values
        this.texts = this.getParam('texts')
        this.classes = this.getParam('classes')
        this.attributes = this.getParam('attributes')
    }
    getParam(findingEllement){
        const paramsKeys = Object.keys(this.#params)
        const result = paramsKeys.indexOf(findingEllement.toLowerCase())
        const values = this.#values[result]
        return values!=undefined?values.split(' ,'):false
    }
    getParams(paramsType){
        return this.#params[paramsType].split(' ')
    }
    addTexts($place,paramName,value){
        $place.removeAttribute(paramName)
        $place.innerText = value
    }
    addAttributes($place,paramName,value){
        const tagAttribute = paramName.match(/\[(\w*)\W/)[1]
        $place.setAttribute(tagAttribute, value)
    }
    addClasses($place,paramName,value){
        const classes = value.split(' ')
        const listOfClasses = $place.classList
        classes.forEach(className=>listOfClasses.add(className))
        listOfClasses.remove(paramName)
    }
}