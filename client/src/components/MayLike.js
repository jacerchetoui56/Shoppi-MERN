import React, { useState, useEffect } from "react";
import axios from "axios";
import TrendingCard from "./TrendingCard";
import Slider from "react-slick";
import "../styles/trending.css";
import "../styles/mayLike.css";

export default function MayLike() {
  const [products, setProducts] = useState([]);

  //fetching the data of products
  async function getProducts() {
    const { data } = await axios.get(
      "https://shoppi-server.onrender.com/api/v1/products"
    );
    if (data.success) {
      setProducts(data.data);
    }
  }
  useEffect(() => {
    try {
      getProducts();
    } catch (err) {
      console.log(err);
    }
  }, []);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="mayLike">
      <div className="container">
        <h2>You May Like</h2>
        <Slider {...settings}>
          {products.map((product) => {
            return <TrendingCard key={product.id} {...product} />;
          })}
        </Slider>
      </div>
    </div>
  );
}
