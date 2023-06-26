var today = new Date().toISOString().split('T')[0];
document.getElementById('dateInput').min = today;

function validateUUID() {
    var aid = document.getElementById("aipId").value;

    var reg = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    var validationMessage = document.getElementById("uuidValidationMessage");

    if (reg.test(aid)) {
        validationMessage.innerText = "";
    } else {
        validationMessage.innerText = "Invalid UUID";
    }
}


function validateEmail() {
    var emailInput = document.getElementById("aipEmail");
    var validationMessage = document.getElementById("emailValidationMessage");
    var submitButton = document.getElementById("submitButton");

    if (emailInput.validity.valid) {
        validationMessage.innerText = "";
        emailInput.classList.remove("is-invalid");
        submitButton.disabled = false;
    } else {
        validationMessage.innerText = "Invalid email address";
        emailInput.classList.add("is-invalid");
        submitButton.disabled = true;
    }
}



function validateName() {
    var nameInput = document.getElementById('aipName');
    var name = nameInput.value.trim();
    var submitBtn = document.querySelector('.submit');
    var vm = document.getElementById("nameValidationMessage");

    if (name.length > 100) {
        vm.innerText = "Invalid Length";
    }

    if (name.length === 0 || name.length > 100) {
        submitBtn.disabled = true;
    }
    else {
        submitBtn.disabled = false;
    }
}