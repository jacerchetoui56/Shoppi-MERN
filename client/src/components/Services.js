import React, { useState, useRef } from 'react'
import "../styles/services.css"


export default function Services() {
    const servicesRef = useRef()
    const [reveal, setReveal] = useState(false)

    window.addEventListener("scroll", () => {
        if (window.scrollY > servicesRef.current.offsetTop - 400) {
            setReveal(true)
        }
    })

    return (
        <section className={reveal ? "services show" : "services"} ref={servicesRef}>
            <div className="container">
                <div className="service" style={{ transitionDelay: ".1s" }}>
                    <img src="images/icons/truck.svg" alt="" />
                    <h2>Fast & Free Delivery</h2>
                    <h4>Free delivery on all orders</h4>
                </div>
                <div className="service" style={{ transitionDelay: ".3s" }}>
                    <img src="images/icons/payment.svg" alt="" />
                    <h2>Secure Payment</h2>
                    <h4>Secured payment with all cards</h4>
                </div>
                <div className="service" style={{ transitionDelay: ".5s" }}>
                    <img src="images/icons/money.svg" alt="" />
                    <h2>Money Back Guarantee</h2>
                    <h4>Have your money back at any case</h4>
                </div>
                <div className="service" style={{ transitionDelay: ".7s" }}>
                    <img src="images/icons/online.svg" alt="" />
                    <h2>Online Support</h2>
                    <h4>Available all days and weeks</h4>
                </div>
            </div>
        </section>
    )
}
