function validateUUID(){
    var aid=document.getElementById("aipId").value;

    var reg=/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    if(reg.test(aipId)){
        alert("Valid UUID version");
    }else{
        alert("Invalid UUID version");
    }
}