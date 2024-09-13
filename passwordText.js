function isStrongPassword(password) {
    //Requirement: password must be longer than 8 characters
    if (password.length < 8) {
        return console.log(badPassword() + " Password must be at least 8 characters long");
    }

    //Requirement: Password cannot contain the word 'password'
    if (password.includes("password")) {
        return console.log(badPassword() + " Password cannot contain the word 'password'");
    }

    //Password cannot contain the sequential numbers '1234'
    if (password.includes("1234")) {
        return console.log(badPassword() + " Password cannot contain the sequential numbers '1234'");
    }

    //Requirement: Password must include a number
    let containsNumber = false;
    for (let i = 0; i < password.length; i++) {
        if (!isNaN(password[i]) && password[i] !== ' ') { // Check if it's a number and not a space
            containsNumber = true;
            break;
        }
    }
    if (!containsNumber) {
        return console.log(badPassword() + " Password must contain at least one number");
    }

    return console.log("Good password!");
}
function badPassword() {
    return "No Good.";
}

isStrongPassword("qwerty1");        // false-too short
isStrongPassword("qwertypassword1"); // false-Password cannot contain the word 'password'
isStrongPassword("qwertyABC");       // false-Password must contain at least one number
isStrongPassword("qwerty123");       // Good password!
