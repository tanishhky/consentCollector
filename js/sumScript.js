document.addEventListener("DOMContentLoaded", function () {
    var AIU = localStorage.getItem("AIU");
    if (AIU != 2) {
        document.getElementById("aiusec").style.display = "none";
    }
});
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
document.getElementById("sumDPname").textContent = userConsent.dataPrincipal.name;
document.getElementById("sumItemType").textContent = userConsent.itemType;
document.getElementById("sumItemId").textContent = userConsent.itemId;
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