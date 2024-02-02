const tipForm = document.querySelector('#tip-form');
const bill = document.querySelector('#bill');
const billInputError = document.querySelector('.bill-input-error')
const people = document.querySelector("#people");
const peopleInputError = document.querySelector('.people-input-error')
const buttonsArray = document.querySelectorAll('.btn-js');
const buttonsList = document.getElementsByClassName('btn-js');
const customButton = document.querySelector("#custom-button");
const tipSpan = document.querySelector('#tip');
const totalSpan = document.querySelector('#total');
const resetButton = document.querySelector('#reset-button');

let billValue = 0;
let btnValue = 0;
let customValue = 0;
let peopleValue = 0;
let result = 0;
let tipPerson = 0;
let totalPerson = 0;

// Makes all button elements toggle a background color.
// Only one button can change at a time and when clicked.
// If clicked anywhere else it does not disappear.
buttonsArray.forEach(function (button) {
    button.addEventListener('click', function (event) {
        // Remove 'active' and 'font-color classes from all buttons
        event.preventDefault();
        buttonsArray.forEach(function (btn) {
            btn.classList.remove('active');
            btn.classList.remove('font-color');
            // prevents default behavior
            // for all buttons
            event.preventDefault();
        });

        // Add 'active' and 'font-color' classes to the inititally clicked button
        button.classList.add('active');
        button.classList.add('font-color');
    });
});

// CODE BELOW IS MAIN FUNCTIONALITY OF THE TIP CALCULATOR APP
// IT NEEDS TO BE LAST IN FILE TO WORK PROPERLY

// Function that loops through all buttons and removes styling classes.
function removeButtonStyles() {
    for (let i = 0; i < buttonsList.length; i++) {
        buttonsList[i].classList.remove('active');
        buttonsList[i].classList.remove('font-color');
    }
};

// Funciton that calculates cost times percentage then divides by number of people
// only if all variable have a numerical value higher than 0.
// Found solution below.
// https://stackoverflow.com/questions/68308011/looking-for-a-way-to-calculate-2-of-3-input-fields-in-realtime-using-javascript
function tipCalculator(cost, percent, number) {
    if (cost > 0 && percent > 0 && number > 0) {
        resetButton.classList.remove('tinted');
        tipPerson = (cost * percent) / number;
        tipPerson = tipPerson.toFixed(2);
        totalPerson = ((cost * percent) + cost) / number;
        totalPerson = totalPerson.toFixed(2);
        tipSpan.innerHTML = "$" + tipPerson;
        totalSpan.innerHTML = "$" + totalPerson;
        console.log("Tip amount / person is " + tipPerson);
        console.log("Total / person is " + totalPerson);
        // resets form of styling and numerical values
        resetButton.addEventListener('click', function () {
            removeButtonStyles();
            tipForm.reset();
            resetButton.classList.add('tinted');
            tipSpan.innerHTML = "$" + "0.00";
            totalSpan.innerHTML = "$" + "0.00";
            billValue = 0;
            btnValue = 0;
            customValue = 0;
            peopleValue = 0;
        });
    }
}

// Get numberical value of bill input.
// Also toggles error validation styling for input.
bill.addEventListener('input', function () {
    billValue = parseFloat(bill.value);
    if (billValue > 0) {
        bill.classList.remove('border-error');
        billInputError.style = 'display: none;';
        tipCalculator(billValue, btnValue, peopleValue);
    } else if (billValue <= 0) {
        bill.classList.add('border-error');
        billInputError.style = 'display: initial;';
    }
});

// Get numerical value of button input.
for (let i = 0; i < buttonsList.length; i++) {
    buttonsList[i].addEventListener('click', function (event) {
        event.preventDefault();
        if (buttonsList[i].classList.contains('active')) {
            btnValue = parseFloat(buttonsList[i].value);
            tipCalculator(billValue, btnValue, peopleValue);
        }
    });
}

// Get numberical value of people input.
// Also toggles error validation styling for input.
people.addEventListener('input', function () {
    peopleValue = parseFloat(people.value);
    if (peopleValue > 0) {
        people.classList.remove('border-error');
        peopleInputError.style = 'display: none;';
        tipCalculator(billValue, btnValue, peopleValue);
    } else if (peopleValue <= 0) {
        people.classList.add('border-error');
        peopleInputError.style = 'display: initial;';
    }
});

// Get numerical value of custom input.
customButton.addEventListener('input', function () {
    customValue = parseFloat(customButton.value);
    customValue = (customValue / 100);
    tipCalculator(billValue, customValue, peopleValue);
});

// When custom button is clicked it activates a function that makes all other buttons
// with styling classes gets those classes removed.
// learned to not put () after the name of your own function inside
// the event listener solution found below
// https://stackoverflow.com/questions/70920592/why-does-a-javascript-event-listener-function-need-to-be-wrapped-in-function-tag
customButton.addEventListener('click', removeButtonStyles);