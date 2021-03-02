// Variables declared
// Moment variables, using 24 hr time
var today = moment();
var nowHour = today.format('H')
// Array to color rows based on moment
var descNumbers = [$('.desc1'), $('.desc2'), $('.desc3'), $('.desc4'), $('.desc5'), $('.desc6'), $('.desc7'), $('.desc8'), $('.desc9')]
var saveBtnEl = $('.saveBtn')
// Array with empty values so that the todos can be spliced into it
var todos = ["", "", "", "", "", "", "", "", ""];
var textRead;

// Displays the date at the header
$('#currentDay').text(today.format('dddd, MMM Do, YYYY'))

// Colors the rows based on the time of day using the moment to influence the index number of the array descNumbers
if (nowHour >= 9 && nowHour <= 17) {
    descNumbers[nowHour-9].addClass('present')
    for (i = nowHour - 8; i <= 8; i++) {
        descNumbers[i].addClass('future')
    }
    for (i = nowHour - 10; i >= 0; i--) {
        descNumbers[i].addClass('past')
    }
} else if (nowHour < 9) {
    for (i = 8; i >= 0; i--) {
        descNumbers[i].addClass('future')
    }
} else {
    for (i = 8; i >= 0; i--) {
        descNumbers[i].addClass('past')
    }
}

// When save button is clicked, the content in the textareas are spliced into the array, each index respectively indentifying with a specific row
saveBtnEl.on('click', function () {
    
    for (i = 0; i <=8; i++) {
        textRead = $('.row').siblings().eq(i).children().eq(1).children().first().val();
        todos.splice([i], 1, textRead)
    }
    // Runs storeTodos function
    storeTodos();
});

// Initializer that grabs any items in temporary storage, parses them, sets them as the new array, and places the items in the array into the text areas.
function init () {
    var storedTodos = JSON.parse(localStorage.getItem('todos'))

    if (storedTodos !== null) {
        todos = storedTodos;
    }

    for (i = 0; i <=8; i++) {
        $('.row').siblings().eq(i).children().eq(1).children().first().val(todos[i]);
        
    }
}

// Sets todos array into local storage, translating into JSON string
function storeTodos() {
    localStorage.setItem('todos',JSON.stringify(todos))
    return;
}

init();