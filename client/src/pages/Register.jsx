import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
  const [inputs,setInputs] = useState({
    username:"",
    email:"",
    password:"",
  })

  const handleChange = e =>{
    setInputs(prev=>({...prev,[e.target.name]:e.target.value}))
  }

  const handleSubmit = async e =>{
    e.preventDefault();
    try{
      const res = await axios.post("/auth/register",inputs)
      console.log(res);
    }catch(err){
      console.log(err)
    }
  }

  console.log(inputs)
  return (
    <div className='auth'>
      <h1>Login</h1>
      <form>
        <input required type="text" placeholder='username' onChange={handleChange} name='username' />
        <input required type="email" placeholder='email' onChange={handleChange} name='email'/>
        <input required type="password" placeholder='password' onChange={handleChange} name='password'/>
        <button onClick={handleSubmit}>Register</button>
        <p>This is an error!</p>
        <span>Already got account? <Link to='/login'>Login</Link></span>
      </form>
    </div>
  )
}

export default Register