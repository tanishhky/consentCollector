document.addEventListener("DOMContentLoaded", function () {
    var AIU = localStorage.getItem("AIU");
    if (AIU != 2) {
        document.getElementById("aiusec").style.display = "none";
    }
});
//let dropdown=document.getElementById("purposes");
var editCall = 0;
var userConsent;

try {
    var userConsentJSON = localStorage.getItem("userConsent");
    if (userConsentJSON) {
        userConsent = JSON.parse(userConsentJSON);
        console.log("data fetched");
    }
} catch (error) {
    console.error("Invalid JSON string in 'userConsent':", error);
}

document.getElementById("sumAIPid").textContent = userConsent.aip.id;
document.getElementById("sumAIPmail").textContent = userConsent.aip.email;
document.getElementById("sumAIPname").textContent = userConsent.aip.name;
document.getElementById("sumDPid").textContent = userConsent.dataPrincipal.id;
document.getElementById("sumDPname").textContent =
    userConsent.dataPrincipal.name;
document.getElementById("sumItemType").textContent = userConsent.itemType;
document.getElementById("sumItemId").textContent = userConsent.itemID;
document.getElementById("sumExpiry").textContent = userConsent.expiry;
document.getElementById("sumPurpose").textContent = userConsent.purposes;
document.getElementById("sumAIUid").textContent = userConsent.aiu.id;
document.getElementById("sumAIUname").textContent = userConsent.aiu.name;
document.getElementById("sumAIUmail").textContent = userConsent.aiu.email;

if (userConsent) {
    var blob = new Blob([JSON.stringify(userConsent)], {
        type: "application/json",
    });
    var downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = userConsent.aip.name;
    +".json";
    document.getElementById("downloadJSON").addEventListener("click", () => {
        downloadLink.click();
    });
}

// function retainDetails() {
//     editCall = 1;
//     localStorage.setItem("editCall", editCall);
//     document.getElementById("aipId").value = userConsent.aip.id;
//     document.getElementById("aipName").value = userConsent.aip.name;
//     document.getElementById("aipEmail").value = userConsent.aip.email;
//     document.getElementById("dpID").value = userConsent.dataPrincipal.id;
//     document.getElementById("dpName").value = userConsent.dataPrincipal.name;
//     document.getElementById("itemInp").value = userConsent.itemId;
//     document.getElementById("itemtype").value = userConsent.itemType;
//     document.getElementById("dateInput").value = new Date(userConsent.expiry)
//         .toISOString()
//         .split("T")[0];
//     console.log("bfor reatin purpose");
//     document.getElementById("purpose").value = retainPurposes();
//     console.log("cheking bfor aiuId");
//     document.getElementById("aiuId").value = userConsent.aiu.id;
//     console.log("checking before aiu name");
//     document.getElementById("aiuName").value = userConsent.aiu.name;
//     console.log("checking before aiumail");
//     document.getElementById("aiuEmail").value = userConsent.aiu.email;
//     console.log("checking after aiu mail");
// }

// function retainPurposes() {
//     for (
//         let i = 0;
//         i < document.getElementById("purpose").options.length;
//         i++
//     ) {
//         for (let j = 0; j < userConsent.purposes.length; j++) {
//             if (
//                 document.getElementById("purpose").options[i] ==
//                 userConsent.purposes[j].code
//             ) {
//                 document.getElementById("purpose").options[i].isSelected = true;
//             }
//         }
//     }
// }
