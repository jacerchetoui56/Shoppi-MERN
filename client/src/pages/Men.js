import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/type.css";
import SelectionDropDown from "../components/SelectionDropDown";
import { Link } from "react-router-dom";
import TrendingCard from "../components/TrendingCard";
import { BsCheck2 } from "react-icons/bs";
import { useGlobalContext } from "../context";
import Loading from "../components/Loading";

export default function Man() {
  const { loading, setLoading } = useGlobalContext();
  const [products, setProducts] = useState([]);

  //fetching the data of products
  async function getProducts() {
    try {
      const { data } = await axios.get(
        "https://shoppi-server.onrender.com/api/v1/products/men"
      );
      if (data.success) {
        setProducts(data.data);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    setLoading(true);
    getProducts();
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <div className="man">
      <div className="header">
        <h1>Men</h1>
        <p>
          <span>
            <Link to="/">Home</Link>
          </span>{" "}
          | <span>Men</span>
        </p>
      </div>
      <div className="container">
        <div className="filter">
          <SelectionDropDown
            name={"Category"}
            options={["Category 1", "Category 2", "Category 3", "Category 4"]}
          />
          <SelectionDropDown
            name={"Type"}
            options={["Type 1", "Type 2", "Type 3", "Type 4"]}
          />
          <SelectionDropDown
            name={"Size"}
            options={["XXL", "XL", "LG", "M", "sm"]}
          />
          <SelectionDropDown
            name={"Color"}
            options={["Red", "Green", "Blue", "Skyblue"]}
          />
          <h2>Filter by Genres</h2>

          <div className="check">
            <input type="checkbox" id="History" />
            <div>
              <BsCheck2 className="icon" />
            </div>
            <label htmlFor="History">History</label>
          </div>

          <div className="check">
            <input type="checkbox" id="Horror" />
            <div>
              <BsCheck2 className="icon" />
            </div>
            <label htmlFor="Horror">Horror-Thriller</label>
          </div>

          <div className="check">
            <input type="checkbox" id="Love" />
            <div>
              <BsCheck2 className="icon" />
            </div>
            <label htmlFor="Love">Love Stories</label>
          </div>

          <div className="check">
            <input type="checkbox" id="Science" />
            <div>
              <BsCheck2 className="icon" />
            </div>
            <label htmlFor="Science">Science Fiction</label>
          </div>

          <div className="check">
            <input type="checkbox" id="Biography" />
            <div>
              <BsCheck2 className="icon" />
            </div>
            <label htmlFor="Biography">Biography</label>
          </div>
          <h2>Filter by Brand</h2>

          <div className="check">
            <input type="checkbox" id="Green" />
            <div>
              <BsCheck2 className="icon" />
            </div>
            <label htmlFor="Green">Green Publications</label>
          </div>

          <div className="check">
            <input type="checkbox" id="Anondo" />
            <div>
              <BsCheck2 className="icon" />
            </div>
            <label htmlFor="Anondo">Anondo Publications</label>
          </div>

          <div className="check">
            <input type="checkbox" id="Rinku" />
            <div>
              <BsCheck2 className="icon" />
            </div>
            <label htmlFor="Rinku">Rinku Publications</label>
          </div>

          <div className="check">
            <input type="checkbox" id="Sheba" />
            <div>
              <BsCheck2 className="icon" />
            </div>
            <label htmlFor="Sheba">Sheba Publications</label>
          </div>

          <div className="check">
            <input type="checkbox" id="Red" />
            <div>
              <BsCheck2 className="icon" />
            </div>
            <label htmlFor="Red">Red Publications</label>
          </div>
        </div>
        <div className="products">
          {products
            .filter((product) => product.gender === "men")
            .map((product) => {
              return <TrendingCard key={product._id} {...product} />;
            })}
        </div>
      </div>
    </div>
  );
}
