const loginEventHandler = async (event) => {
  event.preventDefault();
  const username = document.querySelector("#input-username").value.trim();
  const password = document.querySelector("#input-password").value.trim();

  if (username && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/members");
    } else {
      alert("Failed to login.");
    }
  }
  if (!username) {
    alert("Please enter a username to login");
  } else if (!password) {
    alert("Please enter a password to login");
  }
};

// need to create the handlebars for this with the class -- login-form --
document.querySelector(".login-form").addEventListener("submit", loginEventHandler);


// ------------------------------------------------------------------------------------------------------------------------------------
// OLD CODE TO REFER IF NEEDED

// $(document).ready(function() {
//   // Getting references to our form and inputs
//   var loginForm = $("form.login");
//   var emailInput = $("input#email-input");
//   var passwordInput = $("input#password-input");

//   // When the form is submitted, we validate there's an email and password entered
//   loginForm.on("submit", function(event) {
//     event.preventDefault();
//     var userData = {
//       email: emailInput.val().trim(),
//       password: passwordInput.val().trim()
//     };

//     if (!userData.email || !userData.password) {
//       return;
//     }

//     // If we have an email and password we run the loginUser function and clear the form
//     loginUser(userData.email, userData.password);
//     emailInput.val("");
//     passwordInput.val("");
//   });

//   // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
//   function loginUser(email, password) {
//     $.post("/api/login", {
//       email: email,
//       password: password
//     })
//       .then(function() {
//         window.location.replace("/members");
//         // If there's an error, log the error
//       })
//       .catch(function(err) {
//         console.log(err);
//       });
//   }
// });
