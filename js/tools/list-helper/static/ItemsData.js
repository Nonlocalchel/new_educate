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
        return values!=undefined?values.split(' ,'):null
    }
    getParams(paramsType){
        return this.#params[paramsType].split(' ')
    }
    addTexts($place,paramName,value,paramIndex){
        $place.removeAttribute(paramName)
        if(!value){
            return
        }
        $place.innerText = value
    }
    addAttributes($place,paramName,value){
        const tagAttribute = paramName.match(/\[(\w*)\W/)[1]
        $place.setAttribute(tagAttribute, value)
    }
    addClasses($place,paramName,value){
        const listOfClasses = $place.classList
        listOfClasses.remove(paramName)
        if(!value){
            $place.removeAttribute('class')
            return
        }
        const classes = value.split(' ')
        classes.forEach(className=>listOfClasses.add(className))

    }
}