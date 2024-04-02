
import logo from "../../assets/logos/cthulhu_logo.png";
import './Header.scss';
import { Link } from 'react-router-dom';

function Header( {isLoggedIn, setIsLoggedIn} ) {

  function logout(){
    sessionStorage.removeItem("token");
    setIsLoggedIn(false);
  }

  return (
    <header className="header">
      <div className="header__logo-container">
        <Link className="header__logo-link" to={"/"}>
          <img className="header__logo-img" src={logo} alt="cute cthulhu"/>
        </Link>
      </div>
      <div className="header__navs-container">
        <nav className="header__site-nav">
          <ul className="header__links-container">
            <li className="header__nav-item">
              <Link className="header__link" to={"/characters"}>My Vault</Link>

            </li>
            <li className="header__nav-item">
              <Link className="header__link" to={"/characters/add"}>New Character</Link>
            </li>
          </ul>
        </nav>
        <nav className="header__user-nav">
          {!isLoggedIn && 
          <ul className="header__links-container">
            <li className="header__nav-item">
              <Link className="header__link" to={"/signup"}>Register</Link>
            </li>
            <li className="header__nav-item">
              <Link className="header__link" to={"/login"}>Login</Link>
            </li>
          </ul>}
          {isLoggedIn &&
          <ul className="header__links-container">
            <li className="header__nav-item">
              <Link className="header__link" to={"/"} onClick={logout}>Log out</Link>
            </li>
          </ul>
          }
        </nav>
      </div>
    </header>
  );
}

export default Header;