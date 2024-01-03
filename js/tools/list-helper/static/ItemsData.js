export class ItemsData{
    constructor(title,description,selector,attributes){
        this.selector = new InsertObject(selector,'.selector')
        this.title = new InsertObject(title.trim(),`[name="title"]`)
        this.description = new InsertObject(description,'[name="description"]')
        if(attributes){
            this.attributes = new ParamsList(attributes)
        }
    }
    addElement($place,field){
        const mode = this[field]
        if(mode instanceof ParamsList){
            let params = mode.paramsList
            console.log(params)
            for (const param of params) {
                let selector = param.selector
                let nodeList = getAllElements(selector,$place)
                if(!!nodeList.length){
                    nodeList.forEach(node=>{
                        let tagAttribute = selector.match(/\[(\w*)\W/)[1]
                        node.setAttribute(tagAttribute,param.value)
                    })
                }
            }
        }
        if(mode){
            const nodeList = getAllElements(mode.selector,$place)//attributes уже выадает
            nodeList.forEach($item=>{
                if(field=='selector'){
                    $item.setAttribute( 'class', mode.value)
                }else if(field=='attributes'){
                    //console.log(2)
                }else{
                    $item.textContent += mode.value
                }
            })
        }   
    }
}

function InsertObject(value,selector){
    this.value = value
    this.selector = selector
}

class ParamsList {
    constructor(values) {
        this.valuesList = values.slice(1, -1).split(',')
        this.paramsList

    }
    set newParamsList(selectorsList){
        return this.paramsList = selectorsList.map(
            (selector,selectorIndex) => new InsertObject(this.valuesList[selectorIndex],selector)
        )
    }
}

export function ParamsStorage($template){
    this.attributesParams = $template.getAttribute('data-attrSelectors') //getAttribute-через статический метод
    this.textParams = $template.getAttribute('data-textSelectors') //надо будет через foreach добавлять name
}