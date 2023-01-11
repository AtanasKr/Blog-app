import axios from 'axios';
import moment from 'moment';
import React, {useState} from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useLocation, useNavigate } from 'react-router-dom';

const Write = () => {

  const state = useLocation().state;
  console.log(state);
  const [value, setValue] = useState(state?.desc||'');
  const [title, setTitle] = useState(state?.title||'');
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat||'');
  const navigate = useNavigate();

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickDraft = async (e) =>{
    e.preventDefault();
    const imgUrl = await upload();

    try {
      state
        ? await axios.put(`/posts/${state.id}`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
            status:'Draft',
          })
        : await axios.post(`/posts/`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            status:'Draft',
          });
          navigate("/")
      console.log(cat)
    } catch (err) {
      console.log(err);
    }
  }

  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();

    try {
      state
        ? await axios.put(`/posts/${state.id}`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
            status:'Public',
          })
        : await axios.post(`/posts/`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            status:'Public',
          });
          navigate("/")
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div className="add">
        <div className="content-holder">
          <input type="text" value={title} placeholder='title' onChange={e=>setTitle(e.target.value)} />
          <div className="editorContainer">
            <ReactQuill className='editor' theme="snow" value={value} onChange={setValue} />
          </div>
        </div>
        <div className="menu-holder">
          <div className="item">
            <h1>Publish</h1>
            <span>
              <b>Status: {state? state.status: 'Unknown'}</b>
            </span>
            {/* <span>
              <b>Visibility:</b> Public
            </span> */}
            <input style={{display:'none'}} type="file" id='file' onChange={e=>setFile(e.target.files[0])}/>
            <label className='file' htmlFor="file">Upload file</label>
            <div className="buttons">
              <button onClick={handleClickDraft}>Save as a draft</button>
              <button onClick={handleClick}>Publish</button>
            </div>
          </div>
          <div className="item">
            <h1>Category</h1>
            <div className="cat">
              <input type="radio" checked={cat==="art"} name='cat' value='art' id='art' onChange={e=>setCat(e.target.value)}/>
              <label htmlFor="art">Art</label>
            </div>
            <div className="cat">
              <input type="radio" checked={cat==="science"} name='cat' value='science' id='science' onChange={e=>setCat(e.target.value)}/>
              <label htmlFor="science">Science</label>
            </div>
            <div className="cat">
              <input type="radio" checked={cat==="technology"} name='cat' value='technology' id='technology' onChange={e=>setCat(e.target.value)}/>
              <label htmlFor="technology">Technology</label>
            </div>
            <div className="cat">
              <input type="radio" checked={cat==="cinema"} name='cat' value='cinema' id='cinema' onChange={e=>setCat(e.target.value)}/>
              <label htmlFor="cinema">Cinema</label>
            </div>
            <div className="cat">
              <input type="radio" checked={cat==="desing"} name='cat' value='design' id='design' onChange={e=>setCat(e.target.value)}/>
              <label htmlFor="design">Desing</label>
            </div>
            <div className="cat">
              <input type="radio" checked={cat==="food"} name='cat' value='food' id='food' onChange={e=>setCat(e.target.value)}/>
              <label htmlFor="food">Food</label>
            </div>
            <div className="cat">
              <input type="radio" checked={cat==="sport"} name='cat' value='sport' id='sport' onChange={e=>{setCat(e.target.value) }}/>
              <label htmlFor="sport">Sport</label>
            </div>
            <div className="cat">
              <input  name='cat' placeholder='Enter other categories' value={cat? cat:""} id='other' onChange={e=>setCat(e.target.value)}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Write