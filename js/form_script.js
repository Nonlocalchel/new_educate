try{
	let formForPassword=document.querySelectorAll('.form-group__input-password');
	for(bin of formForPassword){
		let eye=bin.nextElementSibling;
		eye.addEventListener('click',function(event){
			let needForm=eye.previousElementSibling;
			let needFormType=needForm.getAttribute('type');
			if(needFormType==="password"){
				needForm.setAttribute('type','text');
			}else{
				needForm.setAttribute('type','password');
			};
			//needForm.focus();
		})
	}
}catch(error){
	console.log('поле password не найдено');
}

//поправить
//меняет стиль при выюоре файла
let inputFile=document.querySelectorAll('.file-form__input');
for(inputKey of inputFile){
	let inputFileLabel=inputKey.nextElementSibling;
	let svg= inputFileLabel.nextElementSibling;
	inputKey.addEventListener('change',function(event){
		let inputFileField=inputFileLabel.querySelector('p');
		try{
			let fileName=this.files[0].name;
			fileName=fileName.length<15?fileName:`${fileName.slice(0,13)}...`;
			inputFileField.innerHTML=fileName;
			inputFileField.classList.add('file-form__input-get');
			svg.classList.add('file-form__icon-get');
		}catch(error){
			inputFileField.innerHTML="Добавить";
			inputFileField.classList.remove('file-form__input-get');;
			svg.classList.remove('file-form__icon-get');
		};
	});
};
