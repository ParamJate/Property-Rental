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

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]:value,
    })
  )}
  const [passMatch, setPassMatch] = useState(true)
  
  useEffect(()=>{
    setPassMatch(formData.password === formData.confirmPassword || formData.confirmPassword==="")
  }, [formData.password, formData.confirmPassword])

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const register_form = new FormData()

      for (var key in formData) {
        register_form.append(key, formData[key])
      }
      
      const dataObject = Object.fromEntries(register_form)

      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataObject)
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
          <h2>Register</h2>
            <form method='POST' className="register_content_form" onSubmit={handleSubmit}>
              <div className="input-box">
                <span className="icon"><ion-icon name="person-outline"></ion-icon></span>
                <input 
                className='floating-label'
                type="text" 
                name='firstName'
                value={formData.firstName}
                onChange={handleChange}
                required
                />
                <label>FirstName</label>
              </div>
              <div className="input-box">
                <span className="icon"><ion-icon name="person"></ion-icon></span>
                <input 
                className='floating-label'
                type="text" 
                name='lastName'
                value={formData.lastName}
                onChange={handleChange}
                required
                />
                <label>LastName</label>
              </div>  
              <div className="input-box">
                <span className="icon"><ion-icon name="mail"></ion-icon></span>
                <input 
                className='floating-label'
                type="email" 
                name='email'
                value={formData.email}
                onChange={handleChange}
                required
                />
                <label>Email</label>
              </div>
              <div className="input-box">
                <span className="icon"><ion-icon name="lock-open"></ion-icon></span>
                <input 
                className='floating-label'
                type="password" 
                name='password'
                value={formData.password}
                onChange={handleChange}
                required
                />
                <label>Password</label>
              </div>
              <div className="input-box">
                <span className="icon"><ion-icon name="lock-closed"></ion-icon></span>
                <input 
                className='floating-label'
                type="password" 
                name='confirmPassword'
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                />
                <label>ConfirmPassword</label>
              </div>
                {!passMatch && (
                  <p style={{color: 'red', fontSize: '1em', textAlign: 'center', fontWeight: '600'}}>Password doesn't match!</p>
                )}
              <button className='btn' type='submit' disabled={!passMatch}>REGISTER</button>
            </form>
            <div className="register-login">
              <p>Already have an Account?<a href="/login" className='hover-underline-animation'>&nbsp;Login Here</a></p>
            </div>
        </div>
    </div>
  )
}

export default RegisterPage

