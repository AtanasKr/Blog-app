import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Change = () => {
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
      await axios.put("/users/resetpassword",inputs)
      navigate("/login");
    }catch(err){
      setError(err.response.data);
    }
  }

  console.log(inputs)
  return (
    <div className='auth'>
      <h1>Change Password</h1>
      <form>
        <input required type="text" placeholder='username' onChange={handleChange} name='username' />
        <input required type="email" placeholder='email' onChange={handleChange} name='email'/>
        <input required type="password" placeholder='new password' onChange={handleChange} name='password'/>
        <button onClick={handleSubmit}>Change Password</button>
        {err && <p>{err}</p>}
        <span>Want to go back to blog page? <Link to='/'>Back</Link></span>
      </form>
    </div>
  )
}

export default Change