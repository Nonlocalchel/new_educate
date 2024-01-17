var windowOnloadAdd = function (event) {
    if ( window.onload ){
       window.onload = window.onload + event;
    } else {
       window.onload = event;
    };
 };

 windowOnloadAdd(function() {
      let element=document.querySelector('[viewBox]')
      element.onclick=(event)=>{
         let tagUse= event.target.querySelector('[href]')
         console.log(tagUse)
         //tagUse.setAttribute('xlink:href','test2.svg#me')

      }
 });



//let obj=document.querySelector('object')
//console.log(element)
//element.onclick=(event)=>console.log(event.target)
//<script type="text/javascript" href="test_script.js"></script>