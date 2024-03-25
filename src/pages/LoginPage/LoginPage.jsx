import ButtonLink from '../../components/ButtonLink/ButtonLink';
import './LoginPage.scss';

function LoginPage() {
    
  return (
    <section className="log-in">
    <h1 className="log-in__heading">Log In</h1>
      
    <div className="log-in__btn-container">
      <ButtonLink btnText={"Cancel"} navTo={"/"} />
      <ButtonLink btnText={"Sign Up"} navTo={"/signup"} />
      <ButtonLink btnText={"Log In"} navTo={"/"} />
    </div>
  </section>
  );
}

export default LoginPage;