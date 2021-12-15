if (document.readyState !== "loading") {
    initializeCodeLogin();
  } else {
    document.addEventListener("DOMContentLoaded", function () {
      initializeCodeLogin();
    });
  }
  
  function initializeCodeLogin() {
    document.getElementById("post-form").addEventListener("submit", onSubmit);
    document.getElementById("current_user").setAttribute("value", localStorage.getItem("current_user"))
}

function onSubmit(event) {
    event.preventDefault();
    const authToken = localStorage.getItem("auth_token");
    const formData = new FormData(event.target);
    //console.log(localStorage.getItem("current_user"))


    //if the user is not logged in the post is not handled
    if(!authToken){
      return
    }

    
    fetch("/post.html", {
        method: "POST",
        headers: {
          "authorization": "Bearer " + authToken
      },
        body: formData
    })
        .then((response) => response.json())
        
    window.location.href="/";
    alert("Post created successfully!")

}
