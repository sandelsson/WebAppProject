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
    const authToken = localStorage.getItem("auth_token"); //getting the auth_token if user is logged in

    if(!authToken){

        //if the user is not logged in, the create_post and login href's are hidden
        document.getElementById("list").children[4].style.visibility = "hidden"
        //document.getElementById("list").children[4].setAttribute("class", "hide")
        document.getElementById("list").children[5].style.visibility = "hidden"

       
        return
        
       }
    //if the user is logged in -> login-page and register-page are hidden
    profile_email.innerHTML = "Logged in as: " + localStorage.getItem("current_user")
    document.getElementById("list").children[1].style.visibility = "hidden"
    document.getElementById("list").children[2].style.visibility = "hidden"
    console.log(document.getElementById("list").children[5])

    }
    

//when logging out, auth_token and current_user items are removed from the localStorage
function logout(){
    localStorage.removeItem("auth_token");
    localStorage.removeItem("current_user")
    window.location.href = "/";
}
