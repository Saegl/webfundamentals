function reqListener() {
    //console.log(this.responseText);
}

let oReq = new XMLHttpRequest();
oReq.addEventListener("load", reqListener);
oReq.open("GET", "/blogs");
oReq.send();
