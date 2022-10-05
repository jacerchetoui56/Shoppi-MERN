import React, { useState, useRef } from 'react'
import '../styles/signup.css'
import { Link, useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../context'
import axios from 'axios'

export default function Signup() {
    const { pageChanged, setLoggedIn, setUser } = useGlobalContext()
    const [message, setMessage] = useState({ class: 'message', msg: '' })
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    })
    const confirmPssRef = useRef()

    let navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const { data } = await axios.post('http://localhost:5000/api/v1/auth/register', {
                ...formData
            })
            if (data.success) {
                localStorage.setItem('token', data?.token)
                setLoggedIn(true)
                setUser(data.userName)
                navigate("/")
                pageChanged()
            }
        } catch (error) {
            setMessage({ class: 'message bad-res', msg: error.response.data.msg })
        }
    }
    function handleFormChange(e) {
        const { value, name } = e.target

        setFormData(pre => {
            return {
                ...pre,
                [name]: value
            }
        })
    }
    return (
        <div className='signup'>
            <div className="container">
                <div className="header">
                    <h1>Sign Up</h1>
                    <h4>
                        Create your account to get full access
                    </h4>
                </div>
                <form onSubmit={handleSubmit} className='signup-form'>
                    <div>
                        <label htmlFor="fullname">Full Name</label>
                        <input
                            type="text"
                            placeholder='Full name'
                            id='fullname'
                            onChange={handleFormChange}
                            name='name'
                            value={formData.name}
                            required />
                    </div>
                    <div>
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            placeholder='Email Address'
                            id='email'
                            onChange={handleFormChange}
                            name='email'
                            value={formData.email}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            placeholder='Enter Password'
                            id='password'
                            onChange={handleFormChange}
                            name='password'
                            value={formData.password}
                            required />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            ref={confirmPssRef}
                            placeholder='Confirm Password'
                            id='confirmPassword'
                            onChange={handleFormChange}
                            name='confirmPassword'
                            value={formData.confirmPassword}
                            required />

                    </div>
                    <div className={message.class}>
                        {message.msg}
                    </div>
                    <div className="footer">
                        <div>
                            Already have an account? <Link to="/login"><span onClick={pageChanged}>Login</span></Link> here
                        </div>
                        <button>Sign Up</button>
                    </div>
                </form>
            </div>

        </div>
    )
}
