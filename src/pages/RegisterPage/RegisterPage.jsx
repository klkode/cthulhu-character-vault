import './RegisterPage.scss';
import UserAuthForm from '../../components/UserAuthForm/UserAuthForm';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function RegisterPage( {isLoggedIn, setIsLoggedIn} ) {

  // Make navigate in case need to redirect
  const navigate = useNavigate();

  // Check if the user is already logged in and if so, send them to homepage 
  useEffect(() => {
    if (!!sessionStorage.getItem("token") || isLoggedIn) {
      navigate("/");
    }
  });

  
  return (
    <section className="register">
      <h1 className="register__heading">Sign Up</h1>
      <UserAuthForm isSignUp={true}  setIsLoggedIn={setIsLoggedIn} />
    </section>
  );
}

export default RegisterPage;