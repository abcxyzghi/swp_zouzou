import React from 'react';
import { Link } from 'react-router-dom';
import './MainCoverImage.css';

function timeOut() {
  setTimeout(function() {
    window.location.replace("/App1");
  }, 5000)
}
const CoverImage = () => {
  timeOut()
  return (
    <div className='startup-div'>
      <img className = 'startup-background' src = 'startupbackground.jpg' alt='start up background'></img>
    </div>
  );
};

export default CoverImage;
