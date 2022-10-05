import React, { useState, useEffect, useRef } from 'react'
import { useGlobalContext } from '../context'

export default function LandingImages() {
    const [firstImage, setImage] = useState()
    const firstButton = useRef()
    const secondButton = useRef()
    useEffect(() => {
        setTimeout(() => {
            firstImage ?
                firstButton.current.style.transitionDelay = "0s"
                : firstButton.current.style.transitionDelay = ".7s"
            !firstImage ?
                secondButton.current.style.transitionDelay = "0s"
                : secondButton.current.style.transitionDelay = ".7s"
        }, 1200);
    }, [firstImage])
    const { productsRef } = useGlobalContext()

    return (
        <div className="landing">
            <div className={firstImage ? "first show" : "first"}>
                <div className="text">
                    <h3>Fashion Sale</h3>
                    <h1>Minimal Menz Style</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde modi, voluptates fugit possimus excepturi recusandae!</p>
                    <button ref={firstButton}
                        onClick={() => window.scrollTo({ top: productsRef.current.offsetTop - 230, behavior: 'smooth' })}
                    >Shop now</button>
                </div>
            </div>
            <div className={!firstImage ? "second show" : "second"}>
                <div className="text">
                    <h3>Fashion Sale</h3>
                    <h1>Minimal Menz Style</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde modi, voluptates fugit possimus excepturi recusandae!</p>
                    <button ref={secondButton}
                        onClick={() => window.scrollTo({ top: productsRef.current.offsetTop - 230, behavior: 'smooth' })}
                    >Shop now</button>
                </div>
            </div>
            <div className="chev-right" onClick={() => setImage(prev => !prev)} >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M96 480c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L242.8 256L73.38 86.63c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25l-192 192C112.4 476.9 104.2 480 96 480z" /></svg>
            </div>
            <div className="chev-left" onClick={() => setImage(prev => !prev)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M224 480c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25l192-192c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l169.4 169.4c12.5 12.5 12.5 32.75 0 45.25C240.4 476.9 232.2 480 224 480z" /></svg>
            </div>
        </div>
    )
}
