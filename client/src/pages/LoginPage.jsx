import React from 'react'
import '../styles/Login.scss'

const LoginPage = () => {

// const[email, setEmail] = useState("")
// const[password, setPassword] = useState("")

  return (
    <div className='login'>
      <div className="login_content">
        <form className="login_content_form">
          <input
            className='floating-label'
            placeholder='Email'
            type='text'
            name='email'
            // value={email}
            // onChange={(e)=>{e.target.value}}
            required
            />
          <input
            className='floating-label'
            placeholder='Password'
            type='password'
            name='password'
            // value={password}
            // onChange={(e)=>{e.target.value}}
            required
          />
          <button type='submit'>LOGIN</button>
        </form>
        <a href="/register" className='hover-underline-animation'>Didn't have an Account? Sign In Here</a>
      </div>
    </div>
  )
}

export default LoginPage
