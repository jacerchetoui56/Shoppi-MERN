import React, { useState, useEffect } from 'react'
import axios from 'axios'
import "../styles/home.css"
import LandingImages from '../components/LandingImages'
import Options from '../components/Options'
import Trending from '../components/Trending'
import Testimonials from '../components/Testimonials'
import Latest from '../components/Latest'
import Services from '../components/Services'
import MayLike from '../components/MayLike'
import { useGlobalContext } from '../context'
import Loading from '../components/Loading'

export default function Home() {
    const { loading, setLoading } = useGlobalContext()
    const [products, setProducts] = useState([])

    //fetching the data of products
    async function getProducts() {
        try {
            const { data } = await axios.get('http://localhost:5000/api/v1/products')
            if (data.success) {
                setProducts(data.data)
                setLoading(false)
            }
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getProducts()
    }, [])
    return (
        <main>
            {
                loading ?
                    <Loading />
                    :
                    <div className='content'>
                        <LandingImages />
                        <Options />
                        <Trending products={products} />
                        <Testimonials />
                        <MayLike />
                        <Latest />
                        <Services />
                    </div>
            }
        </main>
    )
}
