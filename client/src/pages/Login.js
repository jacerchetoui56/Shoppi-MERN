import React, { useState } from 'react'
import '../styles/login.css'
import { useNavigate, Link } from 'react-router-dom'
import { useGlobalContext } from '../context'
import axios from 'axios'

export default function Login() {
  const { pageChanged, setLoggedIn, setUser, setCartCount } = useGlobalContext()
  const [message, setMessage] = useState({ class: 'message', msg: '' })
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  let navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const { data } = await axios.post('http://localhost:5000/api/v1/auth/login', {
        ...formData
      })
      if (data.success) {
        localStorage.setItem('token', data?.token)
        setLoggedIn(true)
        setUser(data.userName)
        setCartCount(data.count)
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
    <div className='login'>
      <div className="container">
        <div className="header">
          <h1>Login</h1>
          <h4>Enter Login details to get access</h4>
        </div>
        <form className='login-form' onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Email Address</label>
            <br />
            <input
              id='username'
              type="text"
              name='email'
              onChange={handleFormChange}
              value={formData.email}
              placeholder='Email Address'
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <br />
            <input
              id='password'
              type="password"
              name='password'
              onChange={handleFormChange}
              value={formData.password}
              placeholder='Password'
              required
            />
          </div>
          <div className='form-options'>
            <div className={message.class}>
              {message.msg}
            </div>
            <div className='forgot-pass'>
              Forgot Password ?
            </div>
          </div>
          <div className="footer">
            <div>
              Don't have an account? <Link to="/signup"><span onClick={pageChanged}>Sign Up</span></Link> here
            </div>
            <button>Login</button>
          </div>
        </form>

      </div>
    </div>
  )
}
