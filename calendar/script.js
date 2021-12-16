// States
// variable that tracks month 
let monthNav = 0;

// variable that tracks clicks
let clickedDay = null;

// variable for an array of event objects that pulls from local storage
let calEvents = localStorage.getItem('calEvents') ? JSON.parse(localStorage.getItem('calEvents')) : [];

// variable stores ID element that accesses the calendar
const calApp = document.getElementById('calApp');
const newEventInput = document.getElementById('newEventInput');
const deleteEventInput = document.getElementById('deleteEventInput');
const backDropShadow = document.getElementById('backDropShadow');
const eventTextInput = document.getElementById('eventTextInput');

// An array of days of the week. The variable will  
// be used to determine the number of padding days
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// functions that opens input modal for each day clicked that passes through date
function showInputBox(date) {
  clickedDay = date;

  // Finds an already existing saved event
  const clickedDayEvents = calEvents.find(e => e.date === clickedDay);

  // A conditional for deleting events and new events
  if (clickedDayEvents) {
    document.getElementById('eventText').innerText = clickedDayEvents.title;
    deleteEventInput.style.display = 'block';
  } 
  else {newEventInput.style.display = 'block';}
  // Displays modal box backdrop shadow
  backDropShadow.style.display = 'block';
}
// A function displays calendar on the page. 
// The function can be used in other functions for ease of use
function displayCalendar() {
  // Date() constructor
  // The date opject gets info about the calendar to display it
  const newDate = new Date();

  // tracks the navigation of month relative to the index value of the first month in the array
  // December is [-1], Janurary is [0], Feburary is [1]
  if (monthNav !== 0) {
    newDate.setMonth(new Date().getMonth() + monthNav);
  }

  // Method that return the day, month, and year 
  // of the specified date according to local time
  const day = newDate.getDate(); 
  const month = newDate.getMonth();
  const year = newDate.getFullYear();
  // console.log(day, month, year);

  // Uses the first day of the month to create a date object to create padding days
  const firstDayMonth = new Date(year, month, 1);

  // Months are indexed, the 1st month starts at [0] 
  // To print out month you need to use (month + 1)
  // The 3rd argument in the constructor is day
  // The 1st day of the month starts with 1. 
  // Zero means the last day of the previous month
  // This gives the number of days in a month to render on the page
  const numDaysMonth = new Date(year, month + 1, 0).getDate();
  
  // The toLocaleDateString() method returns the date of a 
  // date object as a string, using locale conventions
  const stringDate = firstDayMonth.toLocaleDateString('en-us',
    // options: weekday, year, month, day 
    {weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric',} 
  );

  // The indexOf() method returns the position of 
  // the first occurrence of a specified value in a string
  const numPaddDays = daysOfWeek.indexOf(stringDate.split(', ')[0]);

  // Disaplys month and year
  document.getElementById('displayMonth').innerText = 
    `${newDate.toLocaleDateString('en-us', { month: 'long' })} ${year}`;
    
    
    // To prevent the rendering of an additional calendar squares
    // innerHTML = ''; wipes it out
    calApp.innerHTML = '';

  // Renders empty squares(padding days) and days of the month squares on the calendar   
  for(let i = 1; i <= numPaddDays + numDaysMonth; i++) {
    // Creates div elements for the days of the month squares
    const squareDay = document.createElement('div');
    // adds a day class to squareDay div element
    squareDay.classList.add('day');

    const stringDays = `${month + 1}/${i - numPaddDays}/${year}`;

    // Logic for rendering padding days or day squares
    if (i > numPaddDays) {
      // renders the number on the day square
      squareDay.innerText = i - numPaddDays;
      const dayEvents = calEvents.find(e => e.date === stringDays);
      
      // highlights the current day for the current month
      if (i - numPaddDays === day && monthNav === 0) { 
        squareDay.id = 'monthsCurrentDay';
      }
      
      // creates a div, adds an events class, sets input text in the squares of the day
      if (dayEvents) {
        const eventDiv = document.createElement('div');
        eventDiv.classList.add('event');
        eventDiv.innerText = dayEvents.title;
        squareDay.appendChild(eventDiv);
      }
      // Listens for click on the day squares and runs function 
      // that passes month, day, and year as a string
      squareDay.addEventListener('click', () => showInputBox(stringDays));
    } 
    // renders padding days
    else {squareDay.classList.add('padding');}

    //Renders calendar squares with day number
    calApp.appendChild(squareDay);    
  }
}

// Function for closing the input modals
function closeInputBox() {
  //removes error class
  eventTextInput.classList.remove('error');
  newEventInput.style.display = 'none';
  deleteEventInput.style.display = 'none';
  backDropShadow.style.display = 'none';
  eventTextInput.value = '';
  clickedDay = null;
  displayCalendar();
}

//Get the value of the text input and saves it
function saveClickedEvent() {
  if (eventTextInput.value) {
    // if error exist this removes the error class
    eventTextInput.classList.remove('error');
    // pushes calEvents to the array of events
    calEvents.push({
      date: clickedDay,
      title: eventTextInput.value,
    });
    // restores event to local storage
    // To store object in local storage it has to be stringified first
    localStorage.setItem('calEvents', JSON.stringify(calEvents));
    // closes modal after event is saved to local storage
    closeInputBox();
  } 
  // if error doesn't exist error class is added
  else {eventTextInput.classList.add('error');}
}

// A fuction that filters the event that will be deleted 
function deleteInput() {
  // filters out where date is equal clickedDay, whcich deletes it from the array
  calEvents = calEvents.filter(e => e.date !== clickedDay);
  // this reset the event to local storage after converting it to a json string
  localStorage.setItem('calEvents', JSON.stringify(calEvents));
  closeInputBox();
}

// Renders various buttons
function initiateBtns() {
  // Helps increment to the next month when the next button is clicked 
  document.getElementById('nextBtn').addEventListener('click', () => {
    monthNav++;
    displayCalendar();
  });
  // Helps decrement to the previous month when the back  button is clicked
  document.getElementById('backBtn').addEventListener('click', () => {
    monthNav--;
    displayCalendar();
  });

  // listens to the clicks in the modal buttons 
  document.getElementById('saveButton').addEventListener('click', saveClickedEvent);
  document.getElementById('cancelButton').addEventListener('click', closeInputBox);
  document.getElementById('deleteButton').addEventListener('click', deleteInput);
  document.getElementById('closeButton').addEventListener('click', closeInputBox);
}
// Calls functions and loads them on the page
initiateBtns();
displayCalendar();