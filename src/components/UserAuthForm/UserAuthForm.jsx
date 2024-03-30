import './UserAuthForm.scss';
import { useRef, useState } from 'react';
import ButtonLink from '../ButtonLink/ButtonLink';
import axios from "axios";
import { BASE_URL } from '../../constant-variables';
import { useNavigate } from "react-router-dom";
import CancelButton from '../CancelButton/CancelButton';
// import { AuthContext } from '../../context/auth-context.js';

function UserAuthForm({ isSignUp, isLoggedIn, setIsLoggedIn} ) {
    // Create error state variables
    const [usernameErrMsg, setUsernameErrMsg] = useState("");
    const [passwordErrMsg, setPasswordErrMsg] = useState("");
    const [confirmErrMsg, setConfirmErrMsg] = useState("");

    // Create refs for the input fields
    const usernameRef = useRef();
    const passwordRef = useRef();
    const confirmRef = useRef();

    // Create navigate to leave page on successful form submission
    const navigate = useNavigate();

    // Used for creating session
    // const { session, setSession } = useContext(AuthContext);

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

            // TODO validation
            if(true){
                const registerUser = async(username, password) => {
                    try{
                        const response = await axios.post(`${BASE_URL}users/register`, 
                            {
                                username: username,
                                password: password
                            }
                        );
                        console.log(response.data);
                        // set the token in session storage
                        sessionStorage.setItem("token", response.data.token);
                        setIsLoggedIn(true);
                        // mark that a session exists
                        // setSession({token: response.data.token});
                        // navigate back to the previous page
                        navigate(-1);

                    }catch(error){
                        console.error(error);
                        // TODO alert user of the inability to validate them
                    }
                }

                registerUser(username, password);

            }else{
                // TODO set validation errors
            }

        // Login Page
        }else{
            // TODO validation
            if(true){
                const loginUser = async(username, password) => {
                    try{
                        const response = await axios.post(`${BASE_URL}users/login`, 
                            {
                                username: username,
                                password: password
                            }
                        );
                        console.log(response.data);
                        // set the token in session storage
                        sessionStorage.setItem("token", response.data.token);
                        setIsLoggedIn(true);
                        // mark that a session exists
                        // setSession({token: response.data.token});
                        // navigate back to the previous page
                        navigate(-1);

                    }catch(error){
                        console.error(error);
                        // TODO alert user of the inability to validate them
                    }
                }

                loginUser(username, password);

            }else{
                // TODO set validation errors
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
            <div className="userAuthForm__btn-container">
                <div className="userAuthForm__nav-container">
                    {/* <ButtonLink btnText={"Cancel"} navTo={"/"} /> */}
                    <CancelButton />
                    {isSignUp ? 
                        <ButtonLink btnText={"Log In"} navTo={"/login"} /> : 
                        <ButtonLink btnText={"Sign Up"} navTo={"/signup"} />
                    }
                </div>
                <button className="userAuthForm__submit-btn">{isSignUp ? "Register" : "Log In"}</button>
            </div>
        </form>
    );
}

export default UserAuthForm;