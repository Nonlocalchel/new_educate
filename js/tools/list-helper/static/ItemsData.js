export class ItemsData{
    constructor(text,classes,attributes){
        this.texts = new ParamsData(text)
        this.classes = new ParamsData(classes)
        this.attributes = new ParamsData(attributes)   
    }
}

class ParamsData{
    constructor(values) {
        this.values = values!=undefined?values.slice(1).split(' ,'):false
        this.params
    }
    set newParams(selectors){
        return this.params = selectors.map(
            (selector,selectorIndex) => {return {
                    value : this.values[selectorIndex],
                    selector : selector
            }}
        )
    }
}
