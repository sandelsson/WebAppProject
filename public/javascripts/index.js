if (document.readyState !== "loading") {
    initializeCode();
  } else {
    document.addEventListener("DOMContentLoaded", function () {
      initializeCode();
    });
  }
  
  function initializeCode() {
    //const page_div = document.getElementById("page-content").addEventListener("onload", myFunction);
}


window.onload = (event) =>{
    event.preventDefault();
    const authToken = localStorage.getItem("auth_token");

    if(!authToken){
        var a = document.createElement('a');
        var linkText = document.createTextNode("Login");
        a.appendChild(linkText);
        a.id = "Login-href";
        a.href = "/login.html";
        document.body.appendChild(a);
        document.body.append(" ")
        var b = document.createElement('a');
        var linkTextb = document.createTextNode("Register");
        b.appendChild(linkTextb);
        b.id = "Register-href";
        b.href = "/register.html";
        document.body.appendChild(b);
        return
        
       }
       
       var c = document.createElement('button');
       var linkText = document.createTextNode("Logout");
       c.appendChild(linkText);
       c.id = "logout";
       c.href = "/login.html";
       document.body.appendChild(c).addEventListener("click", logout)

        fetch("/list", {
            method: "GET",
            headers: {
                "authorization": "Bearer " + authToken
            }
        })
            .then((response) => response.text())
            .then((page) => {
                document.getElementById("page-content").innerHTML = page
            })
            .catch((e) => {
                console.log("error" + e);
            })
    }
        /*
        .then((response) => response.text())
        .then((page) => {
            document.getElementById("page-content").innerHTML = page;
        })*/

/*
function myFunction(event) {
    event.preventDefault();
    const authToken = localStorage.getItem("auth_token");

    if(!authToken){
        var a = document.createElement('a');
        var linkText = document.createTextNode("Register");
        a.appendChild(linkText);
        a.id = "Register-href";
        a.href = "/register.html";
        document.body.appendChild(a);
    }
    fetch("/users/list", {
        method: "GET",
        headers: {
            "authorization": "Bearer " + authToken
        }
    })
        .then((response) => response.text())
        .then((page) => {
            document.getElementById("content").innerHTML = page;
        })
        .catch((e) => {
            console.log("error" + e);
        })

}
*/


function logout(){
    localStorage.removeItem("auth_token");
    window.location.href = "/";
}
