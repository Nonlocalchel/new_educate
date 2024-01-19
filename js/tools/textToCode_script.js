//кнопка скопировать 
function copyText(event) {
  var copyText = event.target.nextElementSibling.firstElementChild.innerText;
  navigator.clipboard.writeText(copyText.slice(0,-1))
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
    <button class="simple-btn btn-large copy" onclick="copyText(event)">Копировать</button>
    <div class="pack-section__code-text" data-simplebar>
      <div class="simple-container">
        <p class="code-here" id="myInput"></p>
      </div>
    </div>
  </div>`

const packContainers = document.querySelectorAll('[show-code]')
packContainers.forEach(pasteCodeToContainer)


function pasteCodeToContainer($packContainer){
  $packContainer.insertAdjacentHTML('beforeend',$containerCode)
  const code = getCodeList($packContainer)
  const $placeForCode = $packContainer.querySelector('.code-here')
  pasteText(code,$placeForCode)
}

function getCodeList($packContainer){
  const codeList = $packContainer.querySelectorAll('[to-text]')
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
  const text = new XMLSerializer().serializeToString($elem)+'\n'
  const fText = format(text)
  const coloredText = colorText(fText)
  return coloredText
}

function colorText(text){//распознает элементы разметки
  let result = ""
  let boofer = ''
  let mode = 'empty'
  for (const textSymbol of text) {
      if(mode=='empty'){//empty
        if(textSymbol=='<'){
          boofer+=textSymbol
          mode='tag'
        }else{
          result+=textSymbol
        }
      }else if(mode=='tag' || mode=='attributeValue' && textSymbol=='>'){//tag
          if(textSymbol=='!' && boofer.slice(-1)=='<'){//comment
              boofer=''+textSymbol
              mode="comment"
          }else if(textSymbol==' '){//attribute
              let tag = boofer?boofer.match(/[\w]\w*/)[0]:''
              result +=tag?`<<span class="color-tag">${tag}</span>`+" ":" "
              mode='attributeName'
              boofer=''
          }else if(textSymbol=='>'){//end of tag
            if(boofer.match(/\/(.*)/)){
              let tag = boofer.match(/\/(.*)/)[1]
              result+=tag?`<<span>/<span class="color-tag">${tag}</span>></span>`:'>'
            }else{
              let tag = boofer?boofer.slice(1,):''
              result+=tag?`<<span class="color-tag">${tag}</span>`+'>':'>'
            }
            boofer=''
            mode='empty'
          }else{
              boofer+=textSymbol
          }
      }else if(mode=='attributeName'){//attribute name
          if(textSymbol=='='){
              result += `<span class='color-attr'>${boofer}</span>=`
              boofer =""
              mode="attributeValue"
          }else{
              boofer+=textSymbol
          }
      }else if(mode=='attributeValue'){//attribute value
          if(textSymbol=="\"" && boofer!=''){
              result+=`<span class="color-attrValue">${boofer?'"'+boofer+'"':''}</span>`
              boofer=''
              mode="tag"
          }else if(textSymbol!="\""){
              boofer+=textSymbol
          }
      }else{//coment
        if(textSymbol=='>' && boofer.slice(-3,-1)==' -'){//+комментарий
          result+= `<span class='color-comment'><span><</span>${boofer}></span>`
          boofer=''
          mode='empty'
      }else{
          boofer+=textSymbol
      }
      }
  }
  return result
}

function format(text){
  const distance = getDistance(text)
  let regex = /\sxmlns.*=\"http:\/\/www.w3.org\/\d*\/\w*\"/g
  let ftext = text.replaceAll(regex,'').replaceAll('> <','><')
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