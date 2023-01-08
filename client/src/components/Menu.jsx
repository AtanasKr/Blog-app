import React from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const Menu = ({cat}) => {

  const [posts,setPosts] = useState([])

  useEffect(()=>{
    const fetchData = async()=>{
      try{
        const res = await axios.get(`/posts/?cat=${cat}`)
        setPosts(res.data)
      }catch(err){
        console.log(err)
      }
    }
    fetchData();
  },[cat])
  return (
    <div className='menu-holder'>
        <h1>Other similar posts</h1>
        {posts.map(post=>(
            <div className="post" key={post.id}>
                <img src={`../upload/${post.img}`} alt="similar-post-img" />
                <h2>{post.title}</h2>
                <Link to={`/post/${post.id}`}><button className='redirect-holder'>Go now</button></Link>
            </div>
        ))}
    </div>
  )
}
