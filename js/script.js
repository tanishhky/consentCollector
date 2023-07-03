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
function DPnameValidation(){
    var nameInput = document.getElementById("dpName");
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
function validateAIU(){
    if(validateAIUID && validateAIUName && validateAIUEmail){
        return 2;
    }
    else if(!validateAIUID && !validateAIUName && !validateAIUEmail){
        return 1;
    }
    else{
        return 0;
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

// added by sanjana--this fn
function validateForm() {
   
    if (validateEmail() && validateName() && validateUUID() && DPIDValidation()&&DPnameValidation()) {
        console.log(validateName);
        console.log(validateEmail);
        console.log(validateUUID);
        console.log(DPIDValidation);
        console.log(DPnameValidation);
        document.getElementById("lynk").innerHTML = "SUBMIT";
        link.setAttribute("href", "Summary.html");
    }
}

function conJSON() {
    var aipID = document.getElementById("aipId").value;
    var aipEmail = document.getElementById("aipEmail").value;
    var aipName = document.getElementById("aipName").value;
    var aiuID = document.getElementById("aiuId").value;
    var aiuEmail = document.getElementById("aiuEmail").value;
    var aiuName = document.getElementById("aiuName").value;
    var dpID = document.getElementById("dpID").value;
    var dpName = document.getElementById("dpName").value;
    var itemtype = document.getElementById("itemtype").value;
    var expiryDate=document.getElementById("dateInput").value;
    var submissionTime=new Date().toISOString();

    // document.addEventListener("DOMContentLoaded", function() {
    //     document.getElementById("sumAIPid").textContent=aipID;
    //     document.getElementById("sumAIPmail").textContent=aipEmail;
    //     document.getElementById("sumAIPname").textContent=aipName;
    //     document.getElementById("sumDPid").textContent=dpID;
    //     document.getElementById("sumDPname").textContent=dpName;
    // });
    // document.getElementById("").textContent=;
    // document.getElementById("").textContent=;
    // document.getElementById("").textContent=;
    // document.getElementById("").textContent=;
    // document.getElementById("").textContent=;
    // document.getElementById("").textContent=;

    var userData = {
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
            // idType: itemType,
            name: dpName,
        },
        //purposes: purpose,
        itemId: "datakaveri.org/a3dca9dfbe40f76b863da69d0d7d6f7c984e93bf/rs.iudx.io/ResGrp",
        itemType: itemtype,
        expiry: expiryDate,
        createdAt: submissionTime,
    };
    var jsonData = JSON.stringify(userData);
    console.log(userData);

    // Create a Blob with the JSON data
    var blob = new Blob([jsonData], { type: "application/json" });

    // Create a download link
    var downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
    // var filename=aipName+".json";
    downloadLink.download = aipName+".json";

    // Append the download link to the document body
    document.body.appendChild(downloadLink);

    // Trigger the download
    downloadLink.click();

    // Clean up the download link
    document.body.removeChild(downloadLink);

    // Reset the form
    //studentForm.reset();
    // studentForm.reset();
}

