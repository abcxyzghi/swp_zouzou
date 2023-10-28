import React from 'react';
import { FaFacebook, FaGithub, FaEnvelope } from 'react-icons/fa';


const SocialIcons = () => {
  return (
    <div className="social-icons">
      <div className="social-icon">
        <a href="https://www.facebook.com/kanatsumi2003">
          <FaFacebook size={32} className="white-icon" />
        </a>
        <span className="icon-text"></span>
      </div>
      <div className="social-icon">
        <a href="https://github.com/kanatsumi2003/ZooManagementUI">
          <FaGithub size={32} className="white-icon" />
        </a>
        <span className="icon-text"></span>
      </div>
      <div className="social-icon">
        <a href="ducnase171103@fpt.edu.vn">
          <FaEnvelope size={32} className="white-icon" />
        </a>
        <span className="icon-text"></span>
      </div>
    </div>
  );
};

export default SocialIcons;
