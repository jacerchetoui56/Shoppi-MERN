import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import "../styles/productDetails.css"
import { AiFillStar } from 'react-icons/ai'
import { BsStarHalf } from 'react-icons/bs'
import { RiShareFill } from 'react-icons/ri'
import { useGlobalContext } from '../context'
import axios from 'axios'
import Loading from './Loading'

export default function SingleProduct() {
    let navigate = useNavigate()
    const { addToCart, loading, setLoading, user, loggedIn } = useGlobalContext()
    const [activeOption, setActiveOption] = useState('description')
    const [product, setProduct] = useState({})
    const [Comments, setComments] = useState([])
    const { Id } = useParams()
    async function getProduct() {
        try {
            const { data } = await axios.get(`http://localhost:5000/api/v1/products/product/${Id}`)
            if (!data.success) {
                navigate('*')
            }
            else {
                setProduct(data.data)
                setComments(data.data.comments)
            }
        } catch (err) {
            navigate('*')
        }
    }
    useEffect(() => {
        getProduct()
        setLoading(false)
    })

    const { name, type, price, image, reviews, description, author } = product
    const [commentForm, setCommentForm] = useState({
        name: user,
        comment: '',
        img: 'images/comments/avatar.png',
    })


    function handleChange(e) {
        e.preventDefault()
        const name = e.target.name;
        const value = e.target.value;
        setCommentForm(prev => ({ ...prev, [name]: value }))
    }

    async function addComment(e) {
        e.preventDefault()
        //adding the new comment
        const token = localStorage.getItem('token')
        try {
            const { data } = await axios.post(`http://localhost:5000/api/v1/products/product/${Id}`, {
                comment: commentForm.comment
            }, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            if (data.success) {
                setComments(data.data)
            }
        } catch (err) {
            console.log(err)
        }

        //emptying the form
        setCommentForm({
            name: '',
            comment: '',
            img: 'images/comments/avatar.png',
        })
    }

    return loading ? <Loading /> : (
        <div className='product-details'>
            <div className="header">
                <h1>Product Details</h1>
                <p>
                    <span><Link to="/">Home</Link></span> | <span>Product Details</span>
                </p>
            </div>
            <div className="container">
                <div className="card">
                    <div className="image">
                        <img src={image} alt={name} />
                    </div>
                    <div className='infos'>
                        <h2>{name}</h2>
                        <h5>{type}</h5>
                        <div className="price">
                            ${price}
                        </div>
                        <div className="product-reviews">
                            <div>
                                <AiFillStar />
                                <AiFillStar />
                                <AiFillStar />
                                <AiFillStar />
                                <BsStarHalf />
                            </div>
                            <h6>
                                ({reviews} Reviews)
                            </h6>
                        </div>
                        <div className={loggedIn ? "product-buttons" : "product-buttons Not"}>
                            <span
                                onClick={() => loggedIn && addToCart(Id, name, image, price)}
                            >Add To Cart</span>
                            <div className="share">
                                <RiShareFill />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="informations">
                <div className="informations-top">
                    <div
                        onClick={() => setActiveOption('description')}
                        className={activeOption === "description" ? "option active" : "option"}>
                        Description
                    </div>
                    <div
                        onClick={() => setActiveOption('author')}
                        className={activeOption === "author" ? "option active" : "option"}>
                        Author
                    </div>
                    <div
                        onClick={() => setActiveOption('comments')}
                        className={activeOption === "comments" ? "option active" : "option"}>
                        Comments
                    </div>
                    <div
                        onClick={() => setActiveOption('reviews')}
                        className={activeOption === "reviews" ? "option active" : "option"}>
                        Reviews
                    </div>
                </div>
                <div className="informations-content">
                    {activeOption === 'description' && <p>{description}</p>}
                    {activeOption === 'author' && <section className='product-author'>
                        <h3>{author}</h3>
                    </section>}
                    {activeOption === 'comments' && <section className='product-comments'>
                        {Comments && Comments.map((comment, index) => {
                            return <div key={index} className='comment'>
                                <div>
                                    <div className="image">
                                        <img src='images/comments/avatar.png' alt={comment.name} />
                                    </div>
                                    <div>
                                        <h3>{comment.name}</h3>
                                        <p>{comment.comment}</p>
                                    </div>
                                </div>
                            </div>
                        })}
                        {loggedIn && (<form className='comments-form' onSubmit={addComment}>
                            <div>
                                <label htmlFor="comment">Your Comment : </label>
                                <input
                                    type="text"
                                    placeholder='Enter Your comment'
                                    id='comment'
                                    name='comment'
                                    value={commentForm.comment}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <button type="submit">Add comment</button>
                        </form>)}
                    </section>}
                    {activeOption === 'reviews' && <p>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse ea itaque laborum voluptates qui consequuntur numquam repellat illum accusantium animi.</p>}
                </div>
            </div>
        </div>
    )
}
