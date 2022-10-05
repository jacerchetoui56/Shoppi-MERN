import React from 'react'
import '../styles/options.css'
import { Link } from 'react-router-dom'
import { useGlobalContext } from "../context"

export default function Options() {

    const { pageChanged } = useGlobalContext()
    return (
        <div className='options'>
            <div className="container">
                <div className="card men">
                    <img src="images/men-fashion.webp" alt="" />
                    <div className="text">
                        <h4>Men's Fashion</h4>
                        <div onClick={() => pageChanged()}>
                            <Link to="/man">Shop Now</Link>
                        </div>
                    </div>
                </div>
                <div className="card women">
                    <img src="images/women-fashion.webp" alt="" />
                    <div className="text">
                        <h4>Women's Fashion</h4>
                        <div onClick={() => pageChanged()}>
                            <Link to="/women">Shop Now</Link>
                        </div>
                    </div>
                </div>
                <div className="card baby">
                    <img src="images/baby-fashion.webp" alt="" />
                    <div className="text">
                        <h4>Baby Fashion</h4>
                        <div onClick={() => pageChanged()}>
                            <Link to="/babies">Shop Now</Link>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
