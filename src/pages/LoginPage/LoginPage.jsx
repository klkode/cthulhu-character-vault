import ButtonLink from '../../components/ButtonLink/ButtonLink';
import UserAuthForm from '../../components/UserAuthForm/UserAuthForm';
import './LoginPage.scss';

function LoginPage() {

  return (
    <section className="log-in">
      <h1 className="log-in__heading">Log In</h1>
      <UserAuthForm isSignUp={false} />
    </section>
  );
}

export default LoginPage;