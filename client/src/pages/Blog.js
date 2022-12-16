import React, { useEffect } from "react";
import "../styles/blog.css";
import { Link } from "react-router-dom";
import { FaUser, FaComments } from "react-icons/fa";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import { useState } from "react";
import { useGlobalContext } from "../context";
import axios from "axios";
import Loading from "../components/Loading";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const { setLoading, loading } = useGlobalContext();

  async function getBlogs() {
    try {
      const { data } = await axios.get(
        "https://shoppi-server.onrender.com/api/v1/blogs"
      );
      if (data.success) {
        setBlogs(data.data);
      }
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    setLoading(true);
    getBlogs();
    setLoading(false);
  }, []);

  //some fake data to avoid repitition
  const recent = [
    {
      title: "From life was you fish...",
      date: "January 12, 2019",
      img: "images/recent/recent1.webp",
    },
    {
      title: "Astronomy Or Astrology",
      date: "01 Hour ago",
      img: "images/recent/recent2.webp",
    },
    {
      title: "Asteroids telescope",
      date: "02 Hours ago",
      img: "images/recent/recent3.webp",
    },
  ];
  return loading ? (
    <Loading />
  ) : (
    <div className="blog">
      <div className="header">
        <h1>Blog</h1>
        <p>
          <span>
            <Link to="/">Home</Link>
          </span>{" "}
          | <span>Blog</span>
        </p>
      </div>

      <div className="container">
        <main className="main">
          {blogs.map((blog, index) => {
            const {
              title,
              image,
              description,
              comments,
              type,
              date: { day, month },
            } = blog;
            return (
              <div key={index} className="blog-item">
                <div className="cover">
                  <div className="image">
                    <img src={image} alt={title} />
                  </div>
                  <div className="date">
                    <h4>{day}</h4>
                    <h6>{month}</h6>
                  </div>
                </div>
                <div className="text">
                  <div className="title">{title}</div>
                  <p>{description}</p>
                  <div className="blog-footer">
                    <div className="type">
                      <FaUser className="icon" />
                      <span>{type}</span>
                    </div>
                    |
                    <div className="comments">
                      <FaComments className="icon" />
                      <span>{comments} Comments</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="footer">
            <div>
              <BsChevronLeft className="icon" />
            </div>
            <div className="current">1</div>
            <div>2</div>
            <div>
              <BsChevronRight className="icon" />
            </div>
          </div>
        </main>
        <aside className="aside">
          <div className="search">
            <input type="text" placeholder="Search Keyword" />
            <button>Search</button>
          </div>
          <div className="category">
            <h4>Category</h4>
            <ul>
              <li>Restaurant Food(37)</li>
              <li>Travel News(10)</li>
              <li>Modern Technologies(03)</li>
              <li>Product(15)</li>
              <li>Inspiration(07)</li>
              <li>Health Care(21)</li>
            </ul>
          </div>
          <div className="recent">
            <h4>Recent Posts</h4>
            <ul>
              {recent.map((item, index) => {
                const { title, date, img } = item;
                return (
                  <li>
                    <div className="image">
                      <img src={img} alt={title} />
                    </div>
                    <div className="item-title">
                      <h3>{title}</h3>
                      <p> {date} </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="tags">
            <h4>Tag Clouds</h4>
            <ul>
              <li>Project</li>
              <li>Love</li>
              <li>Technology</li>
              <li>Travel</li>
              <li>Restaurant</li>
              <li>Lifestyle</li>
              <li>Design</li>
              <li>Illustration</li>
            </ul>
          </div>
          <div className="newsletter">
            <h4>Newletter</h4>
            <div>
              <input type="text" placeholder="Enter Email" />
              <button>Subscribe</button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
