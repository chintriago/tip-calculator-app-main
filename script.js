const tipForm = document.querySelector('#tip-form');
const bill = document.querySelector('#bill');
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

// makes all button elements toggle a background color.
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

function removeButtonStyles() {
    for (let i = 0; i < buttonsList.length; i++) {
        buttonsList[i].classList.remove('active');
        buttonsList[i].classList.remove('font-color');
    }
};

// when custom button is clicked all other buttons active styling gets removed
// learned to not put () after the name of your own function inside
// the event listener solution found below
// https://stackoverflow.com/questions/70920592/why-does-a-javascript-event-listener-function-need-to-be-wrapped-in-function-tag
customButton.addEventListener('click', removeButtonStyles);

// when reset button is clicked form is reset
resetButton.addEventListener('click', function () {
    removeButtonStyles();
    tipForm.reset();
});

// CODE BELOW IS MAIN FUNCTIONALITY OF THE TIP CALCULATOR APP
// IT NEEDS TO BE LAST IN FILE TO WORK PROPERLY

// calculates cost times percentage then divides by number of people
// only if all variable have a numerical value higher than 0
// found solution below
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
        resetButton.addEventListener('click', function (event) {
            event.preventDefault();
            resetButton.classList.add('tinted');
            tipSpan.innerHTML = "$" + "0.00";
            totalSpan.innerHTML = "$" + "0.00";
            cost.value = 0;
            percent.value = 0;
            number.value = 0;
            // working here last.
            // possible solution is to make reset button
            // an input with type reset
        });
    }
}

// get numerical value of bill input

bill.addEventListener('input', function () {
    billValue = parseFloat(bill.value);
    tipCalculator(billValue, btnValue, peopleValue);
});

// get numerical value of button input

for (let i = 0; i < buttonsList.length; i++) {
    buttonsList[i].addEventListener('click', function (event) {
        event.preventDefault();
        if (buttonsList[i].classList.contains('active')) {
            btnValue = parseFloat(buttonsList[i].value);
            tipCalculator(billValue, btnValue, peopleValue);
        }
    });
}

// get numberical value of people input
const people = document.querySelector("#people");
people.addEventListener('input', function () {
    peopleValue = parseFloat(people.value);
    tipCalculator(billValue, btnValue, peopleValue);
});

// get numerical value of custom input

customButton.addEventListener('input', function () {
    customValue = parseFloat(customButton.value);
    customValue = (customValue / 100);
    tipCalculator(billValue, customValue, peopleValue);
});