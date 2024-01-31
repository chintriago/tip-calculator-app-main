// document.addEventListener('DOMContentLoaded', function () {
let billValue = 0;
let btnValue = 0;
let customValue = 0;
let peopleValue = 0;
let result = 0;
let tipPerson = 0;
let totalPerson = 0;

// calculates cost times percentage then divides by number of people
// only if all variable have a numerical value higher than 0
// found solution below
// https://stackoverflow.com/questions/68308011/looking-for-a-way-to-calculate-2-of-3-input-fields-in-realtime-using-javascript
const reset = document.querySelector('#reset');
const tipSpan = document.querySelector('#tip');
const totalSpan = document.querySelector('#total');

function tipCalculator(cost, percent, number) {
    if (cost > 0 && percent > 0 && number > 0) {
        reset.classList.remove('tinted');
        tipPerson = (cost * percent) / number;
        tipPerson = tipPerson.toFixed(2);
        totalPerson = ((cost * percent) + cost) / number;
        totalPerson = totalPerson.toFixed(2);
        tipSpan.innerHTML = "$" + tipPerson;
        totalSpan.innerHTML = "$" + totalPerson;
        console.log("Tip amount / person is " + tipPerson);
        console.log("Total / person is " + totalPerson);
        reset.addEventListener('click', function (event) {
            event.preventDefault();
            reset.classList.add('tinted');
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

// makes all button elements toggle a background color.
// Only one button can change at a time and when clicked.
// If clicked anywhere else it does not disappear.
const buttons = document.querySelectorAll('.btn-js');

buttons.forEach(function (button) {
    button.addEventListener('click', function (event) {
        // Remove 'active' class from all buttons
        event.preventDefault();
        buttons.forEach(function (btn) {
            btn.classList.remove('active');
            event.preventDefault();
        });

        // Add 'active' class to the clicked button
        button.classList.add('active');
    });
});

// get numerical value of bill input
const bill = document.querySelector('#bill');
bill.addEventListener('input', function (event) {
    // event.preventDefault();
    billValue = parseFloat(bill.value);
    // console.log(billValue);
    tipCalculator(billValue, btnValue, peopleValue);
});

// get numerical value of button input
const buttonsList = document.getElementsByClassName('btn-js');
for (let i = 0; i < buttonsList.length; i++) {
    buttonsList[i].addEventListener('click', function (event) {
        event.preventDefault();
        if (buttonsList[i].classList.contains('active')) {
            btnValue = parseFloat(buttonsList[i].value);
            // console.log(btnValue);
            tipCalculator(billValue, btnValue, peopleValue);
        }
    });
}

// get numerical value of custom input
const custom = document.querySelector("#custom");
custom.addEventListener('input', function () {
    customValue = parseFloat(custom.value);
    customValue = (customValue / 100);
    // console.log(customValue);
    tipCalculator(billValue, customValue, peopleValue);
});

// get numberical value of people input
const people = document.querySelector("#people");
people.addEventListener('input', function () {
    peopleValue = parseFloat(people.value);
    // console.log(peopleValue);
    tipCalculator(billValue, btnValue, peopleValue);
});