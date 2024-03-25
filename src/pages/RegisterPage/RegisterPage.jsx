import ButtonLink from '../../components/ButtonLink/ButtonLink';
import './RegisterPage.scss';

function RegisterPage() {
    
  return (
    <section className="register">
      <h1 className="register__heading">Sign Up</h1>
        
      <div className="register__btn-container">
        <ButtonLink btnText={"Cancel"} navTo={"/"} />
        <ButtonLink btnText={"Register"} navTo={"/"} />
      </div>
    </section>
  );
}

export default RegisterPage;