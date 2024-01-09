export class ItemsData{
    constructor(params,...collect){
        this.paramsNames=Object.keys(params)
        this.texts = new ParamsData(collect[this.getParam('texts')])
        this.classes = new ParamsData(collect[this.getParam('classes')])
        this.attributes = new ParamsData(collect[this.getParam('attributes')])   
    }
    getParam(findingEllement){
        let result =this.paramsNames.indexOf(findingEllement.toLowerCase())
        return result!=-1?result:undefined
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
