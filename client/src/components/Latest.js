import React from 'react'
import "../styles/latest.css"
import { latest } from '../data'

export default function Latest() {
    return (
        <section className='latest'>
            <div className="container">

                <h1>Latest News</h1>
                <div className="main">
                    {
                        latest.map((product, index) => {
                            const { image, title, description } = product
                            return <div className='product' key={index}>
                                <div className="image">
                                    <img src={image} alt="" />
                                </div>
                                <h4>Fashion Tips</h4>
                                <h2>{title}</h2>
                                <p>{description}</p>
                                <button>Read More</button>
                            </div>
                        })
                    }
                </div>
            </div>
        </section>
    )
}
