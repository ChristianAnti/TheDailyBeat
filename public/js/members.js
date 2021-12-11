$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.email);
  });
});

// Quote API Function
function getQuote() {
  fetch("https://type.fit/api/quotes")
      .then(res => {
          return res.json()
      })
      .then(data => {
          // Random quote and Author details from array
          let chosenQuote = data[Math.floor(Math.random() * data.length)]
          let author = ''
          if (chosenQuote.author == null) {
              author = 'anonymous'
          } else {
              author = chosenQuote.author
          }

          quoteContainer.addClass('animate__fadeIn')
          setTimeout(() => {
              quoteContainer.removeClass('animate__fadeIn')
          }, 1000)

          quoteContainer.empty()
          quoteContainer.append(`"${chosenQuote.text}" -${author}`)
      })
}

getQuote()

// Get a new quote on button click
$('#quoteBtn').on('click', getQuote)


// Giphy


function getImage() {
  const apiUrl = `https://api.giphy.com/v1/gifs/random?api_key=Fu6XcAoC6H3jCPbmBhPrxnS0QrGX0TL2&tag=you+can+do+it&rating=g`;
  fetch(apiUrl)
      .then(function (res) {
          return res.json();
      })
      .then(function (response) {
          console.log(response.data.images.original.url);
          document.getElementById("test").src = response.data.images.original.url;
      })
      .catch(function (err) {
          console.error(err);
      });
}
getImage();