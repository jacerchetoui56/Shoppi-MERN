import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/contact.css";
import {
  HiOutlineHome,
  HiOutlineDeviceTablet,
  HiOutlineMail,
} from "react-icons/hi";
import axios from "axios";

export default function Contact() {
  const [message, setMessage] = useState({ class: "message", msg: "" });
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://shoppi-server.onrender.com/api/v1/inbox",
        {
          ...form,
        }
      );
      if (data.success) {
        setMessage({ class: "message good-res", msg: data.msg });
        clearMessage();
        //emptying the form
        setForm({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      }
    } catch (error) {
      setMessage({ class: "message bad-res", msg: error.response.data.msg });
      clearMessage();
    }
  }
  function clearMessage() {
    setTimeout(() => {
      setMessage({ class: "message", msg: "" });
    }, 4000);
  }
  return (
    <div className="contact">
      <div className="header">
        <h1>Contact</h1>
        <p>
          <span>
            <Link to="/">Home</Link>
          </span>{" "}
          | <span>Contact</span>
        </p>
      </div>
      <div className="container">
        <main>
          <form className="contact-form" onSubmit={handleSubmit}>
            <h4>Get In Touch</h4>
            <div>
              <textarea
                required
                placeholder="Enter Message"
                cols="30"
                rows="10"
                name="message"
                maxLength={200}
                onChange={handleChange}
                value={form.message}
              ></textarea>
              <input
                required
                placeholder="Enter Yout Name"
                type="text"
                className="name"
                name="name"
                onChange={handleChange}
                value={form.name}
              />
              <input
                required
                placeholder="Email"
                type="text"
                className="email"
                name="email"
                onChange={handleChange}
                value={form.email}
              />
              <input
                placeholder="Enter Subject (Optional)"
                type="text"
                className="subject"
                name="subject"
                onChange={handleChange}
                value={form.subject}
              />
            </div>
            <span className={message.class}>{message.msg}</span>
            <button>Send</button>
          </form>
        </main>
        <aside>
          <div className="contact-item">
            <HiOutlineHome className="icon" />
            <div>
              <h5>Sousse, Tunsia.</h5>
              <p>Street Taha Ben Achour, 4000</p>
            </div>
          </div>
          <div className="contact-item">
            <HiOutlineDeviceTablet className="icon" />
            <div>
              <h5>+216 25867129</h5>
              <p>Mon to Fri 9am to 6pm</p>
            </div>
          </div>
          <div className="contact-item">
            <HiOutlineMail className="icon" />
            <div>
              <h5>jacerdjo@gmail.com</h5>
              <p>Send us your query anytime!</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
