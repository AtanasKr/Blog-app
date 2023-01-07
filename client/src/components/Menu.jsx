import React from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

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
    // const posts =[
    //     {
    //       id:1,
    //       title:"Testing title",
    //       desc:"Testing desc",
    //       img:"https://www.w3schools.com/images/lamp.jpg"
    //     },{
    //       id:2,
    //       title:"Testing title",
    //       desc:"Testing desc",
    //       img:"https://www.w3schools.com/images/lamp.jpg"
    //     },{
    //       id:3,
    //       title:"Testing title",
    //       desc:"Testing desc",
    //       img:"https://www.w3schools.com/images/lamp.jpg"
    //     },{
    //       id:4,
    //       title:"Testing title",
    //       desc:"Testing desc",
    //       img:"https://www.w3schools.com/images/lamp.jpg"
    //     },
    //   ];
  return (
    <div className='menu-holder'>
        <h1>Other similar posts</h1>
        {posts.map(post=>(
            <div className="post" key={post.id}>
                <img src={`../upload/${post.img}`} alt="similar-post-img" />
                <h2>{post.title}</h2>
                <button>Go now</button>
            </div>
        ))}
    </div>
  )
}
