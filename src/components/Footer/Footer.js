import { Link } from "react-router-dom";
import gitHubLogo from "../../images/github.svg";
import linkdinLogo from "../../images/linkedin.svg";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer__copyright">@ 2024 Supersite, powered by News API</p>
      <div className="footer__right">
        <div className="footer__links">
          <Link to="/" className="footer__link">
            <button className="footer__button footer__text">Home</button>
          </Link>
          <Link to="https://practicum.com" className="footer__link">
            <button className="footer__button footer__text">Practicum</button>
          </Link>
        </div>
        <div className="footer__icons">
          <Link to="http://github.com/maryafzali24" className="footer__link">
            <button className="footer__button footer__github">
              <img
                src={gitHubLogo}
                alt="GIThub logo"
                className="footer__github"
              />
            </button>
          </Link>
          <Link
            to="https://www.linkedin.com/in/maryam-afzal1018/"
            className="footer__link"
          >
            <button className="footer__linkedIn footer__button">
              <img
                src={linkdinLogo}
                className="footer__linkedIn"
                alt="LinkdIn logo"
              />
            </button>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
