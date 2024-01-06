import {ItemsData} from './ItemsData.js'

const lists = getAllElements('[fill-me=static]')
lists.forEach($list=>fillList($list))

function fillList($itemsList){
    const rowDataQuery = getDataQuery($itemsList)
    const $template = getElement('template',$itemsList)
    const paramsStorage = new ParamsStorage($template)
    rowDataQuery.forEach((rowData)=>$itemsList.append(
        getFillFragment(
            assembleObject(rowData,paramsStorage),$template)))
    formatList($itemsList)
}

function getDataQuery($itemsList){
    const dataString = getElement('[hidden]',$itemsList).innerText
    const dataQuery = dataString.replace(/\s+/g,' ')
    return dataQuery.split(';')
}

function ParamsStorage($template){
    this.attributesParams = $template.getAttribute('attrSelectors')
    this.textsParams = $template.getAttribute('textNames')
    this.classesParams = $template.getAttribute('classes')
}

function getFillFragment(data,$template){
    const $templateClone = $template.cloneNode(true)
    const $fillFragment = fillFragment(data,$templateClone)
    return $fillFragment
}

function assembleObject(rowData,paramsStorage){
    const data = new ItemsData(...rowData.split('|'))
    for (const field in data) {
        const object = data[field]
        if(object.values && paramsStorage[`${field}Params`]){
            object.newParams=paramsStorage[`${field}Params`].split(' ')
        }
    }
    return data
}

function fillFragment(data,$template){
    const $templateFragment = getTemplateFragment($template);
    for (const key in data) {
        if(data[key].values)
            addElement($templateFragment,key,data)
    }
    return $templateFragment
}

function addElement($place,field,data){
    const paramsOfField = data[field]

        const params = paramsOfField.params
        for (const param of params){
            const selector = param.selector
            if(param.value){
                const fValue = param.value.trim()
                if(field=='attributes'){
                    const node = getElement(selector,$place)
                    let tagAttribute = selector.match(/\[(\w*)\W/)[1]
                    try {
                        node.setAttribute(tagAttribute,fValue)
                    } catch (error) {
                        console.log(`attribute ${tagAttribute} not found`)
                    }
                }else if(field=="texts"){
                    const nodeList = getAllElements(`[name=${selector}]`,$place)
                    nodeList.forEach(node=>{
                        node.removeAttribute('name')
                        node.innerText = fValue
                        })
                }else{
                    const nodeList = getAllElements('.'+selector,$place)
                    nodeList.forEach(node=>{node.classList.replace(selector,fValue)})
                }
            }
        }
  
}

function getTemplateFragment($template){
    const $templateContent = $template.content;
    $templateContent.removeChild($templateContent.firstElementChild.nextSibling)
    return $templateContent
}

function formatList($itemsList){
    $itemsList.append('\n')
    if($itemsList.tagName=='DIV'){
        let i=5;
        while(i!=0){
            $itemsList.removeChild($itemsList.firstChild)
            i -= 1
        }
    }
    $itemsList.removeAttribute('fill-me')
}