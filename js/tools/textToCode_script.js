//кнопка скопировать 
function copyText(event) {
  var copyText = event.target.nextElementSibling.firstElementChild.innerText;
  navigator.clipboard.writeText(copyText)
  .then(() => {
    alert('Успешно скопировано!');
  })
  .catch(err => {
    console.log('Something went wrong', err);
  });
}

//преобразовать разметку в текст
const $containerCode=`
  <div class="pack-section__code">
    <h3 class="pack-section__subtitle">Код:</h3>
    <div class="pack-section__html color_back">
      <p>Html</p>
    </div>
    <p class="copy" onclick="copyText(event)">Копировать</p>
    <div class="pack-section__code-text" data-simplebar>
      <div class="simple-container">
        <p class="code-here" id="myInput"></p>
      </div>
    </div>
  </div>`

const packContainers = getAllElements('[show-code]')
packContainers.forEach(pasteCodeToContainer)


function pasteCodeToContainer($packContainer){
  $packContainer.insertAdjacentHTML('beforeend',$containerCode)
  const code = getCodeList($packContainer)
  let $placeForCode = getElement('.code-here',$packContainer)
  pasteText(code,$placeForCode)
}

function getCodeList($packContainer){
  let codeList = getAllElements('[to-text]',$packContainer)
  codeList.forEach((element)=>element.removeAttribute('to-text'))
  return codeList
}

function pasteText(list,place){
  if(list.length>0){
    list.forEach($elem=>place.insertAdjacentHTML('beforeend',toText($elem)))
  }else{
    place.innerText='<nothing>\nTry add attribute "to-text" from your elements,which have to get there'
  }
  
}

function toText($elem){
  let text = new XMLSerializer().serializeToString($elem)+'\n'
  let fText = format(text)
  let coloredText = colorText(fText)
  return coloredText
}

function colorText(text){//распознает элементы разметки
  let result = ""
  let boofer = ''
  let mode = 'empty'
  for (const textSymbol of text) {
    if(textSymbol=='<' && mode=='empty'){
      mode='tag'
      result+=boofer
      boofer=""
    }else if(mode=="comment" || textSymbol=='!'){
      if(textSymbol=='>' && boofer.slice(-3,-1)==' -'){//+комментарий
        mode='empty'
        //result = result.slice(0, -1);если будет ошибка или то еще можно <> прибавлять раньше а тут удалять символ
        result+= `<span class='color-comment'><span><</span>${boofer}></span>`
        boofer=''
      }else{
        mode="comment"
        boofer+=textSymbol
      }
    }else if(textSymbol=='>' && mode=="tag"){
      if(boofer!=''){//+закрывающий тэг
        let tag = boofer.match(/\/(.*)/)[1]
        result+=`<<span>/<span class="color-tag">${tag}</span>></span>`
      }else{//+закрывающий >
        mode='empty'
        result+='>'
        boofer = ''
      }
    }else if(textSymbol==' ' && mode=='tag'){//+открывающий тэг
      let tag = boofer?boofer.match(/[\w]\w*/)[0]:''
      result +=tag?`<<span class="color-tag">${tag}</span>`+" ":" "
      mode='attribute'
      boofer=''
    }else if(mode=="attribute" && textSymbol=='='){//+attribute
      mode="tag"
      result += `<span class='color-attr'>${boofer}</span>=`
      boofer =""
    }else if(textSymbol=="\""){
      if(mode=="tag"){//+attributeValue
        mode="attributeValue"
      }else if(mode=="attributeValue"){
        result = boofer?result:result.slice(0, -1);//удаление последнего символа из строки
        result+=`<span class="color-attrValue">${boofer?'"'+boofer+'"':''}</span>`
        mode="tag"
      }
      boofer=""
    }else if(textSymbol=='\t' || textSymbol=='\n'){//табуляция и новая строка
      result+=textSymbol
      boofer=''
    }else{//прибавляем textSymboll(итератор)
      boofer+=textSymbol
    }
  }
  return result
}

function format(text){
  let distance = getDistance(text)
  let ftext = text.replaceAll(' xmlns="http://www.w3.org/1999/xhtml"','')
  ftext =distance? ftext.replaceAll(`${distance}`,'<'):ftext
  return ftext
}

function getDistance(text){
  let bufer = ''
  let save = false
  for (const iterator of text.slice(1,)) {
    bufer = save?bufer+iterator:bufer
    if(iterator=='>'){
      save = true
      continue
    }else if(iterator=='<'){
      const result=bufer[0]=='\n'?bufer.slice(2,):''
      return result
    }
  }
}