import React from 'react'
import '../styles/footer.css'
import { BsFacebook, BsInstagram, BsYoutube } from 'react-icons/bs'



export default function Footer() {
    return (
        <footer className='footer'>
            <div className="footer-top">
                <div className="footer-top-left">
                    <h2>Subscribe Newsletter</h2>
                    <p>Subscribe newsletter to get 5% on all products.</p>
                    <div className="socials">
                        <BsFacebook className='icon' />
                        <BsInstagram className='icon' />
                        <BsYoutube className='icon' />
                    </div>
                </div>
                <div className="footer-top-center">
                    <input type="text" placeholder='Enter Your Email' />
                    <button>Subscribe</button>
                </div>
                <div className="footer-top-right">
                    <BsFacebook className='icon' />
                    <BsInstagram className='icon' />
                    <BsYoutube className='icon' />
                </div>
            </div>
            <div className="footer-center">
                <div className="logo">
                    <img src="images/logo-white.webp" alt="" />
                </div>
                <div className="links">
                    <div className="col">
                        <h2>Shop Men</h2>
                        <ul className="anchors">
                            <li>
                                <a href="/">Clothing Fashion</a>
                            </li>
                            <li>
                                <a href="/">Winter</a>
                            </li>
                            <li>
                                <a href="/">Summer</a>
                            </li>
                            <li>
                                <a href="/">Formal</a>
                            </li>
                            <li>
                                <a href="/">Casual</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col">
                        <h2>Shop Women</h2>
                        <ul className="anchors">
                            <li>
                                <a href="/">Clothing Fashion</a>
                            </li>
                            <li>
                                <a href="/">Winter</a>
                            </li>
                            <li>
                                <a href="/">Summer</a>
                            </li>
                            <li>
                                <a href="/">Formal</a>
                            </li>
                            <li>
                                <a href="/">Casual</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col">
                        <h2>Baby Collection</h2>
                        <ul className="anchors">
                            <li>
                                <a href="/">Clothing Fashion</a>
                            </li>
                            <li>
                                <a href="/">Winter</a>
                            </li>
                            <li>
                                <a href="/">Summer</a>
                            </li>
                            <li>
                                <a href="/">Formal</a>
                            </li>
                            <li>
                                <a href="/">Casual</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col">
                        <h2>Quick Links</h2>
                        <ul className="anchors">
                            <li>
                                <a href="/">Track Your Order</a>
                            </li>
                            <li>
                                <a href="/">Support</a>
                            </li>
                            <li>
                                <a href="/">FAQ</a>
                            </li>
                            <li>
                                <a href="/">Carrier</a>
                            </li>
                            <li>
                                <a href="/">About</a>
                            </li>
                            <li>
                                <a href="/">Contact Us</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>Copyright ©{new Date().getFullYear()} All rights reserved | Made with ❤️ by <span><a target="_blank" href="https://jacerchetoui.me" rel="noreferrer">Jacer</a></span></p>
            </div>
        </footer>
    )
}
