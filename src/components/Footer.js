import React from 'react';

const Footer = () => (
  <div className="labs-footer bg-black">
    <a href="?ref=footer">
      <img src="/images/company_juice_logo_v003_210x50_white.svg" height="50" width="210" />
    </a>
    <p className="white">Give Your Company A Boost!</p>
    <p className="white">We are React + WordPress experts.</p>
    <p className="white">
      <a href="https://github.com/companyjuice">GitHub</a>
      &nbsp;-||-&nbsp;
      <a href="https://www.linkedin.com/in/martymcgee">LinkedIn</a>
    </p>
    <small className="white">
      © {new Date().getFullYear()} Company Juice, built with
      {` `}
      <a href="https://www.gatsbyjs.com/">Gatsby</a> +
      {` `}
      <a href="https://wordpress.org/">WordPress</a>
    </small>
  </div>
);

export default Footer;
