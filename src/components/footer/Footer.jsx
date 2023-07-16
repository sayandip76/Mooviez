import React from "react";
import {
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

import ContentWrapper from "../contentWrapper/ContentWrapper";

import "./style.scss";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <ContentWrapper>
        <ul className="menuItems">
          <li className="menuItem">Terms Of Use</li>
          <li className="menuItem">Privacy-Policy</li>
          <li className="menuItem">About</li>
          <li className="menuItem">Blog</li>
          <li className="menuItem">FAQ</li>
        </ul>
        <div className="infoText">
          This is a movies information website designed and developed by Sayandip Kar.
          You can get information of all kinds of movies and TV shows from old to latest 
          along with their trailers, other official videos, and similar and recommended 
          choices for each movie also, all sorted in an organised manner in terms of 
          different genres, ratings, popularity, trendings and so on. Hope you to enjoy 
          roaming in this website.
        </div>
        <div className="socialIcons">
          <Link to="https://www.linkedin.com/in/sayandip-kar-354428225/" target="_blank">
            <span className="icon">
              <FaLinkedin />
            </span>
          </Link>
          <Link to="https://github.com/sayandip76" target="_blank">
            <span className="icon">
              <FaGithub />
            </span>
          </Link>
          <Link to="https://twitter.com/kar_g2" target="_blank">
            <span className="icon">
              <FaTwitter />
            </span>
          </Link>
          <Link to="https://www.instagram.com/sayandipkar66/" target="_blank">
            <span className="icon">
              <FaInstagram />
            </span>
          </Link>
        </div>
        <h3 className="website-creator">Created by Sayandip Kar</h3>
      </ContentWrapper>
    </footer>
  );
};

export default Footer;
