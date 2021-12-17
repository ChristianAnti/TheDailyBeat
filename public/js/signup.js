const signupEventHandler = async (event) => {
  event.preventDefault();
  const username = document.querySelector("#username").value.trim();
  const password = document.querySelector("#password").value.trim();

  if (username && password) {
    const response = await fetch("/api/user/signup", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    console.log(response);
    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to sign up.");
    }
  }
  if (!username) {
    alert("Please enter a username to sign up");
  } else if (!password) {
    alert("Please enter a password to sign up");
  }
};

// need to create the handlebars for this with the class -- signup-form --
document.querySelector("#signup-form").addEventListener("submit", signupEventHandler);


// ---------------------------------------------------------------------------------------------------------------------------
// OLD CODE TO REFER IF NEEDED

// $(document).ready(function() {
//   // Getting references to our form and input
//   var signUpForm = $("form.signup");
//   var emailInput = $("input#email-input");
//   var passwordInput = $("input#password-input");

//   // When the signup button is clicked, we validate the email and password are not blank
//   signUpForm.on("submit", function(event) {
//     event.preventDefault();
//     var userData = {
//       email: emailInput.val().trim(),
//       password: passwordInput.val().trim()
//     };

//     if (!userData.email || !userData.password) {
//       return;
//     }
//     // If we have an email and password, run the signUpUser function
//     signUpUser(userData.email, userData.password);
//     emailInput.val("");
//     passwordInput.val("");
//   });

//   // Does a post to the signup route. If successful, we are redirected to the members page
//   // Otherwise we log any errors
//   function signUpUser(email, password) {
//     $.post("/api/signup", {
//       email: email,
//       password: password
//     })
//       .then(function(data) {
//         window.location.replace("/members");
//         // If there's an error, handle it by throwing up a bootstrap alert
//       })
//       .catch(handleLoginErr);
//   }

//   function handleLoginErr(err) {
//     $("#alert .msg").text(err.responseJSON);
//     $("#alert").fadeIn(500);
//   }
// });
