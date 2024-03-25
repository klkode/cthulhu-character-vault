import './UserAuthForm.scss';
import { useRef, useState } from 'react';
import ButtonLink from '../ButtonLink/ButtonLink';

function UserAuthForm({ isSignUp }) {
    const [usernameErrMsg, setUsernameErrMsg] = useState("");
    const [passwordErrMsg, setPasswordErrMsg] = useState("");
    const [confirmErrMsg, setConfirmErrMsg] = useState("");

    const usernameRef = useRef();
    const passwordRef = useRef();
    const confirmRef = useRef();

    function submitHandler(event){
        // Stop page from reloading
        event.preventDefault();

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
                    <ButtonLink btnText={"Cancel"} navTo={"/"} />
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