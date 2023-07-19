var AIU;
var userConsent;

document.addEventListener("DOMContentLoaded", function () {
    AIU = localStorage.getItem("AIU");
    console.log(AIU);
    if (AIU != 2) {
        document.getElementById("aiusec").style.display = "none";
    } else {
        document.getElementById("sumAIUname").textContent =
            userConsent.aiu.name;
        document.getElementById("sumAIUmail").textContent =
            userConsent.aiu.email;
    }
});

try {
    var userConsentJSON = localStorage.getItem("userConsent");
    if (userConsentJSON) {
        userConsent = JSON.parse(userConsentJSON);
        console.log("data fetched");
    }
} catch (error) {
    console.error("Invalid JSON string in 'userConsent':", error);
}

document.getElementById("sumAIPmail").textContent = userConsent.aip.email;
document.getElementById("sumAIPname").textContent = userConsent.aip.name;
document.getElementById("sumDPid").textContent = userConsent.dataPrincipal.id;
document.getElementById("sumDPname").textContent =
    userConsent.dataPrincipal.name;
document.getElementById("sumItemType").textContent = userConsent.itemType;
document.getElementById("sumItemId").textContent = userConsent.itemId;
document.getElementById("sumExpiry").textContent = userConsent.expiry;
var purposeText = userConsent.purposes
    .map((purpose) => purpose.code + ": " + purpose.name)
    .join("\n");
document.getElementById("sumPurpose").textContent = purposeText;

document.getElementById("downloadJSON").addEventListener("click", () => {
    var blob = new Blob([JSON.stringify(userConsent)], {
        type: "application/json",
    });

    var downloadLink = document.createElement("a");

    downloadLink.href = URL.createObjectURL(blob);

    downloadLink.download = userConsent.aip.name;
    +".json";

    downloadLink.click();
});

// function uploadPfx() {
//   const fileInput = document.getElementById("pfxFile");
//   console.log("DETECTED FILE");

//   if (fileInput.files.length > 0) {
//       const file = fileInput.files[0];
//       const reader = new FileReader();
//       console.log("MADE FILE READER");

//       reader.onload = async function (event) {
//           const pfxData = new Uint8Array(event.target.result);
//           console.log("PFX data:", pfxData);
//           await extractCertificates(pfxData);
//           console.log("Extracted");
//       };

//       reader.readAsArrayBuffer(file);
//       console.log("READER SUCCESSFUL");
//   }
// }

// async function extractCertificates(pfxData){
//   const password = "1234";

//   const p12Asn1 = forge.asn1.fromDer(pfxData);
//   const p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, password);

//   const bags = p12.getBags({ bagType: forge.pki.oids.certBag });
//   const certificates = bags[forge.pki.oids.certBag];

//   certificates.forEach(function (cert) {
//       const certificate = forge.pki.certificateToPem(cert.cert);
//       console.log("Extracted certificate:", certificate);
//   });
// }
// -------------------------------------------------------------
function uploadPfx() {
    const fileInput = document.getElementById("pfxFile");
    console.log("DETECTED FILE");

    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const reader = new FileReader();
        console.log("MADE FILE READER");

        reader.onload = async function (event) {
            const pfxData = new Uint8Array(event.target.result);
            console.log("PFX data:", pfxData);
            await extractCertificates(pfxData);
            console.log("Extracted");
        };

        reader.readAsArrayBuffer(file);
        console.log("READER SUCCESSFUL");
    }
}

async function extractCertificates(pfxData) {
    try {
        const password = prompt("Enter the password for the PKCS#12 file:");
        const p12Der = forge.util.createBuffer(pfxData);
        const p12Asn1 = forge.asn1.fromDer(p12Der);
        const p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, password);

        const bags = p12.getBags({ bagType: forge.pki.oids.certBag });
        const certificates = bags[forge.pki.oids.certBag];
        let extractedCertificates = [];

        certificates.forEach(function (cert) {
            const certificate = forge.pki.certificateToPem(cert.cert);
            extractedCertificates.push(certificate);
        });

        sessionStorage.setItem("extractedCertificates", JSON.stringify(extractedCertificates));
    } catch (error) {
        console.error("Error extracting certificates:", error);
    }

    const extractedCertificates = sessionStorage.getItem("extractedCertificates");
    console.log("Extracted certificates:", extractedCertificates);
    signJSON();
}


//function signJSON();

// function signJSON(fileInputId, certificatePEM) {
//     const fileInput = document.getElementById(fileInputId);
  
//     fileInput.addEventListener('change', () => {
//       const file = fileInput.files[0];
  
//       // Read the JSON file
//       const fileReader = new FileReader();
//       fileReader.onload = () => {
//         const jsonData = JSON.parse(fileReader.result);
  
//         // Load the certificate
//         const cert = new KJUR.asn1.x509.Certificate();
//         cert.readCertPEM(certificatePEM);
  
//         // Create a signer object
//         const signer = new KJUR.crypto.Signer({ alg: 'SHA256withRSA' });
  
//         // Set the private key from the certificate for signing
//         signer.setPrivateKey(cert.subjectPublicKeyRSA, certificatePEM);
  
//         // Sign the JSON data
//         const signature = signer.signString(JSON.stringify(jsonData));
  
//         // Add the signature to your JSON data or send it to the server
//         jsonData.signature = signature;
//         console.log(jsonData);
//       };
  
//       fileReader.readAsText(file);
//     });
//   }
  
function signJSON() {
    // Retrieve the extracted certificates from sessionStorage
    const extractedCertificatesJSON = sessionStorage.getItem("extractedCertificates");
const extractedCertificates = JSON.parse(extractedCertificatesJSON);

    
    // Retrieve the JSON document to sign from localStorage
    const userDataJSON = localStorage.getItem("userConsent");
    
    // Choose the first certificate for signing (you may modify this logic as needed)
    const signingCertificate = extractedCertificates[0];
    
    try {
      // Create a new PKCS#7 signed data object
      const p7 = forge.pkcs7.createSignedData();
  
      // Load the signing certificate
      const certificate = forge.pki.certificateFromPem(signingCertificate);
      p7.addCertificate(certificate);
  
      // Create the content info for the JSON document
      const content = forge.util.createBuffer(userDataJSON, "utf8");
      const contentInfo = new forge.pkcs7.ContentInfo();
      contentInfo.contentType = {
        name: forge.pki.oids.data,
        asn1Type: forge.pki.oids.data,
      };
      contentInfo.content = forge.util.createBuffer(content.getBytes());
  
      // Add the content info to the PKCS#7 object
      p7.addContentInfo(contentInfo);
  
      // Sign the PKCS#7 object using the signing certificate's private key
      const privateKey = forge.pki.privateKeyToPem(certificate.privateKey);
      p7.sign(privateKey);
  
      // Get the signed data as DER-encoded ASN.1
      const der = forge.asn1.toDer(p7.toAsn1()).getBytes();
  
      // Store the signed data in localStorage or wherever you want
      localStorage.setItem("signedUserData", der);
  
      console.log("Document signed successfully.");
    } catch (error) {
      console.error("Error signing the document:", error);
    }
  }
  
