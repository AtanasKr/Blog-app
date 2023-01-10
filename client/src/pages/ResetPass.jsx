import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const ResetPass = () => {
  const [inputs,setInputs] = useState({
    username:"",
    email:"",
    password:"",
  })

  const [err,setError] =useState(null);
  const navigate = useNavigate();

  const handleChange = e =>{
    setInputs(prev=>({...prev,[e.target.name]:e.target.value}))
  }

  const handleSubmit = async e =>{
    e.preventDefault();
    try{
      await axios.post("/auth/register",inputs)
      navigate("/login");
    }catch(err){
      setError(err.response.data);
    }
  }

  console.log(inputs)
  return (
    <div className='auth'>
      <h1>Reset Password</h1>
      <form>
        <input required type="text" placeholder='username' onChange={handleChange} name='username' />
        <input required type="email" placeholder='email' onChange={handleChange} name='email'/>
        <input required type="password" placeholder='password' onChange={handleChange} name='password'/>
        <button onClick={handleSubmit}>Reset</button>
        {err && <p>{err}</p>}
        <span>Go back to blog? <Link to='/'>Blog</Link></span>
      </form>
    </div>
  )
}

export default ResetPass