import { Link } from 'react-router-dom';
import './ButtonLink.scss';

function ButtonLink({btnText, navTo}) {
    
  return (
    <Link className="buttonLink" to={navTo}>
        <button className="buttonLink__btn">{btnText}</button>
    </Link>
  );
}

export default ButtonLink;