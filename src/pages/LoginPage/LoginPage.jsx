import './LoginPage.scss';
import UserAuthForm from '../../components/UserAuthForm/UserAuthForm';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function LoginPage( {isLoggedIn, setIsLoggedIn} ) {

  // Make navigate in case need to redirect
  const navigate = useNavigate();

  // Check if the user is already logged in and if so, send them to homepage 
  useEffect(() => {
    if (!!sessionStorage.getItem("token") || isLoggedIn) {
      navigate("/");
    }
  });


  return (
    <section className="log-in">
      <h1 className="log-in__heading">Log In</h1>
      <UserAuthForm isSignUp={false} setIsLoggedIn={setIsLoggedIn} />
    </section>
  );
}

export default LoginPage;