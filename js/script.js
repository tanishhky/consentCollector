document.addEventListener("DOMContentLoaded", function() {
    var editCall=localStorage.getItem("editCall");
    if (editCall!=0) {
        console.log("In");
        retainDetails();
        console.log("OUT");
    }
});

var userConsent;
var AIU;

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
    } 
    else {
        validationMessage.innerText = "Invalid UUID";
        return false;
    }
}
function DPnameValidation(){
    var nameInput = document.getElementById("dpName");
    var name = nameInput.value.trim();
    var vm = document.getElementById("nameValidationMessage");

    if (name.length > 100) {
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
        validationMessage2.innerText = "";
        return true;
    } else {
        validationMessage2.innerText = "Invalid UUID";
        return false;
    }
}

function validateEmail() {
    var emailInput = document.getElementById("aipEmail");
    var validationMessage = document.getElementById("emailValidationMessage");

    if (emailInput.validity.valid) {
        validationMessage.innerText = "";
        emailInput.classList.remove("is-invalid");
        return true;
    } else {
        validationMessage.innerText = "Invalid email address";
        emailInput.classList.add("is-invalid");
        return false;
    }
}

function validateAIUEmail() {
    var emailInput = document.getElementById("aiuEmail");
    var validationMessage = document.getElementById(
        "AIUemailValidationMessage"
    );

    if (emailInput.validity.valid) {
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
    var submitBtn = document.querySelector(".submit");
    var vm = document.getElementById("nameValidationMessage");

    if (name.length > 100) {
        vm.innerText = "Invalid Length";
        return false;
    } else {
        vm.innerText = "";
        return true;
    }
}
function validateAIUName() {
    var nameInput = document.getElementById("aiuName");
    var name = nameInput.value.trim();
    var submitBtn = document.querySelector(".submit");
    var vm = document.getElementById("AIUNameValidationMessage");

    if (name.length > 100) {
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
    }
    else {
        if (dpidInput[0] == "T" || dpidInput[0] == "R") {
            vm.innerText = "";
            return true;
        } else {
            vm.innerText = "Invalid ID";
            return false;
        }
    }
}

function validateAIU(){
    if(validateAIUID() && validateAIUName() && validateAIUEmail()){
        AIU=2;
        return true;
    }
    else if(!validateAIUID() && !validateAIUName() && !validateAIUEmail()){
        AIU=1;
        return true;
    }
    else{
        AIU=0;
        return false
    }
}
function validateForm() {
    if (validateEmail() && validateName() && validateUUID() && DPIDValidation()&&DPnameValidation() && validateAIU())  {
        link.setAttribute("href", "Summary.html");
        conJSON();
    }
    else{
        alert("Please fill valid details");
    }
}

function conJSON() {
    if (AIU == 2) {
        var aipID = document.getElementById("aipId").value;
        var aipEmail = document.getElementById("aipEmail").value;
        var aipName = document.getElementById("aipName").value;
        var aiuID = document.getElementById("aiuId").value;
        var aiuEmail = document.getElementById("aiuEmail").value;
        var aiuName = document.getElementById("aiuName").value;
        var dpID = document.getElementById("dpID").value;
        var dpName = document.getElementById("dpName").value;
        var itemtype = document.getElementById("itemtype").value;
        var expiryDate = document.getElementById("dateInput").value;
        var submissionTime = new Date().toISOString();

        var userConsent = {
            id: aipID,
            aip: {
                id: aipID,
                email: aipEmail,
                name: aipName,
            },
            aiu: {
                id: aiuID,
                email: aiuEmail,
                name: aiuName,
            },
            dataPrincipal: {
                id: dpID,
                name: dpName,
            },
            itemId: "datakaveri.org/a3dca9dfbe40f76b863da69d0d7d6f7c984e93bf/rs.iudx.io/ResGrp",
            itemType: itemtype,
            expiry: expiryDate,
            createdAt: submissionTime,
        };

        localStorage.setItem("sumID", aipID);
        localStorage.setItem("sumEmail", aipEmail);
        localStorage.setItem("sumAIPname", aipName);
        localStorage.setItem("sumDPid", dpID);
        localStorage.setItem("sumDPname", dpName);
        localStorage.setItem("sumItemId", "To be asked");
        localStorage.setItem("sumItemType", itemtype);
        localStorage.setItem("sumArtifactExp", expiryDate);
        localStorage.setItem("sumPurpose", "working");
        localStorage.setItem("sumAIUid", aiuID);
        localStorage.setItem("sumAIUname", aiuName);
        localStorage.setItem("sumAIUmail", aiuEmail);
    } 
    else {
        AIU=1;
        var aipID = document.getElementById("aipId").value;
        var aipEmail = document.getElementById("aipEmail").value;
        var aipName = document.getElementById("aipName").value;
        var dpID = document.getElementById("dpID").value;
        var dpName = document.getElementById("dpName").value;
        var itemtype = document.getElementById("itemtype").value;
        var expiryDate = document.getElementById("dateInput").value;
        var submissionTime = new Date().toISOString();

        var userConsent = {
            id: aipID,
            aip: {
                id: aipID,
                email: aipEmail,
                name: aipName,
            },
            dataPrincipal: {
                id: dpID,
                name: dpName,
            },
            itemId: "datakaveri.org/a3dca9dfbe40f76b863da69d0d7d6f7c984e93bf/rs.iudx.io/ResGrp",
            itemType: itemtype,
            expiry: expiryDate,
            createdAt: submissionTime,
        };

        localStorage.setItem("sumID", aipID);
        localStorage.setItem("sumEmail", aipEmail);
        localStorage.setItem("sumAIPname", aipName);
        localStorage.setItem("sumDPid", dpID);
        localStorage.setItem("sumDPname", dpName);
        localStorage.setItem("sumItemId", "To be asked");
        localStorage.setItem("sumItemType", itemtype);
        localStorage.setItem("sumArtifactExp", expiryDate);
        localStorage.setItem("sumPurpose", "working");
    }

    localStorage.setItem("AIU", AIU);
    localStorage.setItem("userConsent", JSON.stringify(userConsent));
}

function retainDetails() {
    editCall=1;
    localStorage.setItem("editCall",editCall);
    document.getElementById("aipId").value = aipId;
    document.getElementById("aipName").value = aipName;
    document.getElementById("aipEmail").value = aipEmail;
    document.getElementById("dpID").value = dpID;
    document.getElementById("dpName").value = dpName;
    document.getElementById("itemInp").value = itemID;
    document.getElementById("itemtype").value = itemType;
    document.getElementById("dateInput").value = artifactExp;
    document.getElementById("aiuId").value = aiuID;
    document.getElementById("aiuName").value = aiuName;
    document.getElementById("aiuEmail").value = aiuEmail;
}