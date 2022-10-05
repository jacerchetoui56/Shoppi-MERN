import React, { useState, useRef, useEffect } from "react";
import Navbar from "./Navbar";
import {
    BsFacebook,
    BsInstagram,
    BsTwitter,
    BsYoutube,
    BsChevronUp,
} from "react-icons/bs";
import { ImLinkedin2 } from "react-icons/im";
import { FaBars } from "react-icons/fa";
import { BsChevronDown } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";

export default function Header() {
    const [sticky, setSticky] = useState(false);
    const {
        showLinks,
        setShowLinks,
        pageChanged,
        showPagesSublinks,
        setShowPagesSublinks,
        showBlogSublinks,
        setShowBlogSublinks,
    } = useGlobalContext();
    const [showScrollbtn, setShowScrollbtn] = useState(false);
    const linksRef = useRef();
    const navRef = useRef();

    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            setSticky(true);
            setShowLinks(false);
            setShowScrollbtn(true);
        } else {
            setSticky(false);
            setShowScrollbtn(false);
        }
    });

    function scrollTop() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    useEffect(() => {
        //to make the menu dynamically change the height everytime the dropdown menu is opened
        const linksHeight = linksRef.current.getBoundingClientRect().height;
        navRef.current.style.height = showLinks ? `${linksHeight}px` : "0";
    }, [showLinks, showPagesSublinks, showBlogSublinks]);

    return (
        <header className="header">
            <div
                className={showScrollbtn ? "scroll-top show" : "scroll-top"}
                onClick={scrollTop}
            >
                <BsChevronUp className="icon" />
            </div>
            <div className="header-top">
                <div className="right">
                    <a href="/">About Us</a>
                    <a href="/">Privacy</a>
                    <a href="/">FAQ</a>
                    <a href="/">Careers</a>
                </div>
                <div className="left">
                    <a href="/">My Wishlist</a>
                    <a href="/">Track Your Order</a>
                    <div className="socials">
                        <a href="/">
                            <BsFacebook />
                        </a>
                        <a href="/">
                            <BsInstagram />
                        </a>
                        <a href="/">
                            <BsTwitter />
                        </a>
                        <a href="/">
                            <ImLinkedin2 />
                        </a>
                        <a href="/">
                            <BsYoutube />
                        </a>
                    </div>
                </div>
            </div>
            <div className={sticky ? "navbar sticky" : "navbar"}>
                <Navbar />
                <div className="offer">
                    Sale Up To 50% Biggest Discounts. Hurry! Limited Perriod Offer{" "}
                    <span>Shop Now</span>
                </div>
                <div className="drop-menu">
                    <div className="button">
                        <div onClick={() => setShowLinks((prev) => !prev)}>
                            <span>Menu</span>
                            <FaBars />
                        </div>
                    </div>
                    <div className="links-container" ref={navRef}>
                        <ul className="links" ref={linksRef}>
                            <li onClick={pageChanged}>
                                <Link to="/">
                                    <div className="link">Home</div>
                                </Link>
                            </li>
                            <li onClick={pageChanged}>
                                <Link to="/men">
                                    <div className="link">Men</div>
                                </Link>
                            </li>
                            <li onClick={pageChanged}>
                                <Link to="/women">
                                    <div className="link">Women</div>
                                </Link>
                            </li>
                            <li onClick={pageChanged}>
                                <Link to="/babies">
                                    <div className="link">Baby Collection</div>
                                </Link>
                            </li>
                            <li>
                                <div className="pages-link">
                                    <span onClick={() => setShowPagesSublinks((prev) => !prev)}>
                                        Pages
                                        <BsChevronDown />
                                    </span>
                                    <ul
                                        className="pages-links"
                                        style={{ display: showPagesSublinks ? "block" : "none" }}
                                    >
                                        <li onClick={pageChanged}>
                                            <Link to="/login">Login</Link>
                                        </li>
                                        <li onClick={pageChanged}>
                                            <Link to="/cart">Cart</Link>
                                        </li>
                                        <li>Product Details</li>
                                        <li>Product Checkout</li>
                                    </ul>
                                </div>
                            </li>
                            <li>
                                <div className="pages-link">
                                    <span
                                        onClick={() => {
                                            setShowBlogSublinks((prev) => !prev)
                                        }}
                                    >
                                        Blog
                                        <BsChevronDown />
                                    </span>
                                    <ul
                                        className="pages-links"
                                        style={{ display: showBlogSublinks ? "block" : "none" }}
                                    >
                                        <li onClick={pageChanged}>
                                            <Link to="/blog">Blog</Link>
                                        </li>
                                        <li>Element</li>
                                        <li>Blog Details</li>
                                    </ul>
                                </div>
                            </li>
                            <li onClick={() => pageChanged()}>
                                <Link to='/contact'>
                                    <div className="link">Contact</div>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
}
