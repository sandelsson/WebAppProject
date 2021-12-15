if (document.readyState !== "loading") {
    initializeCodeLogin();
  } else {
    document.addEventListener("DOMContentLoaded", function () {
      initializeCodeLogin();
    });
  }
  
  function initializeCodeLogin() {
    document.getElementById("login-form").addEventListener("submit", onSubmit);
}

function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    fetch("/login.html", {
        method: "POST",
        body: formData
    })
        .then((response) => response.json())
        .then((data) => {
            if(data.token) {
                storeToken(data.token);
                window.location.href="/";
            } else {
                if (data.message) {
                    document.getElementById("error").innerHTML = data.message;
                }  else {
                    document.getElementById("error").innerHTML = "error!";
                }
            }

        })

}

//if login is successfull, auth_token and current_user items are added to the localStorage.
function storeToken(token) {
    localStorage.setItem("auth_token", token);
    localStorage.setItem("current_user", document.getElementById("email").value)
}
