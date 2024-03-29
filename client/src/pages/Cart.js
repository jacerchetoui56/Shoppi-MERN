import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BiConfused } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import SelectionDropDown from "../components/SelectionDropDown";
import { useGlobalContext } from "../context";
import "../styles/cart.css";

export default function Cart() {
  const { loading, setLoading, cart, setCart, setCartCount } =
    useGlobalContext();
  const [cartLoading, setCartLoading] = useState(false);
  const getData = async () => {
    const token = localStorage.getItem("token");
    try {
      const { data } = await axios.get(
        "https://shoppi-server.onrender.com/api/v1/products/cart",
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success) setCart(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
    setLoading(false);
  }, []);

  let navigate = useNavigate();
  const { pageChanged } = useGlobalContext();

  //modify the amount
  async function modifyAmount(id, amount) {
    const newProducts = cart
      .map((product) => {
        if (product.id === id) {
          return { ...product, amount: amount };
        }
        return product;
      })
      .filter((product) => product.amount > 0);
    setCart(newProducts);
    const token = localStorage.getItem("token");
    try {
      const { data } = await axios.patch(
        "https://shoppi-server.onrender.com/api/v1/products/cart",
        { id, amount },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      setCartCount(data.count);
    } catch (error) {
      console.log(error);
    }
  }

  async function checkout() {
    const token = localStorage.getItem("token");
    try {
      setCartLoading(true);
      const { data } = await axios.post(
        "https://shoppi-server.onrender.com/api/v1/products/checkout",
        {
          items: cart,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (data) {
        // redirect to the url in the response
        window.location.href = data?.url;
      }
    } catch (error) {
      navigate("/");
    } finally {
      setCartLoading(false);
    }
  }

  return loading ? (
    <Loading />
  ) : (
    <div className="cart">
      <div className="header">
        <h1>Cart</h1>
        <p>
          <span>
            <Link to="/">Home</Link>
          </span>{" "}
          | <span>Cart</span>
        </p>
      </div>
      <div className="container">
        <div className="titles">
          <div className="title">Product</div>
          <div className="title">Price</div>
          <div className="title">Quantity</div>
          <div className="title">Total</div>
        </div>
        <div className="cart-items">
          {cart.map((product) => {
            return product.amount === 0 ? (
              <></>
            ) : (
              <article className="item" key={product.id}>
                <div className="product-title">
                  <img src={product.image} alt={product.name} />
                  <h2>{product.name}</h2>
                </div>
                <p>${product.price}</p>
                <div className="cart-buttons">
                  <p>{product.amount}</p>
                  <div>
                    <button
                      className="plus"
                      onClick={
                        () => modifyAmount(product.id, product.amount + 1)
                        // dispatch({ type: ACTIONS.INC_AMOUNT, payload: product })
                      }
                    >
                      <AiOutlinePlus />
                    </button>
                    <button
                      className="moins"
                      onClick={
                        () =>
                          modifyAmount(
                            product.id,
                            Math.max(product.amount - 1, 0)
                          )
                        // dispatch({ type: ACTIONS.DEC_AMOUNT, payload: product })
                      }
                    >
                      <AiOutlineMinus />
                    </button>
                  </div>
                </div>
                <div className="total">
                  <p>${product.price * product.amount}</p>
                </div>
              </article>
            );
          })}
        </div>
        <div className="cart-total">
          {cart.length > 0 ? (
            <p>
              <span>Total: </span>$
              {parseFloat(
                cart.reduce(
                  (acc, product) => acc + product.price * product.amount,
                  0
                )
              ).toFixed(2)}
            </p>
          ) : (
            <div className="cart-empty">
              <BiConfused className="icon" />
              <h5>Cart is empty</h5>
            </div>
          )}
        </div>
      </div>
      {cart.length > 0 && (
        <div className="shipping-form">
          <SelectionDropDown
            name={"Country"}
            options={["tunisia", "Algeria", "Marroc"]}
          />
          <SelectionDropDown
            name={"State"}
            options={["Kebili", "Tunis", "Gabes", "Sousse"]}
          />
          <input type="Number" placeholder="Postcode/Zipcode" />
        </div>
      )}
      <div className="footer">
        <button
          onClick={() => {
            pageChanged();
            navigate("/");
          }}
        >
          Continue Shopping
        </button>
        {cart.length > 0 && (
          <button onClick={checkout}>Proceed to checkout</button>
        )}
        {cartLoading && <div className="loader"></div>}
      </div>
    </div>
  );
}
