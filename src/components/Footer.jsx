import React from "react";
import '../styles/Footer.css';
import Button from "./Button";
import { Link } from "react-router-dom";

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
                        <h2>Contact</h2>
                        <Link to=''>Ceva</Link>
                        <Link to=''>Ceva</Link>
                        <Link to=''>Ceva</Link>
                        <Link to=''>Ceva</Link>
                        <Link to=''>Ceva</Link>
                    </div>
                    <div className="footer-link-items">
                        <h2>Inca Ceva</h2>
                        <Link to=''>Ceva</Link>
                        <Link to=''>Ceva</Link>
                        <Link to=''>Ceva</Link>
                        <Link to=''>Ceva</Link>
                        <Link to=''>Ceva</Link>
                    </div>
                </div>
            </div>
            <section className="social-media">
                <div className="social-media-wrap">
                    <div className="footer-logo">
                        <Link className="social-logo" to="">CheckTheFake!</Link>
                    </div>
                    <small className="website-rights">&copy;{new Date().getFullYear()} Pavăl Darius-Cosmin | Universitatea de Vest din Timişoara</small>
                    <div className="social-icons">
                        <Link className="social-icon-link linkedin" to='' target="_blank" aria-label="LinkedIn">
                            <i className="fab fa-linkedin"></i>
                        </Link>
                        <Link className="social-icon-link instagram" to='' target="_blank" aria-label="Instagram">
                            <i className="fab fa-instagram"></i>
                        </Link>
                        <Link className="social-icon-link github" to='' target="_blank" aria-label="Github">
                            <i className="fab fa-github"></i>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
};
