function validateUUID(){
    var aid=document.getElementById("aipId").value;

    var reg=/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    var validationMessage=document.getElementById("uuidValidationMessage");

    if(reg.test(aid)){
        validationMessage.innerText="";
    }else{
        validationMessage.innerText="Invalid UUID";
    }
}

function validateName() {
    var nameInput = document.getElementById('aipName');
    var name = nameInput.value.trim();
    var submitBtn = document.querySelector('.submit');
    var vm=document.getElementById("nameValidationMessage");

    if (name.length > 100) {
        vm.innerText="Invalid Length";
    }else{
        vm.innerText="";
    }

    if (name.length === 0 || name.length > 100) {
      submitBtn.disabled = true;
    } 
    else {
      submitBtn.disabled = false;
    }
}