import {ItemsData} from './ItemsData.js'

const lists = document.querySelectorAll('[fill-me=static]')
lists.forEach($list=>fillList($list))

function fillList($itemsList){
    const rowDataQuery = getDataQuery($itemsList)
    const $template = $itemsList.querySelector('template')
    const templateParams = $template.dataset
    rowDataQuery.forEach((rowData)=>$itemsList.append(
        getFillFragment(
            assembleObject(rowData,templateParams),$template)
        ))
    formatList($itemsList,$template)
}

function getDataQuery($itemsList){
    const dataString = $itemsList.querySelector('data[hidden]').innerText
    const dataQuery = dataString.replace(/\s+/g,' ')
    return dataQuery.split(';')
}

function getFillFragment(data,$template){
    const $templateClone = $template.cloneNode(true)
    const $fillFragment = fillFragment(data,$templateClone)
    return $fillFragment
}

function assembleObject(rowData,templateParams){
    const data = new ItemsData(templateParams,...rowData.split('|'))
    return data
}

function fillFragment(data,$template){
    const $templateFragment = getTemplateFragment($template);
    for (const key in data) {
        if(!!data[key]){
            addElementsToFragment($templateFragment,key,data)
        }
    }
    return $templateFragment
}

function getTemplateFragment($template){
    const $templateContent = $template.content;
    $templateContent.removeChild($templateContent.firstElementChild.nextSibling)
    return $templateContent
}

function addElementsToFragment($place,field,data){
    const paramsOfField = data.getParams(field)
    for (const paramIndex in paramsOfField) {
        const paramName = paramsOfField[paramIndex]
        try {
            //const value = data[field][paramIndex]?data[field][paramIndex].trim():null
            const nodeList = $place.querySelectorAll(getSelector(field,paramName))
            nodeList.forEach(node=>
                data[`add${capFirstLetter(field)}`](node,paramName,paramIndex)//
            )
        } catch (error) {
            console.log(error)
        }

    }
}

function capFirstLetter(word){
    return word.charAt(0).toUpperCase()+ word.slice(1)
}

function getSelector(field,varName){
    const selectors ={
        classes: `.${varName}`,
        texts: `[${varName}]`,
        attributes : varName
    }
    return selectors[field]
}

function formatList($itemsList,$template){
    $itemsList.append('\n')
    const $start = $template.previousSibling
        let i=4;
        while(i!=0){
            $itemsList.removeChild($start.nextSibling)
            i -= 1
        }
    $itemsList.removeChild($start)
    $itemsList.removeAttribute('fill-me')
}
