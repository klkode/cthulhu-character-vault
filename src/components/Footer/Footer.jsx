import './Footer.scss';
import chaosiumLogo from "../../assets/logos/chaosium_logo.jpg";

function Footer() {
    
    return (
        <footer className="footer">
            <div className="footer__container">
            <p className="footer__disclaimer">Call of Cthulhu is the trademark of Chaosium Inc.</p>
            <a className="footer__link" href="https://www.chaosium.com/" >
                <img className="footer__logo" src={chaosiumLogo} alt="A white dragon on a black field with the text Chaosium Inc. displays as it is their logo." />
            </a>
            </div>
        </footer>
    );
}

export default Footer;