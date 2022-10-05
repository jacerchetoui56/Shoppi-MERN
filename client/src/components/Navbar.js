import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { AiOutlineUser, AiOutlineShoppingCart } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import { useGlobalContext } from "../context";
import { useState } from "react";


export default function Navbar() {
    let navigate = useNavigate()
    const { cartCount, pageChanged, loggedIn, user, setLoggedIn } = useGlobalContext()
    const [logoutBtn, setLogoutBtn] = useState(false)
    function logout() {
        localStorage.removeItem('token')
        setLoggedIn(false)
        navigate('/')
    }
    return (
        <nav className="nav">
            <div className="logo" onClick={pageChanged}>
                <Link to="/">
                    <img src="images/logo.webp" alt="" />
                </Link>
            </div>
            <ul className="links">
                <li onClick={pageChanged}>
                    <Link to="/">
                        <div className="link">
                            Home
                        </div>
                    </Link>
                </li>
                <li onClick={pageChanged}>
                    <Link to='/men'>
                        <div className="link">Men</div>
                    </Link>
                </li>
                <li>
                    <Link to='/women'>
                        <div className="link">Women</div>
                    </Link>
                </li>
                <li>
                    <Link to="/babies">
                        <div className="link new">Baby Collection</div>
                    </Link>
                </li>
                <li>
                    <div className="link pages">
                        <div>
                            Pages
                            <BsChevronDown className="icon" />
                        </div>
                        <ul className="pages-menu">
                            <li>
                                <Link to="/login">
                                    Login
                                </Link>
                            </li>
                            <li onClick={pageChanged}>
                                <Link to='/cart'>
                                    Cart
                                </Link>
                            </li>
                            <li>Product Details</li>
                            <li>Product Checkout</li>
                        </ul>
                    </div>
                </li>
                <li>
                    <div className="link pages">
                        <div onClick={pageChanged}>
                            <Link to='/blog'>
                                Blog
                            </Link>
                            <BsChevronDown className="icon" />
                        </div>
                        <ul className="pages-menu">
                            <li onClick={pageChanged}>
                                <Link to='/blog'>
                                    Blog
                                </Link>
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
            <div className="nav-buttons">
                <div className="button">
                    <FiSearch />
                </div>
                <div className={`button ${loggedIn && 'user logged'}`} onClick={
                    () => { !loggedIn && pageChanged(); loggedIn && setLogoutBtn(pre => !pre) }
                }>
                    {
                        loggedIn ?
                            // < className="userIcon" onClick={() => setLogoutBtn(pre => !pre)}>
                            <AiOutlineUser />
                            :
                            <Link to="/login">
                                <AiOutlineUser />
                            </Link>
                    }
                    <h4>{user}</h4>
                    <div className={logoutBtn ? 'logoutbtn open' : 'logoutbtn'}
                        onClick={logout}>
                        Logout
                    </div>
                </div>
                <div className="button cart" onClick={pageChanged}>
                    <Link to='/cart'>
                        <AiOutlineShoppingCart />
                    </Link>
                    <div className="cart-amount">
                        {cartCount}
                    </div>
                </div>
            </div>
        </nav>
    );
}
