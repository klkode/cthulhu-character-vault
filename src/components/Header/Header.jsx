import { useEffect, useState } from 'react';
import ButtonLink from '../ButtonLink/ButtonLink';
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
        <Link className="header__logo-link" to={"/"}>CoC Vault</Link>
        {/* placeholder */}
      </div>
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
            {/* <ButtonLink btnText={"Log Out"} navTo={"/"} onClick={logout} /> */}
          </li>
        </ul>
        }
      </nav>
    </header>
  );
}

export default Header;