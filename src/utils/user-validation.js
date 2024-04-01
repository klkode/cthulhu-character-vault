import { LARGE_CHAR_MAX } from "../constant-variables";

/**
 * validateUserRegistration is a function that checks if the inputs for registering a new user are valid for posting to the server.
 * 
 * @param {string}      username 
 * @param {string}      password 
 * @param {string}      confirm
 * 
 * @returns {Object}
 */
export function validateUserRegistration(username, password, confirm){
    const errorMessages = {
        hasErrors: false,
        usernameErr: "",
        passwordErr: "",
        confirmErr: ""
    }

    errorMessages.usernameErr = checkUsername(username);
    errorMessages.passwordErr = checkPassword(password);
    errorMessages.confirmErr = confirmPassword(password, confirm);

    if(!!errorMessages.usernameErr || !!errorMessages.passwordErr || !!errorMessages.confirmErr){
        errorMessages.hasErrors = true;
    }

    return errorMessages;
}

/**
 * validateUserLogin is a function that checks if the inputs for a user logging in are valid for posting to the server.
 * 
 * @param {string}      username 
 * @param {string}      password
 * 
 * @returns {Object}
 */
export function validateUserLogin(username, password){
    const errorMessages = {
        hasErrors: false,
        usernameErr: "",
        passwordErr: "",
    }

    errorMessages.usernameErr = checkUsername(username);
    errorMessages.passwordErr = checkPassword(password);

    if(!!errorMessages.usernameErr || !!errorMessages.passwordErr){
        errorMessages.hasErrors = true;
    }

    return errorMessages;
}

/**
 * checkUsername is a helper function that performs various checks to ensure that the username is acceptable for posting to the server.
 * 
 * @param {string}      username 
 * 
 * @returns {string}
 */
function checkUsername(username){
    if(!username){
        return "Missing required field";

    }else if(username.length < 4){
        return "Username should be at least 4 characters";

    }else if(username.length > LARGE_CHAR_MAX){
        return "Username exceeds character limit";

    }else if(hasNoAlphaChar(username)){
        return "Username has no alphabet characterts";

    }else{
        return "";

    }
}

/**
 * checkPassword is a helper function that performs various checks to ensure that the password is acceptable for posting to the server.
 * 
 * @param {string}      password 
 * 
 * @returns {string}
 */
function checkPassword(password){
    if(!password){
        return "Missing required field";

    }else if(password.length < 8){
        return "Password should be at least 8 characters";

    }else if(password.length > LARGE_CHAR_MAX){
        return "Password exceeds character limit";

    }else if(hasNoAlphaChar(password)){
        return "Password has no alphabet characterts";

    }else{
        return "";
        
    }

    // TODO (later sprint): stronger password requirements?
}

/**
 * confirmPassword is a helper function that performs various checks to ensure that the password confirmation has been completed properly.
 * 
 * @param {string}      password 
 * @param {string}      confirm
 * 
 * @returns {string}
 */
function confirmPassword(password, confirm){
    if(!confirm){
        return "Please confirm your password";

    }else if(password !== confirm){
        return "Passwords do not match";

    }else{
        return "";
    }
}

/**
 * hasNoAlphaChar is a function that returns true if the text contains no alphabet letter characters and false otherwise.
 * 
 * @param {string}      text 
 * 
 * @returns {boolean}
 */
function hasNoAlphaChar(text){
    return !(text.match("[a-zA-z]+"));
}