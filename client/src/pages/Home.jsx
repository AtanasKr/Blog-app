import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import {Link, useLocation} from 'react-router-dom'

const Home = () => {

  const [posts,setPosts] = useState([])
  const cat = useLocation().search;

  useEffect(()=>{
    const fetchData = async()=>{
      try{
        const res = await axios.get(`/posts${cat}`)
        setPosts(res.data)
      }catch(err){
        console.log(err)
      }
    }
    fetchData();
  },[cat])
  // const posts =[
  //   {
  //     id:1,
  //     title:"Testing title",
  //     desc:"Testing desc",
  //     img:"https://www.w3schools.com/images/lamp.jpg"
  //   },{
  //     id:2,
  //     title:"Testing title",
  //     desc:"Testing desc",
  //     img:"https://www.w3schools.com/images/lamp.jpg"
  //   },{
  //     id:3,
  //     title:"Testing title",
  //     desc:"Testing desc",
  //     img:"https://www.w3schools.com/images/lamp.jpg"
  //   },{
  //     id:4,
  //     title:"Testing title",
  //     desc:"Testing desc",
  //     img:"https://www.w3schools.com/images/lamp.jpg"
  //   },
  // ]
  return (
    <div className='home'>
      <div className="posts">{posts.map((post)=>(
        <div className="post" key={post.id}>
          <div className="img">
            <img src={post.img} alt="post-img" />
          </div>
          <div className="content">
            <Link className='link' to={`/post/${post.id}`}>
              <h1>{post.title}</h1>
              </Link>
              <p>{post.desc}</p>
              <button>Read more</button>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
};

export default Home