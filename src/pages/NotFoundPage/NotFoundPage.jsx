import './NotFoundPage.scss';
import logo from "../../assets/logos/cthulhu_logo.png";
import { Link } from 'react-router-dom';

function NotFoundPage() {
    
  return (
    <section className="not-found">
      <h3 className="not-found__heading">404 Error</h3>
      <p className="not-found__message">The webpage you are looking for may have slipped between the space between world. But you can escape. Cthulhu will help you.</p>
      <Link className="not-found__logo-link" to={"/"}>
          <img className="not-found__logo-img" src={logo} alt="cute cthulhu"/>
      </Link>
    </section>
  );
}

export default NotFoundPage;