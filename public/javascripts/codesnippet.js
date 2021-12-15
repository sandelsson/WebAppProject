if (document.readyState !== "loading") {
    initializeCode();
  } else {
    document.addEventListener("DOMContentLoaded", function () {
      initializeCode();
    });
  }
  
  function initializeCode() {
    document.getElementById("comment-form").addEventListener("submit", onSubmit);
}


window.onload = (event) =>{
    event.preventDefault();
    const authToken = localStorage.getItem("auth_token");

    //setting a hidden form element value to get the data to the backend and store it to the database
    document.getElementById("current_user").setAttribute("value", localStorage.getItem("current_user"))
    

    //if the user is not logged in the comment-form is not visible and therefore only the comments and the original snippet are visible
    if(!authToken){
      document.getElementById("comment_form_div").style.visibility="hidden"


      //return;
    }
    
    //fetching comments and using the snippet id as param to get the correct comments
    fetch("/comments/"+ document.getElementById("snippet_id").textContent,{
      method: "GET",
  })
      .then((response) => response.text())
      .then((page) => {
          document.getElementById("comments").innerHTML = page
      })
      .catch((e) => {
          console.log("error" + e);
      })
    
  }



function onSubmit(event) {
  console.log("onsubmit")
  event.preventDefault();
  const formData = new FormData(event.target);
  //when the comment is submitted the page reloads and the comment is visible immediately. Again using the hidden element for the redirect
  window.location.href="/posts/" + document.getElementById("snippet_id").textContent 

    fetch("/posts/" + document.getElementById("snippet_id").textContent, {
        method: "POST",
        body: formData
    })
        .then((response) => response.json())
    //window.alert("Comment created successfully!")
    window.location.href="/posts/" + document.getElementById("snippet_id").textContent; 
}
