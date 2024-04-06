import { Link } from "react-router-dom";
import gitHubLogo from "../../images/github.svg";
import linkdinLogo from "../../images/linkedin.svg";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer__copyright">@ 2024 Supersite, powered by News API</p>
      <nav className="footer__links">
        <Link to="/" className="footer__link" id="home">
          <p className="footer__home">Home</p>
        </Link>
        <Link
          to="https://practicum.com"
          className="footer__link"
          target="_blank"
          id="tripleten"
        >
          <p className="footer__tripleten">Practicum</p>
        </Link>
        <Link
          to="http://github.com/maryafzali24"
          className="footer__link"
          target="_blank"
          id="github"
        >
          <p className="footer__github">
            <img
              src={gitHubLogo}
              alt="GIThub logo"
              className="footer__github"
            />
          </p>
        </Link>
        <Link
          to="https://www.linkedin.com/in/maryam-afzal1018/"
          className="footer__link"
          target="_blank"
          id="linkedIn"
        >
          <p className="footer__linkedIn footer__button">
            {/* <img
              src={linkdinLogo}
              className="footer__linkedIn"
              alt="LinkedIn logo"
            /> */}
          </p>
        </Link>
      </nav>
    </footer>
  );
};

export default Footer;
