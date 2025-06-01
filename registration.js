function validateform() {
    var email = document.forms["RegForm"]["Email"];
    var password = document.forms["RegForm"]["Password"];
    var confirmPassword = document.forms["RegForm"]["Confirm"];

    if (email.value === "") {
        alert("Please enter your email");
        return false;
    }
    if (password.value === "") {
        alert("Please enter your password");
        return false;
    }
    if (confirmPassword.value === "") {
        alert("Please confirm your password");
        return false;
    }
    if (password.value !== confirmPassword.value) {
        alert("Passwords do not match");
        return false;
    }

    if (registerinlocalstorage(email.value, password.value)) {
        alert("Registration done successfully");
        return true;
    } else {
        alert("User already exists");
        return false;
    }
}

function registerinlocalstorage(email, password) {
    let users = JSON.parse(localStorage.getItem("userList")) || [];

    let newuser = {
        email: email,
        password: password
    };

    let userExists = users.some(user => user.email.toLowerCase() === newuser.email.toLowerCase());

    if (userExists) {
        console.log("User already exists");
        return false;
    } else {
        users.push(newuser);
        localStorage.setItem("userList", JSON.stringify(users));
        return true;
    }
}


