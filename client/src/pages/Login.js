import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context";
import "../styles/login.css";

export default function Login() {
  const { pageChanged, setLoggedIn, setUser, setCartCount } =
    useGlobalContext();
  const [message, setMessage] = useState({ class: "message", msg: "" });
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        "https://shoppi-server.onrender.com/api/v1/auth/login",
        {
          ...formData,
        }
      );
      if (data.success) {
        localStorage.setItem("token", data?.token);
        setLoggedIn(true);
        setUser(data.userName);
        setCartCount(data.count);
        navigate("/");
        pageChanged();
      }
    } catch (error) {
      setMessage({ class: "message bad-res", msg: error.response.data.msg });
    } finally {
      setLoading(false);
    }
  }

  function handleFormChange(e) {
    const { value, name } = e.target;

    setFormData((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  }

  return (
    <div className="login">
      <div className="container">
        <div className="header">
          <h1>Login</h1>
          <h4>Enter Login details to get access</h4>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Email Address</label>
            <br />
            <input
              id="username"
              type="text"
              name="email"
              onChange={handleFormChange}
              value={formData.email}
              placeholder="Email Address"
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <br />
            <input
              id="password"
              type="password"
              name="password"
              onChange={handleFormChange}
              value={formData.password}
              placeholder="Password"
              required
            />
          </div>
          <div className="form-options">
            <div className={message.class}>{message.msg}</div>
            <div className="forgot-pass">Forgot Password ?</div>
          </div>
          <div className="footer">
            <div>
              Don't have an account?{" "}
              <Link to="/signup">
                <span onClick={pageChanged}>Sign Up</span>
              </Link>{" "}
              here
            </div>
            <div className="button-loader">
              {loading && <div className="loader"></div>}
              <button>Login</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
