import React from "react";
import '../styles/Footer.css';
import logo from '../assets/Logo.png';
import { Link } from "react-router-dom";
import { postsData } from "./postsData";

export const Footer = () => {
    return(
        <div className="footer-container">
            <div className="footer-links">
                <div className="footer-link-wrapper">
                    <div className="footer-link-items">
                        <h2>Link-uri</h2>
                        <Link to='/'>Pagina principală</Link>
                        <Link to='/check'>Verifică articol</Link>
                        <Link to='/about'>Despre</Link>
                        <Link to='/posts'>Postări</Link>
                    </div>
                    <div className="footer-link-items">
                        <h2>Articole</h2>
                        {postsData.map((post, index) => (
                        <Link
                            key={index}
                            to={post.path}
                        > {post.title} </Link>
                        ))}
                    </div>
                </div>
            </div>
            <section className="social-media">
                <div className="social-media-wrap">
                    <div className="footer-logo">
                        <Link className="social-logo" to="/"><img src={logo} alt="Logo"></img></Link>
                    </div>
                    <small className="website-rights">&copy;{new Date().getFullYear()} Pavăl Darius-Cosmin | Universitatea de Vest din Timişoara</small>
                    <div className="social-icons">
                        <a className="social-icon-link linkedin" href="https://www.linkedin.com/in/pavăl-darius-cosmin-b7bbab1b8/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <i className="fab fa-linkedin"></i>
                        </a>
                        <a className="social-icon-link instagram" href="https://www.instagram.com/dariuss.3/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a className="social-icon-link github" href="https://github.com/DariusPvl3" target="_blank" rel="noopener noreferrer" aria-label="Github">
                            <i className="fab fa-github"></i>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    )
};
