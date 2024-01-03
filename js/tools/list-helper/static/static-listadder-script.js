import {ItemsData,ParamsStorage} from './ItemsData.js'

const lists = getAllElements('[fill-me]')
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


function getFillFragment(data,$template){
    const $templateClone = $template.cloneNode(true)
    const $fillFragment = fillFragment(data,$templateClone)
    return $fillFragment
}

function assembleObject(rowData,paramsStorage){
    const data = new ItemsData(...rowData.split(' ,'))
    if(data.hasOwnProperty('attributes')){
        data.attributes.newParamsList=paramsStorage.attributesParams.split(' ')
    }
    return data
}

function fillFragment(data,$template){
    const $templateFragment = getTemplateFragment($template);
    for (const key in data) {data.addElement($templateFragment,key)}
    return $templateFragment
}

function getTemplateFragment($template){
    const $templateContent = $template.content;
    $templateContent.removeChild($templateContent.firstElementChild.nextSibling)
    return $templateContent
}

function formatList($itemsList){
    $itemsList.append('\n')
    if($itemsList.tagName=='DIV'){
        removeGarbage($itemsList)
    }
}

function removeGarbage($itemsList){
    const garbageSelectors = ['template','data']
    garbageSelectors.forEach(selector=>{
        const garbageNode = getElement(selector,$itemsList)
        $itemsList.removeChild(garbageNode)
        $itemsList.removeChild($itemsList.firstChild)
    })
    $itemsList.removeChild($itemsList.firstChild)
    $itemsList.removeAttribute('fill-me')
}

/*

const lists = getAllElements('[fill-me]')
lists.forEach($list=>fillList($list))

function fillList($itemsList){
    const dataQuery = getDataQuery($itemsList)
    const $template = getElement('template',$itemsList)
    dataQuery.forEach((rowData)=>$itemsList.append(getFillFragment(rowData,$template)))
    formatList($itemsList)
}

function getDataQuery($itemsList){
    const dataString = getElement('[hidden]',$itemsList).innerText
    const dataQuery = dataString.replace(/\s+/g,' ')
    return dataQuery.split(';')
}

function getFillFragment(rowdata,$template){
    
    const data = new ItemsData(...rowdata.split(' ,'))
    //console.log(data.attributes)
    const $templateClone = $template.cloneNode(true)
    const $fillFragment = fillFragment(data,$templateClone)
    return $fillFragment
}

function fillFragment(data,$template){
    const $templateFragment = getTemplateFragment($template);
    for (const key in data) {data.addElement($templateFragment,key)}
    return $templateFragment
}

function getTemplateFragment($template){
    const $templateContent = $template.content;
    $templateContent.removeChild($templateContent.firstElementChild.nextSibling)
    return $templateContent
}

function formatList($itemsList){
    $itemsList.append('\n')
    if($itemsList.tagName=='DIV'){
        removeGarbage($itemsList)
    }
}

function removeGarbage($itemsList){
    const garbageSelectors = ['template','data']
    garbageSelectors.forEach(selector=>{
        const garbageNode = getElement(selector,$itemsList)
        $itemsList.removeChild(garbageNode)
        $itemsList.removeChild($itemsList.firstChild)
    })
    $itemsList.removeChild($itemsList.firstChild)
    $itemsList.removeAttribute('fill-me')
}
*/