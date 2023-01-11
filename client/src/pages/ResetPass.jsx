import React from 'react'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

const ResetPass = () => {
  const [inputs,setInputs] = useState({
    username:"",
    password:"",
  })

  const [err,setError] =useState(null);
  const navigate = useNavigate();

  const handleChange = e =>{
    setInputs(prev=>({...prev,[e.target.name]:e.target.value}))
  }
  const path = useLocation().pathname.slice(17);
  const id = path.split("/")[0];
  const token = path.split("/")[1];

  const handleSubmit = async e =>{
    e.preventDefault();
    try{
      await axios.put(`/users/change-password/${id}/${token}`,inputs)
      alert("Password changed succesfuly!")
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
        <input required type="password" placeholder='new password' onChange={handleChange} name='password'/>
        <button onClick={handleSubmit}>Reset</button>
        {err && <p>{err}</p>}
        <span>Go back to blog? <Link to='/'>Blog</Link></span>
      </form>
    </div>
  )
}

export default ResetPass