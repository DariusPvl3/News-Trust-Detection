import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import '../styles/Navbar.css';
import logo from '../assets/Logo.png';
import { ThemeToggle } from './ThemeToggle';

export const Navbar = ({ isDark, toggleTheme }) => {
  const [click, setClick] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 960);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  useEffect(() => {
    const updateWindowSize = () => {
      setIsMobile(window.innerWidth <= 960);
    };

    window.addEventListener('resize', updateWindowSize);

    return () => {
      window.removeEventListener('resize', updateWindowSize);
    };
  }, []);

  return (
    <nav>
      <div className="navbar-container">
        <Link to='/' className='navbar-logo' onClick={closeMobileMenu}><img src={logo}></img></Link>
        <div className="menu-icon" onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <NavLink to='/check' className={isMobile ? 'nav-links-mobile' : 'nav-links'} onClick={closeMobileMenu}>Verifică Articol</NavLink>
          </li>
          <li className='nav-item'>
            <NavLink to='/about' className={isMobile ? 'nav-links-mobile' : 'nav-links'} onClick={closeMobileMenu}>Despre</NavLink>
          </li>
          <li className='nav-item'>
            <NavLink to='/posts' className={isMobile ? 'nav-links-mobile' : 'nav-links'} onClick={closeMobileMenu}>Postări</NavLink>
          </li>
        </ul>
      </div>
      <ThemeToggle isChecked={isDark} handleChange={toggleTheme} />
    </nav>
  );
}
