document.addEventListener("DOMContentLoaded", function () {
    var editCall = localStorage.getItem("editCall");
    if (editCall != 0) {
        retainDetails();
    }
});

var userConsent;
var AIU;
var checkAIUID, checkAIUEmail, checkAIUName;

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
        .replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
}


function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

var today = new Date().toISOString().split("T")[0];
document.getElementById("dateInput").min = today;

var link = document.getElementById("lynk");
link.removeAttribute("href");

function validateUUID() {
    var aid = document.getElementById("aipId").value;
    var reg =
        /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    var validationMessage = document.getElementById("uuidValidationMessage");

    if (reg.test(aid)) {
        validationMessage.innerText = "";
        return true;
    } else {
        validationMessage.innerText = "Invalid UUID";
        return false;
    }
}

function validateEmail() {
    var emailInput = document.getElementById("aipEmail");
    var validationMessage = document.getElementById("emailValidationMessage");

    if (isValidEmail(emailInput.value)) {
        validationMessage.innerText = "";
        emailInput.classList.remove("is-invalid");
        return true;
    } else {
        validationMessage.innerText = "Invalid email address";
        emailInput.classList.add("is-invalid");
        return false;
    }
}

function validateName() {
    var nameInput = document.getElementById("aipName");
    var name = nameInput.value.trim();
    var vm = document.getElementById("nameValidationMessage");

    if (name.length > 100 || name.length == 0) {
        vm.innerText = "Invalid Length";
        return false;
    } else {
        vm.innerText = "";
        return true;
    }
}

function DPIDValidation() {
    var dpidInput = document.getElementById("dpID").value;
    var vm = document.getElementById("dpIDValidationMessage");

    if (dpidInput.length !== 11 && dpidInput.length !== 12) {
        vm.innerText = "Invalid ID";
        return false;
    } else {
        if (dpidInput[0] == "T" || dpidInput[0] == "R") {
            vm.innerText = "";
            return true;
        } else {
            vm.innerText = "Invalid ID";
            return false;
        }
    }
}

function DPnameValidation() {
    var nameInput = document.getElementById("dpName");
    var name = nameInput.value.trim();
    var vm = document.getElementById("nameValidationMessage");

    if (name.length > 100 || name.length == 0) {
        vm.innerText = "Invalid Length";
        return false;
    } else {
        vm.innerText = "";
        return true;
    }
}
function validateAIUID() {
    var uid = document.getElementById("aiuId").value;
    var reg2 =
        /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    var validationMessage2 = document.getElementById("AIUIDValidationMessage");

    if (reg2.test(uid)) {
        checkAIUID = 1;
        validationMessage2.innerText = "";
        return true;
    } else if (uid.length == 0) {
        checkAIUID = 0;
        validationMessage2.innerText = "";
        return true;
    } else {
        checkAIUID = -1;
        validationMessage2.innerText = "Invalid UUID";
        return false;
    }
}

function validateAIUName() {
    var nameInput = document.getElementById("aiuName");
    var name = nameInput.value.trim();
    var vm = document.getElementById("AIUNameValidationMessage");

    if (name.length > 100) {
        checkAIUName = -1;
        vm.innerText = "Invalid Length";
        return false;
    }
    else if (name.length == 0) {
        checkAIUName = 0;
        vm.innerText = "";
        return true;
    }
    else {
        checkAIUName = 1;
        vm.innerText = "";
        return true;
    }
}

function validateAIUEmail() {
    var emailInput = document.getElementById("aiuEmail");
    var validationMessage = document.getElementById(
        "AIUemailValidationMessage"
    );

    if (isValidEmail(emailInput.value)) {
        checkAIUEmail = 1;
        validationMessage.innerText = "";
        emailInput.classList.remove("is-invalid");
        return true;
    } else if (emailInput.value === "") {
        checkAIUEmail = 0;
        validationMessage.innerText = "";
        emailInput.classList.remove("is-invalid");
        return true;
    } else {
        checkAIUEmail = -1;
        validationMessage.innerText = "Invalid email address";
        emailInput.classList.add("is-invalid");
        return false;
    }
}

function validateAIU() {
    console.log("entered validate AIU");
    validateAIUEmail();
    validateAIUID();
    validateAIUName();

    if (checkAIUEmail == 1 && checkAIUID == 1 && checkAIUName == 1) {
        AIU = 2;
        return true;
    }
    else if (checkAIUEmail == 0 && checkAIUID == 0 && checkAIUName == 0) {
        AIU = 1;
        return true;
    }
    else {
        AIU = 0;
        return false;
    }
}

function validateForm() {
    if (validateEmail() && validateName() && validateUUID() && DPIDValidation() && DPnameValidation() && validateAIU()) {
        conJSON();
        link.setAttribute("href", "Summary.html");

    } else {
        alert("Please fill valid details");
    }
}

function conJSON() {
    var id = uuidv4();
    if (AIU == 2) {
        var id = id;
        // var aipID = document.getElementById("aipId").value;
        // var aipEmail = document.getElementById("aipEmail").value;
        // var aipName = document.getElementById("aipName").value;
        // var aiuID = document.getElementById("aiuId").value;
        // var aiuEmail = document.getElementById("aiuEmail").value;
        // var aiuName = document.getElementById("aiuName").value;
        // var dpID = document.getElementById("dpID").value;
        // var dpName = document.getElementById("dpName").value;
        // var dpType = "PPB Number";
        // var itemID = document.getElementById("itemInp").value;
        // var itemtype = document.getElementById("itemtype").value;
        // var expiryDate = new Date(document.getElementById("dateInput").value).toISOString();
        // var submissionTime = new Date().toISOString();

        var dropdown = document.getElementById('purpose');
        var selectedpurposes = [];
        for (let i = 0; i < dropdown.length; i++) {
            if (dropdown.options[i].isSelected) {
                var key = dropdown.options[i].value;
                var value = dropdown.options[i].label;
                console.log(key);
                console.log(value);
                selectedpurposes.push({ code: key, name: value });
            }

        }
        
        var userConsent = {
            id: id,
            aip: {
                id: document.getElementById("aipId").value,
                email: document.getElementById("aipEmail").value,
                name: document.getElementById("aipName").value,
            },
            aiu: {
                id: document.getElementById("aiuId").value,
                email:  document.getElementById("aiuEmail").value,
                name: document.getElementById("aiuName").value,
            },
            dataPrincipal: {
                id: document.getElementById("dpID").value,
                idType:  "PPB Number",
                name: document.getElementById("dpName").value,
            },
            purposes: selectedpurposes,
            itemId: document.getElementById("itemInp").value,
            itemType: document.getElementById("itemtype").value,
            expiry: new Date(document.getElementById("dateInput").value).toISOString(),
            createdAt: new Date().toISOString(),
        };

        localStorage.clear();
    }

    else {
        var id = id;
        var aipID = document.getElementById("aipId").value;
        var aipEmail = document.getElementById("aipEmail").value;
        var aipName = document.getElementById("aipName").value;
        var dpID = document.getElementById("dpID").value;
        var dpName = document.getElementById("dpName").value;
        var dpType = "PPB Number";
        var itemID = document.getElementById("itemInp").value;
        var itemtype = document.getElementById("itemtype").value;
        var expiryDate = new Date(document.getElementById("dateInput").value).toISOString();
        var submissionTime = new Date().toISOString();

        var dropdown = document.getElementById("purpose");
        var selectedOptions = [];


        for (let i = 0; i < dropdown.length; i++) {
            if (dropdown.options[i].isSelected) {
                dropdown.options[i].isSelected;
                let key = dropdown.options[i].value;
                let value = dropdown.options[i].label;
                selectedOptions.push({ code: key, name: value });
            }
        }
        console.log(selectedOptions);


        var userConsent = {
            id: id,
            aip: {
                id: aipID,
                email: aipEmail,
                name: aipName,
            },
            dataPrincipal: {
                id: dpID,
                idType: dpType,
                name: dpName,
            },
            purposes: selectedOptions,
            itemId: itemID,
            itemType: itemtype,
            expiry: expiryDate,
            createdAt: submissionTime,
        };

        localStorage.clear();
    }

    localStorage.setItem("AIU", AIU);
    localStorage.setItem("userConsent", JSON.stringify(userConsent));
}


function retainDetails() {
    editCall = 1;
    localStorage.setItem("editCall", editCall);
    document.getElementById("aipId").value = userConsent.aip.id;
    document.getElementById("aipName").value = userConsent.aip.name;
    document.getElementById("aipEmail").value = userConsent.aip.email;
    document.getElementById("dpID").value = userConsent.dataPrincipal.id;
    document.getElementById("dpName").value = userConsent.dataPrincipal.name;
    document.getElementById("itemInp").value = userConsent.itemId;
    document.getElementById("itemtype").value = userConsent.itemType;
    document.getElementById("dateInput").value = userConsent.expiry;
    document.getElementById("aiuId").value = userConsent.aiu.id;
    document.getElementById("aiuName").value = userConsent.aiu.name;
    document.getElementById("aiuEmail").value = userConsent.aiu.email;
}