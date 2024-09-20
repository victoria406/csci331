window.addEventListener("DOMContentLoaded", domLoaded);

function domLoaded() {
    // Register a click event for the Convert Units button
    document.getElementById("convertButton").addEventListener("click", convertTemperature);

    // Register input event listeners to clear the other field when one is typed in
    document.getElementById("C_in").addEventListener("input", function() {
        document.getElementById("F_in").value = "";
    });

    document.getElementById("F_in").addEventListener("input", function() {
        document.getElementById("C_in").value = "";
    });
}

// Convert Celsius to Fahrenheit
function convertCtoF(C) {
    return (C * 9 / 5) + 32;
}

// Convert Fahrenheit to Celsius
function convertFtoC(F) {
    return (F - 32) * 5 / 9;
}

// Handle the temperature conversion
function convertTemperature() {
    const celsiusInput = document.getElementById("C_in").value;
    const fahrenheitInput = document.getElementById("F_in").value;
    let temperature;

    // If both fields are empty, show a message and reset the icon
    if (celsiusInput === "" && fahrenheitInput === "") {
        displayMessage("Enter a temperature to convert.");
        displayImage("images/C-F.png");
        return;
    }

    // Convert Celsius to Fahrenheit
    if (celsiusInput !== "") {
        temperature = parseFloat(celsiusInput);
        if (!isNaN(temperature)) {
            const fahrenheit = convertCtoF(temperature).toFixed(2);
            document.getElementById("F_in").value = fahrenheit;
            displayImageBasedOnTemperature(fahrenheit);
        }
    }
    // Convert Fahrenheit to Celsius
    else if (fahrenheitInput !== "") {
        temperature = parseFloat(fahrenheitInput);
        if (!isNaN(temperature)) {
            const celsius = convertFtoC(temperature).toFixed(2);
            document.getElementById("C_in").value = celsius;
            displayImageBasedOnTemperature(fahrenheitInput);
        }
    }
}

// Display the appropriate image based on the Fahrenheit temperature
function displayImageBasedOnTemperature(F) {
    F = parseFloat(F);
    if (F <= 32 && F > -200) {
        displayImage("images/cold.png");
    } else if (F >= 90 && F < 200) {
        displayImage("images/hot.png");
    } else if (F > 32 && F < 90) {
        displayImage("images/cool.png");
    } else if (F >= 200 || F <= -200) {
        displayImage("images/dead.png");
    }
}
// Display a message to the user
function displayMessage(message) {
    const messageElement = document.getElementById("message");
    messageElement.textContent = message;

    // Add some color animation when message changes
    messageElement.style.color = "#007acc"; // Matches the vibrant blue
    setTimeout(() => {
        messageElement.style.color = "#333"; // Transition back to default color
    }, 2000); // Duration of the effect
}

// Smooth change of the weather icon image
function displayImage(imageSrc) {
    const imageElement = document.getElementById("weatherIcon");

    // Add a fade-out effect
    imageElement.style.transition = "opacity 0.5s ease";
    imageElement.style.opacity = 0;

    // Set the new image after the fade-out effect completes
    setTimeout(() => {
        imageElement.src = imageSrc;
        imageElement.style.opacity = 1; // Fade back in
    }, 500);
}
