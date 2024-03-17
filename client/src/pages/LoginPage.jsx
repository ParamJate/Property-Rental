import React from 'react'
import '../styles/Login.scss'
import { useState } from 'react'
import { setLogin } from '../redux/state'
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

const LoginPage = () => {

const[email, setEmail] = useState("")
const[password, setPassword] = useState("")

const dispatch = useDispatch()
const navigate = useNavigate()

const handleSubmit = async(e)=>{
  e.preventDefault()

  try {
    const response = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password})
    })

    if (!response.ok) {
      throw new Error('Login failed: Invalid credentials or server error');
    }

    const loggedIn = await response.json()
    if(loggedIn){
      dispatch (
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token
        })
      )
      navigate("/")
    }
  } catch (err) {
    console.log("Login Failed", err.message)
  }
}

  return (
    <div className='login'>
      <div className="login_content">
        <h2>Login</h2>
        <form className="login_content_form" onSubmit={handleSubmit}>
          <div className="input-box">
            <span className='icon'><ion-icon name="mail"></ion-icon></span>
            <input
              type='text'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              />
              <label>Email</label>
          </div>
          <div className="input-box">
            <span className='icon'><ion-icon name="lock-closed"></ion-icon></span>
            <input
              className='floating-label'
              type='password'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              />
              <label>Password</label>
          </div>
          <button type='submit' className='btn'>LOGIN</button>
        </form>
          <div className="login-register">
            <p>Don't have an account?<a className='hover-underline-animation' href="/register">&nbsp;Register</a></p>
          </div>
      </div>
    </div>
  )
}

export default LoginPage
