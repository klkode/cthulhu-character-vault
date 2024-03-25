import ButtonLink from '../../components/ButtonLink/ButtonLink';
import UserAuthForm from '../../components/UserAuthForm/UserAuthForm';
import './RegisterPage.scss';

function RegisterPage() {

  return (
    <section className="register">
      <h1 className="register__heading">Sign Up</h1>
      <UserAuthForm isSignUp={true} />
    </section>
  );
}

export default RegisterPage;