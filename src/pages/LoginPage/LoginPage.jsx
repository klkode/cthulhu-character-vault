import './LoginPage.scss';
import UserAuthForm from '../../components/UserAuthForm/UserAuthForm';
// import { useGetSession } from "../../hooks/use-get-session.js";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function LoginPage( {isLoggedIn, setIsLoggedIn} ) {

  // Get session
  // const { session } = useGetSession();

  // Make navigate in case need to redirect
  const navigate = useNavigate();

  // Check if the user is already logged in and if so, send them to homepage 
  useEffect(() => {
    if (!!sessionStorage.getItem("token")) {
      navigate("/");
      // TODO notify user they are already logged in
    }
  });


  return (
    <section className="log-in">
      <h1 className="log-in__heading">Log In</h1>
      <UserAuthForm isSignUp={false} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    </section>
  );
}

export default LoginPage;