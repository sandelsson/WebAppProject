if (document.readyState !== "loading") {
    initializeCodeLogin();
  } else {
    document.addEventListener("DOMContentLoaded", function () {
      initializeCodeLogin();
    });
  }
  
  function initializeCodeLogin() {
    document.getElementById("register-form").addEventListener("submit", onSubmit);
}

function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    fetch("/register.html", {
        method: "POST",
        body: formData
    })
        .then((response) => response.json())
    
        window.location.href="/login.html";
    

}

