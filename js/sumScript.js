document.addEventListener("DOMContentLoaded", function () {
    var AIU = localStorage.getItem("AIU");
    console.log(AIU);
    if (AIU != 2) {
        console.log("removing");
        console.log(AIU);
        document.getElementById("aiusec").style.display = "none";
        console.log("removed");
    }
});

// Hide the AIU section if AIU is not 2
// function checking(){
// if (AIU != 2) {
//   document.getElementById("aiusec").style.display = "none";
// }
// }
var editCall = 0;
var aipId = localStorage.getItem("sumID");
var aipEmail = localStorage.getItem("sumEmail");
var aipName = localStorage.getItem("sumAIPname");
var dpID = localStorage.getItem("sumDPid");
var dpName = localStorage.getItem("sumDPname");
var itemType = localStorage.getItem("sumItemType");
var itemID = localStorage.getItem("sumItemId");
var artifactExp = localStorage.getItem("sumArtifactExp");
var purpose = localStorage.getItem("sumPurpose");
var aiuID = localStorage.getItem("sumAIUid");
var aiuName = localStorage.getItem("sumAIUname");
var aiuEmail = localStorage.getItem("sumAIUmail");
var userConsent;

try {
    var userConsentJSON = localStorage.getItem("userConsent");
    if (userConsentJSON) {
        userConsent = JSON.parse(userConsentJSON);
    }
} 
catch (error) {
    console.error("Invalid JSON string in 'userConsent':", error);
}

document.getElementById("sumAIPid").textContent = aipId;
document.getElementById("sumAIPmail").textContent = aipEmail;
document.getElementById("sumAIPname").textContent = aipName;
document.getElementById("sumDPid").textContent = dpID;
document.getElementById("sumDPname").textContent = dpName;
document.getElementById("sumItemType").textContent = itemType;
document.getElementById("sumItemId").textContent = itemID;
document.getElementById("sumExpiry").textContent = artifactExp;
document.getElementById("sumPurpose").textContent = purpose;
document.getElementById("sumAIUid").textContent = aiuID;
document.getElementById("sumAIUname").textContent = aiuName;
document.getElementById("sumAIUmail").textContent = aiuEmail;

if (userConsent) {
    var blob = new Blob([JSON.stringify(userConsent)], {
        type: "application/json",
    });
    var downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = aipName + ".json";
    document.getElementById("downloadJSON").addEventListener("click", () => {
        downloadLink.click();
    });
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
