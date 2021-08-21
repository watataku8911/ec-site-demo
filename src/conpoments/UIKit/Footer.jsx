import React from "react";

const Footer = () => {
  return (
    <footer>
      <ul className="l-footer">
        <a
          className="u-text__link-none"
          href="https://watataku-portfolio.web.app"
          target="_blank"
          rel="noreferrer noopener"
        >
          <li>運営会社</li>
        </a>
        <a
          className="u-text__link-none"
          href="https://watataku-portfolio.web.app/contact#c-box"
          target="_blank"
          rel="noreferrer noopener"
        >
          <li>お問い合わせ</li>
        </a>
        <a className="u-text__link-none">
          <li>Copyright &copy; 2020 Watataku</li>
        </a>
      </ul>
    </footer>
  );
};

export default Footer;
