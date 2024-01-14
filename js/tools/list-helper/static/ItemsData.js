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
    addTexts($place,paramName,valueIndex){
        let value=this.texts[valueIndex]
        $place.removeAttribute(paramName)
        if(!value){
            return
        }else{
            $place.innerText = value.trim()
        }
    }
    addAttributes($place,paramName,valueIndex){
        let value=this.attributes[valueIndex]
        const tagAttribute = paramName.match(/\[(\w*)\W/)[1]
        if(!value){
            $place.removeAttribute(tagAttribute)
            return
        }else{
            $place.setAttribute(tagAttribute, value.trim())
        }
    }
    addClasses($place,paramName,valueIndex){
        let value=this.classes[valueIndex]
        const listOfClasses = $place.classList
        listOfClasses.remove(paramName)
        if(!value){
            $place.removeAttribute('class')
            return
        }else{
            const classes = value.trim().split(' ')
            classes.forEach(className=>listOfClasses.add(className))
        }
    }
}
