import { BsCart3, BsHeart, BsZoomIn, BsHeartFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";
import { useState } from "react";

export default function TrendingCard({
    name,
    image,
    price,
    oldPrice,
    _id: id,
}) {
    const { pageChanged, addToCart } = useGlobalContext();
    const [hearted, setHearted] = useState(false);

    return (
        <div className="card">
            <div className="buttons">
                <div
                    className="icon"
                    // onClick={() => dispatch({ type: ACTIONS.ADD_PRODUCT, payload: { id, name, image, price, amount: 1 } })}
                    onClick={() => addToCart(id, name, image, price)}
                >
                    <BsCart3 />
                </div>
                <div onClick={() => setHearted((prev) => !prev)} className="icon">
                    {hearted ? <BsHeartFill /> : <BsHeart />}
                </div>
                <div onClick={pageChanged} className="icon">
                    <Link to={`/${id}`}>
                        <BsZoomIn />
                    </Link>
                </div>
            </div>
            <div className="image">
                <img src={image} alt={name} />
            </div>
            <div className="text">
                <h4>{name}</h4>
                <div className="prices">
                    <span className="price">${price}</span>
                    <span className="old-price">${oldPrice}</span>
                </div>
            </div>
        </div>
    );
}
