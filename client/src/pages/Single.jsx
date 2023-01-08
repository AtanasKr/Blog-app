import React, {useState, useEffect} from 'react'
import Edit from '../img/edit-btn.png'
import Delete from '../img/delete-btn.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu } from '../components/Menu'
import axios from 'axios'
import moment from 'moment'
import { useContext } from 'react'
import { AuthContext } from '../context/authContext'
import DOMPurify from "dompurify";

const Single = () => {
  const [post,setPost] = useState({})
  const location = useLocation();

  const postId = location.pathname.split("/")[2];
  const navigate = useNavigate();

  const {currentUser} = useContext(AuthContext);

  useEffect(()=>{
    const fetchData = async()=>{
      try{
        const res = await axios.get(`/posts/${postId}`)
        setPost(res.data)
      }catch(err){
        console.log(err)
      }
    }
    fetchData();
  },[postId])

  const handleDelete = async ()=>{
    try{
      await axios.delete(`/posts/${postId}`)
      navigate("/")
    }catch(err){
      console.log(err);
    }
  }
  return (
    <div className='single'>
      <div className="content-holder">
        <img src={`../upload/${post.img}`} alt="content-img" />
        <div className="user-holder">
          {post.userImg&&<img className='user-img' src={post.userImg} alt="user-img" />}
          <div className="user-info">
            <span>{post.username}</span>
            <p>posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser.username===post.username&&<div className="edit-holder">
            <Link to={`/write?edit=2`} state={post}>
            <img className='edit-holder-img' src={Edit} alt="edit-button" />
            </Link>
            <img className='edit-holder-img' onClick={handleDelete} src={Delete} alt="delete-button" />
          </div>}
        </div>
        <h1>{post.title}</h1>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.desc),
          }}
        ></p>  
      </div>
      <Menu cat={post.cat}/>
    </div>
  )
}

export default Single