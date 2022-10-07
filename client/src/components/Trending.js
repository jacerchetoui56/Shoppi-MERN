import React, { useState } from 'react'
import '../styles/trending.css'
import TrendingCard from './TrendingCard'
import Slider from "react-slick";
import { useGlobalContext } from '../context';

export default function Trending({ products }) {

    const [currentType, setCurrentType] = useState('men')
    // carousel settings
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
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    const { productsRef } = useGlobalContext()

    return (
        <section className='trending' ref={productsRef}>
            <div className="container">

                <div className="trending-top">
                    <h2>Trending This Week</h2>
                    <div className="options">
                        <div
                            onClick={() => setCurrentType('men')}
                            className={currentType === 'men' ? "option active" : "option"}>Men</div>
                        <div
                            onClick={() => setCurrentType('women')}
                            className={currentType === 'women' ? "option active" : "option"}>Women</div>
                        <div
                            onClick={() => setCurrentType('baby')}
                            className={currentType === 'baby' ? "option active" : "option"}>Baby</div>
                        <div
                            onClick={() => setCurrentType('fashion')}
                            className={currentType === 'fashion' ? "option active" : "option"}>Fashion</div>
                    </div>
                </div>

                <Slider {...settings} >

                    {
                        products.filter((product) => product.gender === currentType).map((product, index) => {
                            return <TrendingCard key={product._id} {...product} />
                        })
                    }
                </Slider>
            </div>

        </section>
    )
}
