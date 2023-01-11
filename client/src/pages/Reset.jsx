import axios from 'axios'
import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'

const Reset = () => {
  const [inputs,setInputs] = useState({
    username:"",
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
        await axios.post("/users/changepassword",inputs);
    }catch(err){
      setError(err.response.data);
    }
  }
  return (
    <div className='auth'>
      <h1>Reset Password</h1>
      <form>
      <input required type="email" placeholder='email' onChange={handleChange} name='email'/>
        <button onClick={handleSubmit}>Send Link</button>
        {err&&<p>{err}</p>}
        <span>Go back to blog? <Link to='/'>Blog</Link></span>
      </form>
    </div>
  )
}

export default Reset