import React from 'react'
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "./styles/styles.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SharedHome from "./components/SharedHome";
import Login from "./pages/Login";
import Error from "./pages/Error";
import Signup from "./pages/Signup";
import SingleProduct from "./components/SingleProduct";
import Cart from "./pages/Cart";
import Men from "./pages/Men";
import Women from "./pages/Women";
import Babies from "./pages/Babies";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import { useGlobalContext } from './context';

function App() {
  const { loggedIn } = useGlobalContext()
  return (
    <React.StrictMode>
      {/* <Loading /> */}
      <Router>
        <Routes>
          <Route path="/" element={<SharedHome />} >
            <Route index element={<Home />} />
            <Route path="/:Id" element={<SingleProduct />} />
            <Route path="login" element={!loggedIn ? <Login /> : <Navigate to='/' />} />
            <Route path="signup" element={!loggedIn ? <Signup /> : <Navigate to='/' />} />
            <Route path="cart" element={loggedIn ? <Cart /> : <Navigate to='/login' />} />
            <Route path="men" element={<Men />} />
            <Route path="women" element={<Women />} />
            <Route path="babies" element={<Babies />} />
            <Route path="blog" element={<Blog />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </Router>
    </React.StrictMode>
  );
}

export default App;
