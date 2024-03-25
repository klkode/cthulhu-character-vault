import './HomePage.scss';
import { Link } from "react-router-dom";

function HomePage() {
    
  return (
    <section className="homepage">
      <h1 className="homepage__heading">Call of Cthulhu Character Vault</h1>
      <article className="homepage__container">
        <p className="homepage__about-us">Welcome to the Call of Cthulhu Character Vault! This is a helpful tool for CoC 7e players looking for a place to digitally store their character ideas. Users that sign up create a personal vault where they can create and save their character sheets. If you haven't already signed up, please do so. If you have an account, log in and continue to your vault or straight to character creation.</p>
      </article>
      <div className="homepage__btn-container">
        <Link className="homepage__link" to="/characters">
          <button className="homepage__btn">My Vault</button>
        </Link>
        <Link className="homepage__link" to="/characters/add">
          <button className="homepage__btn">Create Character</button>
        </Link>
      </div>
    </section>
  );
}

export default HomePage;