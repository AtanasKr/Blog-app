import React from 'react'
import {Link} from 'react-router-dom'

const Home = () => {

  const posts =[
    {
      id:1,
      title:"Testing title",
      desc:"Testing desc",
      img:"https://www.w3schools.com/images/lamp.jpg"
    },{
      id:2,
      title:"Testing title",
      desc:"Testing desc",
      img:"https://www.w3schools.com/images/lamp.jpg"
    },{
      id:3,
      title:"Testing title",
      desc:"Testing desc",
      img:"https://www.w3schools.com/images/lamp.jpg"
    },{
      id:4,
      title:"Testing title",
      desc:"Testing desc",
      img:"https://www.w3schools.com/images/lamp.jpg"
    },
  ]
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