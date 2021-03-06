// console.log("Connected");
showNotes();

// front end part of the adding notes 
// const newFormHandler = async (event) => {
//   event.preventDefault();
//   // add #notes-name, #notes-desc to the frontend // the querySelector for the adding notes .new-notes-form, .notes-list

//   const name = document.querySelector('#notes-name').value.trim();
//   const description = document.querySelector('#notes-desc').value.trim();

//   if (name && description) {
//     const response = await fetch(`/api/notes`, {
//       method: 'POST',
//       body: JSON.stringify({ name, description }),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     if (response.ok) {
//       document.location.replace('/members');
//     } else {
//       alert('Failed to create notes');
//     }
//   }
// };



// If user adds a note, add it to the localStorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  // let addTitle = document.getElementById("addTitle");
  const noteTitle = document.querySelector("#note-title").value.trim();
  const description = document.querySelector("#description").value.trim();

  if (noteTitle && description) {
    const response = await fetch("/api/notes", {
      method: "POST",
      body: JSON.stringify({ name:noteTitle, description:description }),
      headers: { "Content-Type": "application/json" },
    });
    console.log(response);
    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to enter note you dummy.");
    }
  }
  // let notes = localStorage.getItem("notes"); // get
  // if (notes == null) {
  //   notesObj = [];
  // } else {
  //   notesObj = JSON.parse(notes);
  // }
  // addTitle.value = "";
  // addTxt.value = "";
  // console.log(notesObj);
 // get // handlebars can get // redirect or reload 
});

// Function to show elements from localStorage
function showNotes() {
  // let notes = localStorage.getItem("notes");
  // if (notes == null) {
  //   notesObj = [];
  // } else {
  //   notesObj = JSON.parse(notes);
  // }
  // let html = "";
  // notesObj.forEach(function(element, index) {
  //   html += `
  //       <li class="list-group-item">
  //           <h5 class="card-title">Note ${index + 1}</h5>
  //           <p class="card-text"> ${element}</p>
  //           <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
  //       </li>`;
  // });
  // let notesElm = document.getElementById("notes");
  // if (notesObj.length != 0) {
  //   notesElm.innerHTML = html;
  // } else {
  //   notesElm.innerHTML = `Nothing to show! Use "Save Note" section to add notes.`;
  // }
}

// Function to delete a note
function deleteNote(index) {
  //   console.log("I am deleting", index);

  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

/*
To do:
1. Add Title
2. Separate notes by user
*/

// console.log("JS connected!");
// Display Time Function
function displayTime() {
  var now = moment().format('MMMM Do YYYY, h:mm a');
  // console.log(now);
  $('#current-time').html(now);

  setTimeout(displayTime, 1000)
}

$(document).ready(function () {
  displayTime();
});

var quoteContainer = $('#quote-container')

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

// Weather app

const api = 'b3b0555434c7311da020e0bb1ca35763'; //Replace with your API

const iconImg = document.getElementById('weather-icon');
const loc = document.querySelector('#location');
const tempC = document.querySelector('.c');
const tempF = document.querySelector('.f');
const desc = document.querySelector('.desc');
const sunriseDOM = document.querySelector('.sunrise');
const sunsetDOM = document.querySelector('.sunset');

window.addEventListener('load', () => {
  let long;
  let lat;
  // Accesing Geolocation of User
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      // Storing Longitude and Latitude in variables
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api}&units=metric`;
      console.log(base)

      // Using fetch to get data
      fetch(base)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const { temp, feels_like } = data.main;
          const place = data.name;
          const { description, icon } = data.weather[0];
          const { sunrise, sunset } = data.sys;

          const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
          const fahrenheit = (temp * 9) / 5 + 32;

          // Converting Epoch(Unix) time to GMT
          const sunriseGMT = new Date(sunrise * 1000);
          const sunsetGMT = new Date(sunset * 1000);

          // Interacting with DOM to show data
          iconImg.src = iconUrl;
          loc.textContent = `${place}`;
          desc.textContent = `${description}`;
          tempC.textContent = `${temp.toFixed(2)} ??C`;
          tempF.textContent = `${fahrenheit.toFixed(2)} ??F`;
          sunriseDOM.textContent = `${sunriseGMT.toLocaleDateString()}, ${sunriseGMT.toLocaleTimeString()}`;
          sunsetDOM.textContent = `${sunsetGMT.toLocaleDateString()}, ${sunsetGMT.toLocaleTimeString()}`;
        });
    });
  }
});

// the querySelector for the adding notes .new-notes-form, .notes-list
// document
//   .querySelector('.new-notes-form')
//   .addEventListener('submit', newFormHandler);

// document
//   .querySelector('.notes-list')
//   .addEventListener('click', delButtonHandler);
