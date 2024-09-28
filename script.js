let userInput = document.getElementById("birth-date");
userInput.max = new Date().toISOString().split("T")[0];
let resultAge = document.getElementById("resultAge");

// Function to calculate age
function calculateAge() {
    // Validate input
    if (!userInput.value) {
        displayMessage("Please enter your date of birth.");
        return; // Exit the function if validation fails
    }

    let birthDate = new Date(userInput.value);

    // Check if the date is valid
    if (isNaN(birthDate.getTime())) {
        displayMessage("Please enter a valid date.");
        return; // Exit the function if validation fails
    }

    // Check if the date is in the future
    let today = new Date();
    if (birthDate > today) {
        displayMessage("Date of birth cannot be in the future.");
        return; // Exit the function if validation fails
    }

    // Calculate age
    let age = getAge(birthDate, today);
    resultAge.innerHTML = `You are <span>${age.years}</span> years, <span>${age.months}</span> months, and <span>${age.days}</span> days old`;
}

// Function to display error/success messages
function displayMessage(message) {
    resultAge.innerHTML = message;
    resultAge.style.opacity = 1; // Show message
}

// Function to get age components
function getAge(birthDate, today) {
    let d1 = birthDate.getDate();
    let m1 = birthDate.getMonth() + 1; // Months are zero-based
    let y1 = birthDate.getFullYear();

    let d2 = today.getDate();
    let m2 = today.getMonth() + 1;
    let y2 = today.getFullYear();

    let d3, m3, y3;

    y3 = y2 - y1;

    if (m2 >= m1) {
        m3 = m2 - m1;
    } else {
        y3--;
        m3 = 12 + m2 - m1;
    }

    if (d2 >= d1) {
        d3 = d2 - d1;
    } else {
        m3--;
        d3 = getDaysInMonth(y1, m1) + d2 - d1;
    }

    if (m3 < 0) {
        m3 = 11;
        y3--;
    }

    return { years: y3, months: m3, days: d3 };
}

// Clear input and result
function clearInput() {
    userInput.value = ""; // Clear the input field
    resultAge.innerHTML = ""; // Clear the result display
}

// Function to go back (clear input one character at a time)
function goBack() {
    // Get the current input value
    let currentValue = userInput.value;
    // Remove the last character if there's any
    if (currentValue.length > 0) {
        userInput.value = currentValue.slice(0, -1);
    }
    // Clear result display if input is empty
    if (userInput.value.length === 0) {
        resultAge.innerHTML = "";
    }
}

// Function to get the number of days in a month
function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
}

// Add event listener for "Enter" key press
userInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        calculateAge(); // Call the calculateAge function when "Enter" is pressed
    }
});
