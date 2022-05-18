import React from 'react';
import './navbar.css';
import ME from './assets/logo.png';


const Navbar = () => {
  return (
    <div className="container header">
    <img src={ME} alt="me"/>
    <a href="#logo">LOGO</a>
    </div> 
  );  

};


export default Navbar