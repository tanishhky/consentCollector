var today = new Date().toISOString().split("T")[0];
document.getElementById("dateInput").min = today;

var link = document.getElementById("lynk");
link.removeAttribute("href");

var consent=document.getElementById("consent");

function validateUUID() {
    var aid = document.getElementById("aipId").value;
    var reg =
        /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    var validationMessage = document.getElementById("uuidValidationMessage");

    if (reg.test(aid)) {
        validationMessage.innerText = "";
    } else {
        validationMessage.innerText = "Invalid UUID";
    }
    validateForm();
}
function validateAIUID() {
    var aid = document.getElementById("aiuId").value;
    var reg =
        /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    var validationMessage = document.getElementById("AIUIDValidationMessage");

    if (reg.test(aid)) {
        validationMessage.innerText = "";
    } else {
        validationMessage.innerText = "Invalid UUID";
    }
    validateForm();
}

function validateEmail() {
    var emailInput = document.getElementById("aipEmail");
    var validationMessage = document.getElementById("emailValidationMessage");
    var submitButton = document.getElementById("submitButton");

    if (emailInput.validity.valid) {
        validationMessage.innerText = "";
        emailInput.classList.remove("is-invalid");
        // submitButton.disabled = false;
    } else {
        validationMessage.innerText = "Invalid email address";
        emailInput.classList.add("is-invalid");
        // submitButton.disabled = true;
    }
    validateForm();
}

function validateAIUEmail() {
    var emailInput = document.getElementById("aiuEmail");
    var validationMessage = document.getElementById(
        "AIUemailValidationMessage"
    );
    var submitButton = document.getElementById("submitButton");

    if (emailInput.validity.valid) {
        validationMessage.innerText = "";
        emailInput.classList.remove("is-invalid");
        // submitButton.disabled = false;
    } else {
        validationMessage.innerText = "Invalid email address";
        emailInput.classList.add("is-invalid");
        // submitButton.disabled = true;
    }
    validateForm();
}

function validateName() {
    var nameInput = document.getElementById("aipName");
    var name = nameInput.value.trim();
    var submitBtn = document.querySelector(".submit");
    var vm = document.getElementById("nameValidationMessage");

    if (name.length > 100) {
        vm.innerText = "Invalid Length";
    } else {
        vm.innerText = "";
    }
    validateForm();

    // if (name.length === 0 || name.length > 100) {
    //     submitBtn.disabled = true;
    // }
    // else {
    //     submitBtn.disabled = false;
    // }
}
function validateAIUName() {
    var nameInput = document.getElementById("aiuName");
    var name = nameInput.value.trim();
    var submitBtn = document.querySelector(".submit");
    var vm = document.getElementById("AIUNameValidationMessage");

    if (name.length > 100) {
        vm.innerText = "Invalid Length";
    } else {
        vm.innerText = "";
    }
    validateForm();
    // if (name.length === 0 || name.length > 100) {
    //     submitBtn.disabled = true;
    // }
    // else {
    //     submitBtn.disabled = false;
    // }
}

function DPIDValidation() {
    var dpidInput = document.getElementById("dpID").value;
    var vm = document.getElementById("dpIDValidationMessage");

    if (dpidInput.length !== 11 && dpidInput.length !== 12) {
        vm.innerText = "Invalid ID";
    } else {
        if (dpidInput[0] == "T" || dpidInput[0] == "R") {
            vm.innerText = "";
        } else {
            vm.innerText = "Invalid ID";
        }
    }
    validateForm();
}

// added by sanjana--this fn
function validateForm() {
    var formInputs = document.querySelectorAll("input");
    var submitButton = document.getElementById("lynk");
    var isValid = true;

    formInputs.forEach(function (input) {
        if (!input.validity.valid) {
            isValid = false;
            return;
        }
    });

    //   submitButton.disabled = !isValid;
    if (isValid) {
        link.setAttribute("href","Summary.html");
    }
}

function conJSON() {
    console.log("a");
    consent.addEventListener("click", function (e) {
        e.preventDefault();

        var aipID = document
            .getElementById("aipId")
            .querySelector("input").value;
        var aipEmail = document
            .getElementById("aipEmail")
            .querySelector("input").value;
        var aipName = document
            .getElementById("aipName")
            .querySelector("input").value;
        var aiuID = document
            .getElementById("aiuId")
            .querySelector("input").value;
        var aiuEmail = document
            .getElementById("aiuEmail")
            .querySelector("input").value;
        var aiuName = document
            .getElementById("aiuName")
            .querySelector("input").value;
        var dpID = document.getElementById("dpID").querySelector("input").value;
        var dpName = document
            .getElementById("dpName")
            .querySelector("input").value;
        var itemType = document.getElementById("itemType").value;

        var purpose = Array.from(
            document.getElementById("purpose").selectedOptions
        ).map(function (option) {
            return {
                code: option.value,
                name: option.textContent,
            };
        });

        var year = document.getElementById("year").value;

        var stuData = {
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
                idType: itemType,
                name: dpName,
            },
            purposes: purpose,
            // "purposes": [
            //     {
            //         "code": "G4",
            //         "name": "Innovation"
            //     }
            // ],
            itemId: "datakaveri.org/a3dca9dfbe40f76b863da69d0d7d6f7c984e93bf/rs.iudx.io/ResGrp",
            itemType: "resource_group",
            expiry: "2024-05-31T13:05:36.471620Z",
            createdAt: "2023-06-20T12:59:32.471620Z",
        };

        // Convert stuData to JSON
        var jsonData = JSON.stringify(stuData);
        console.log(jsonData);

        // Additional code to save or process the JSON data as needed

        // Reset the form
        // studentForm.reset();
    });
}
