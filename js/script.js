document.addEventListener("DOMContentLoaded", function () {
    var editCall = localStorage.getItem("editCall");
    if (editCall != 0) {
        console.log("In");
        retainDetails();
        console.log("OUT");
    }
});

var userConsent;
var AIU;
var checkAIUID, checkAIUEmail, checkAIUName;

function isValidEmail(email) {
    console.log("checking email format");
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

var today = new Date().toISOString().split("T")[0];
document.getElementById("dateInput").min = today;

var link = document.getElementById("lynk");
link.removeAttribute("href");

function validateUUID() {
    console.log("entered validate AIPID");
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
    console.log("entered validate AIP email");
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
    console.log("entered validate AIP name");
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
    console.log("entered DP ID Validation");
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
    console.log("entered validate DP name");
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
    console.log("entered validate aiuId");
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
    console.log("entered validate aiuName");
    var nameInput = document.getElementById("aiuName");
    var name = nameInput.value.trim();
    var vm = document.getElementById("AIUNameValidationMessage");

    if (name.length > 100) {
        checkAIUName = -1;
        vm.innerText = "Invalid Length";
        return false;
    } else if (name.length == 0) {
        checkAIUName = 0;
        vm.innerText = "";
        return true;
    } else {
        checkAIUName = 1;
        vm.innerText = "";
        return true;
    }
}

function validateAIUEmail() {
    console.log("entered validate aiumail");
    var emailInput = document.getElementById("aiuEmail");
    var validationMessage = document.getElementById(
        "AIUemailValidationMessage"
    );

    if (isValidEmail(emailInput.value)) {
        checkAIUEmail = 1;
        console.log("checking in if for valid mail or empty input");
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
        console.log("checking in else for invalid mail");
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
    console.log(checkAIUEmail);
    console.log(checkAIUID);
    console.log(checkAIUName);

    if (checkAIUEmail == 1 && checkAIUID == 1 && checkAIUName == 1) {
        // console.log(validateAIUID());
        // console.log(validateAIUName());
        // console.log(validateAIUEmail());
        console.log("all added");
        AIU = 2;
        return true;
    } else if (checkAIUEmail == 0 && checkAIUID == 0 && checkAIUName == 0) {
        console.log("ntg filled");
        // console.log(validateAIUID());
        // console.log(validateAIUName());
        // console.log(validateAIUEmail());
        AIU = 1;
        return true;
    } else {
        // console.log(validateAIUID());
        // console.log(validateAIUName());
        // console.log(validateAIUEmail());
        console.log("incomplete data");

        AIU = 0;
        return false;
    }
}

function validateForm() {
    console.log("entered validate form");
    if (
        validateEmail() &&
        validateName() &&
        validateUUID() &&
        DPIDValidation() &&
        DPnameValidation() &&
        validateAIU()
    ) {
        link.setAttribute("href", "Summary.html");
        conJSON();
    } else {
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

        localStorage.clear();
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
    } else {
        AIU = 1;
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

        localStorage.clear();
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
    editCall = 1;
    localStorage.setItem("editCall", editCall);
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
