document.addEventListener("DOMContentLoaded", function () {
    var AIU = localStorage.getItem("AIU");
    if (AIU != 2) {
        document.getElementById("aiusec").style.display = "none";
    }
});

var editCall = 0;
// var aipId = localStorage.getItem("sumID");
// var aipEmail = localStorage.getItem("sumEmail");
// var aipName = localStorage.getItem("sumAIPname");
// var dpID = localStorage.getItem("sumDPid");
// var dpName = localStorage.getItem("sumDPname");
// var itemType = localStorage.getItem("sumItemType");
// var itemID = localStorage.getItem("sumItemId");
// var artifactExp = localStorage.getItem("sumArtifactExp");
// var purpose = localStorage.getItem("sumPurpose");
// var aiuID = localStorage.getItem("sumAIUid");
// var aiuName = localStorage.getItem("sumAIUname");
// var aiuEmail = localStorage.getItem("sumAIUmail");
var userConsent;

try {
    var userConsentJSON = localStorage.getItem("userConsent");
    if (userConsentJSON) {
        userConsent = JSON.parse(userConsentJSON);
        console.log("data fetched");
    }
} 
catch (error) {
    console.error("Invalid JSON string in 'userConsent':", error);
}

document.getElementById("sumAIPid").textContent=userConsent.aip.id;
document.getElementById("sumAIPmail").textContent = userConsent.aip.email;
document.getElementById("sumAIPname").textContent = userConsent.aip.name;
document.getElementById("sumDPid").textContent = userConsent.dataPrincipal.id;
document.getElementById("sumDPname").textContent = userConsent.dataPrincipal.name;
document.getElementById("sumItemType").textContent = userConsent.itemType;
document.getElementById("sumItemId").textContent = userConsent.itemID;
document.getElementById("sumExpiry").textContent = userConsent.expiry;
// document.getElementById("sumPurpose").textContent = purpose;
document.getElementById("sumAIUid").textContent = userConsent.aiu.id;
document.getElementById("sumAIUname").textContent = userConsent.aiu.name;
document.getElementById("sumAIUmail").textContent = userConsent.aiu.email;


if (userConsent) {
    var blob = new Blob([JSON.stringify(userConsent)], {
        type: "application/json",
    });
    var downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = userConsent.aip.name; + ".json";
    document.getElementById("downloadJSON").addEventListener("click", () => {
        // console.log("hi");
        downloadLink.click();
    });
}
// if (userConsent) {
//     console.log("1");
//     var blob = new Blob([JSON.stringify(userConsent)], {
//         type: "application/json",
//         console.log("2");
//     });
//     var downloadLink = document.createElement("a");
//     console.log("3");
//     downloadLink.href = URL.createObjectURL(blob);
//     console.log("4");
//     downloadLink.download = aipName + ".json";
//     console.log("5");
//     document.getElementById("downloadJSON").addEventListener("click", () => {
//         console.log("6");
//         downloadLink.click();
//         console.log("7");
//     });
// }

function retainDetails() {
    editCall = 1;
    localStorage.setItem("editCall", editCall);
    document.getElementById("aipId").value = userConsent.aip.id
    document.getElementById("aipName").value = userConsent.aip.name;
    document.getElementById("aipEmail").value = userConsent.aip.email;
    document.getElementById("dpID").value = userConsent.dataPrincipal.id;
    document.getElementById("dpName").value = userConsent.dataPrincipal.name;
    document.getElementById("itemInp").value = userConsent.itemId;
    document.getElementById("itemtype").value = userConsent.itemType;
    document.getElementById("dateInput").value = userConsent.expriy;
    document.getElementById("aiuId").value = userConsent.aiu.id
    document.getElementById("aiuName").value = userConsent.aiu.name;
    document.getElementById("aiuEmail").value = userConsent.aiu.email;
}


