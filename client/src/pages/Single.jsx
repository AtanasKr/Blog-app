import React from 'react'
import Edit from '../img/edit-btn.png'
import Delete from '../img/delete-btn.png'
import { Link } from 'react-router-dom'
import { Menu } from '../components/Menu'

const Single = () => {
  return (
    <div className='single'>
      <div className="content-holder">
        <img src="https://www.w3schools.com/images/lamp.jpg" alt="content-img" />
        <div className="user-holder">
          <img className='user-img' src="https://www.w3schools.com/images/lamp.jpg" alt="user-img" />
          <div className="user-info">
            <span>John</span>
            <p>posted 2 days ago</p>
          </div>
          <div className="edit-holder">
            <Link to={`/write?edit=2`}>
            <img className='edit-holder-img' src={Edit} alt="edit-button" />
            </Link>
            <img className='edit-holder-img' src={Delete} alt="delete-button" />
          </div>
        </div>
        <h1>Title holder</h1>
        <p>Text holder</p>
      </div>
      <Menu/>
    </div>
  )
}

export default Single