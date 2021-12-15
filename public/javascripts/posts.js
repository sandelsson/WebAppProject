if (document.readyState !== "loading") {
    initializeCode();
  } else {
    document.addEventListener("DOMContentLoaded", function () {
      initializeCode();
    });
  }
  
  function initializeCode() {
    //const page_div = document.getElementById("posts-href").addEventListener("onload", myFunction);
}


window.onload = (event) =>{
    event.preventDefault();
    const authToken = localStorage.getItem("auth_token");
    if(!authToken){        
        
        fetch("/snippets", {
            method: "GET",
            headers: {
                "authorization": "Bearer " + authToken
            }
        })
            .then((response) => response.text())
            .then((page) => {
                document.getElementById("list-content").innerHTML = page
            })
            .catch((e) => {
                console.log("error" + e);
            })
          
        return
           
        }

        
        fetch("/snippets", {
            method: "GET"
        })
            .then((response) => response.text())
            .then((page) => {
                document.getElementById("list-content").innerHTML = page
            })
            .catch((e) => {
                console.log("error" + e);
            })
        
           
       }

