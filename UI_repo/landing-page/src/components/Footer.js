import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <footer className="footer-section">
            <div className="footer-content">
                <div className="footer-brand">
                    <h2>AccessNYC</h2>
                    <p>© 2024 AccessNYC</p>
                </div>
                <div className="footer-links">
                    <div className="footer-column">
                        <h3>Product</h3>
                        <ul>
                            <li><a href="#">Overview</a></li>
                            <li><a href="#">Customers</a></li>
                            <li><a href="#">Jobs</a></li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h3>Company</h3>
                        <ul>
                            <li><a href="#">About</a></li>
                            <li><a href="#">Careers</a></li>
                            <li><a href="#">Press</a></li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h3>Support</h3>
                        <ul>
                            <li><a href="#">FAQs</a></li>
                            <li><a href="#">Contact us</a></li>
                            <li><a href="#">Help Center</a></li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h3>Legal</h3>
                        <ul>
                            <li><a href="#">Terms</a></li>
                            <li><a href="#">Privacy</a></li>
                            <li><a href="#">Security</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;