import React from 'react'
import logo from '../img/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/authContext.js'

const Navbar = () => {
  const {currentUser, logout} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRedirect = (e) =>{
    e.preventDefault();
    navigate("/resetpassword")
  }

  return (
    <div className='navbar'>
      <div className='container'>
        <div className="logo"><img src={logo} alt="logo" /></div>
        <div className="links">
        <Link className='link' to='/'><h6><strong>ALL</strong></h6></Link> 
          <Link className='link' to='/?cat=sport'><h6>SPORT</h6></Link> 
          <Link className='link' to='/?cat=art'><h6>ART</h6></Link>
          <Link className='link' to='/?cat=science'><h6>SCIENCE</h6></Link>
          <Link className='link' to='/?cat=technology'><h6>TECHNOLOGY</h6></Link>
          <Link className='link' to='/?cat=cinema'><h6>CINEMA</h6></Link>
          <Link className='link' to='/?cat=design'><h6>DESIGN</h6></Link>
          <Link className='link' to='/?cat=food'><h6>FOOD</h6></Link>
          {currentUser&&<span onClick={handleRedirect}>{currentUser.username}</span>}
          {currentUser ? <span onClick={logout}>Logout</span>:<Link className='link' to="/login">Login</Link>}
          <span className='write'><Link className='link' to='/write'>Write</Link></span>
          </div>
      </div>
    </div>
  )
}

export default Navbar