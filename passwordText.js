function isStrongPassword(password) {
    if (password.length < 8) {
        console.log(badPassword() + " Password must be at least 8 characters long");
        return false; // Exit the function if this condition is not met
    }

    if (password.includes("password")) {
        console.log(badPassword() + " Password cannot contain the word 'password'");
        return false;
    }

    if (password.includes("1234")) {
        console.log(badPassword() + " Password cannot contain the sequential numbers '1234'");
        return false;
    }

    if (!/\d/.test(password)) { // \d is a regular expression that matches digits
        console.log(badPassword() + " Password must contain at least one number");
        return false;
    }

    console.log("Good password!");
    return true;
}

function badPassword() {
    return "No Good.";
}


isStrongPassword("qwerty1"); // false - Too short
isStrongPassword("qwertypassword1"); // false - Contains "password"
isStrongPassword("qwertyABC"); // false - No numbers
isStrongPassword("qwerty123"); // true
