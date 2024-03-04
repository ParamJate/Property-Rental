import React, { useEffect, useState } from 'react'
import {useNavigate} from "react-router-dom"
import '../styles/Register.scss'

const RegisterPage = () => {
  
  const[formData, setFormData] = useState({
    firstName: "",
    lastName:"",
    email:"",
    password:"",
    confirmPassword:"",
  })

  const handleChange = (e) =>{
    const {name, value} = e.target
    setFormData({
      ...formData,
      [name]:value,
    })
  }
  const [passMatch, setPassMatch] = useState(true)
  
  useEffect(()=>{
    setPassMatch(formData.password === formData.confirmPassword || formData.confirmPassword==="")
  })

  const navigate = useNavigate()

  const handleSubmit = async (e)=>{
    e.preventDefault()

    try {
      const register_form = new FormData()

      for (var key in formData) {
        register_form.append(key, formData[key])
      }

      const response = await fetch("http://localhost:3001/auth/register",{
        method: "POST",
        body: register_form
      })

      if (response.ok) {
        navigate("/login")
      }
    } catch (err) {
      console.log("Registration failed", err.message)
    }
  }

  
  return (
    <div className='register'>
        <div className="register_content">
            <form className="register_content_form" onSubmit={handleSubmit}>
                <input 
                className='floating-label'
                placeholder='First Name'
                type="text" 
                name='firstName'
                value={formData.firstName}
                onChange={handleChange}
                required
                />
                <input 
                className='floating-label'
                type="text" 
                name='lastName'
                value={formData.lastName}
                placeholder='Last Name'
                onChange={handleChange}
                required
                />
                <input 
                className='floating-label'
                type="email" 
                placeholder='Email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                required
                />
                <input 
                className='floating-label'
                type="passord" 
                placeholder='Password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                required
                />
                <input 
                className='floating-label'
                type="password" 
                placeholder='Confirm Password'
                name='confirmPassword'
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                />
                {!passMatch && (
                  <p style={{color: 'red'}}>Password doesn't match!</p>
                )}

              <button type='submit' disabled={!passMatch}>REGISTER</button>
            </form>
            <a href="/login" className='hover-underline-animation'>Already have an Account? Log In Here</a>
        </div>
    </div>
  )
}

export default RegisterPage

