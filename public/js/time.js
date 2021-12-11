//displays current time on planner app page
function displayTime() {
    var now = moment().format('MMMM Do YYYY, h:mm a');
    // console.log(now);
    $('#current-time').html(now);

    setTimeout(displayTime, 1000)
}

$(document).ready(function() {
    displayTime();
});