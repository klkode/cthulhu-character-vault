import './UserAuthForm.scss';
import { useRef, useState } from 'react';
import ButtonLink from '../ButtonLink/ButtonLink';
import axios from "axios";
import { BASE_URL } from '../../constant-variables';
import { useNavigate } from "react-router-dom";
import CancelButton from '../CancelButton/CancelButton';
import { validateUserLogin, validateUserRegistration } from '../../utils/user-validation';

function UserAuthForm({ isSignUp, setIsLoggedIn} ) {
    // Create error state variables
    const [usernameErrMsg, setUsernameErrMsg] = useState("");
    const [passwordErrMsg, setPasswordErrMsg] = useState("");
    const [confirmErrMsg, setConfirmErrMsg] = useState("");
    const [serverErrMsg, setServerErrMsg] = useState("");

    // Create refs for the input fields
    const usernameRef = useRef();
    const passwordRef = useRef();
    const confirmRef = useRef();

    // Create navigate to leave page on successful form submission
    const navigate = useNavigate();

    /**
     * submitHandler is a function that when the form is submitted, then it proceeds to validate the input fields. On a successful validation, it makes a post to the server (registration or login appropriately). If it is successful, a sessionStorage item is created to save the validation token and set the state varaible of being logged in to true. 
     * 
     * @param {Object}      event 
     * 
     */
    function submitHandler(event){
        // Stop page from reloading
        event.preventDefault();

        // Get input field values
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;

        // Complete appropriate actions on whether this is for the RegisterPage or the LoginPage
        // Register Page
        if(isSignUp){
            // Get confirmation field value 
            const confirmPassword = confirmRef.current.value;

            // Validate input
            const errors = validateUserRegistration(username, password, confirmPassword);

            // If no errors, post to the server to register user
            if(!errors.hasErrors){
                const registerUser = async(username, password) => {
                    try{
                        const response = await axios.post(`${BASE_URL}users/register`, 
                            {
                                username: username,
                                password: password
                            }
                        );

                        // set the token in session storage and update the stateVariable for login
                        sessionStorage.setItem("token", response.data.token);
                        setIsLoggedIn(true);
                        
                        //Return to previous page 
                        navigate(-1);

                    }catch(error){
                        console.error(error);
                        // Alert user of the inability to validate them
                        setServerErrMsg(error.response.data.error);
                    }
                }

                registerUser(username, password);

            }else{
                // Set validation errors
                setUsernameErrMsg(errors.usernameErr);
                setPasswordErrMsg(errors.passwordErr);
                setConfirmErrMsg(errors.confirmErr);

            }

        // Login Page
        }else{
            // Validate input
            const errors = validateUserLogin(username, password);

            // If there are no errors then make the log in request
            if(!errors.hasErrors){
                const loginUser = async(username, password) => {
                    try{
                        const response = await axios.post(`${BASE_URL}users/login`, 
                            {
                                username: username,
                                password: password
                            }
                        );

                        // Set the token in session storage and update the state variable for log in
                        sessionStorage.setItem("token", response.data.token);
                        setIsLoggedIn(true);
  
                        // Navigate back to the previous page
                        navigate(-1);

                    }catch(error){
                        console.error(error);
                        // Alert user of the inability to validate them
                        setServerErrMsg(error.response.data.error);
                    }
                }

                loginUser(username, password);

            }else{
                // Set validation errors
                setUsernameErrMsg(errors.usernameErr);
                setPasswordErrMsg(errors.passwordErr);
                setConfirmErrMsg(errors.confirmErr);
            }
        }
    }

    return (
        <form className="userAuthForm" id="userAuthForm" name="userAuthForm" onSubmit={submitHandler}>
            <fieldset className="userAuthForm__fields" form="userAuthForm">
                <div className="userAuthForm__field-container">
                    <label className="userAuthForm__label" htmlFor="username">Username: </label>
                    <div className="userAuthForm__input-container">
                        <input className={!!usernameErrMsg ? "userAuthForm__text-box userAuthForm__text-box--error" : "userAuthForm__text-box"} id="username" name="username" type="text" ref={usernameRef} />
                        {!!usernameErrMsg &&
                        <label className="userAuthForm__error" htmlFor="username">{usernameErrMsg}</label>}
                    </div>
                </div>
                <div className="userAuthForm__field-container">
                    <label className="userAuthForm__label" htmlFor="user-password">Password: </label>
                    <div className="userAuthForm__input-container">
                        <input className={!!passwordErrMsg ? "userAuthForm__text-box userAuthForm__text-box--error" : "userAuthForm__text-box"} id="user-password" name="user-password" type="password"  ref={passwordRef} />
                        {!!passwordErrMsg &&
                        <label className="userAuthForm__error" htmlFor="user-password">{passwordErrMsg}</label>}
                    </div>
                </div>
                {isSignUp &&
                <div className="userAuthForm__field-container">
                    <label className="userAuthForm__label" htmlFor="confirm-password">Confirm Password: </label>
                    <div className="userAuthForm__input-container">
                        <input className={!!confirmErrMsg ? "userAuthForm__text-box userAuthForm__text-box--error" : "userAuthForm__text-box"} id="confirm-password" name="confirm-password" type="password"  ref={confirmRef} />
                        {!!confirmErrMsg && 
                        <label className="userAuthForm__error" htmlFor="confirm-password">{confirmErrMsg}</label>}
                    </div>
                </div>
                }
            </fieldset>
            {!!serverErrMsg && 
            <div className="userAuthForm__server-err-container">
                <p className="userAuthForm__server-error">{serverErrMsg}</p>
            </div>}
            <div className="userAuthForm__btn-container">
                <div className="userAuthForm__nav-container">
                    <CancelButton />
                    {isSignUp 
                    ? <ButtonLink btnText={"Log In"} navTo={"/login"} /> 
                    : <ButtonLink btnText={"Sign Up"} navTo={"/signup"} />
                    }
                </div>
                <button className="userAuthForm__submit-btn">{isSignUp ? "Register" : "Log In"}</button>
            </div>
        </form>
    );
}

export default UserAuthForm;