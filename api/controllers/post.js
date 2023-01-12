import {db} from '../db.js'
import jwt from 'jsonwebtoken'
export const getPosts = (req,res) =>{

    const token = req.cookies.access_token;
    if (token){
        jwt.verify(token, "jwtkey", (err, userInfo) => {
            if (err) return res.status(403).json("Token is not valid!");
            const q = req.query.cat ? "SELECT p.id, p.title, p.desc, p.img, p.date, p.uid, p.status, p.cid FROM posts p INNER JOIN categories c on p.cid=c.id WHERE c.name=? AND (p.status='public' OR (p.status='draft' AND p.uid="+userInfo.id+"))":"SELECT * FROM posts WHERE posts.status='public' OR (posts.status='draft' AND posts.uid="+userInfo.id+")";
            db.query(q,[req.query.cat], (err,data)=>{
                if(err) return res.status(500).send(err)
                return res.status(200).json(data);
            });
        })
    }else{
        const q = req.query.cat ? "SELECT p.id, p.title, p.desc, p.img, p.date, p.uid, p.status, p.cid FROM posts p INNER JOIN categories c on p.cid=c.id WHERE c.name=? AND p.status='public'":"SELECT * FROM posts WHERE posts.status='public'";
            
        db.query(q,[req.query.cat], (err,data)=>{
            if(err) return res.status(500).send(err)
            return res.status(200).json(data);
        });
    }
}

export const getPost = (req,res) =>{
    const q = "SELECT p.id, `username`, `title`, `desc`, p.img, u.img as userImg, c.name as cat,`date`, `status` FROM users u JOIN posts p ON u.id=p.uid JOIN categories c ON p.cid=c.id where p.id=?"

    db.query(q,[req.params.id], (err,data)=>{
        if(err) return res.status(500).json(err)
        return res.status(200).json(data[0]);
    })
}

export const addPost = (req,res) =>{
    const token = req.cookies.access_token;
    if(!token) return res.status(401).json("User not authenticated!")

    jwt.verify(token,'jwtkey',(err,userInfo)=>{
        if(err) return res.status(403).json("Token is not valid!")
        let predefinedCat = [];

        const qDefinedCat = "SELECT * FROM categories";
        db.query(qDefinedCat,(err,data)=>{
            if(err) return res.status(500).json(err)
            data.forEach(function(cat){
                predefinedCat.push(cat.name)
            })

            let catExists = false;
            let position =0;
            let counter=0;
            predefinedCat.forEach(function(cat){
                counter++;
                if(cat===req.body.cat){
                    catExists = true;
                    position = counter;
                }
            })

            if(catExists){
                const qPost = "INSERT INTO posts (`title`, `desc`, `img`, `cid`, `date`, `uid`, `status`) VALUES (?)"

                const values = [
                    req.body.title,
                    req.body.desc,
                    req.body.img,
                    position,
                    req.body.date,
                    userInfo.id,
                    req.body.status,
                ]
        
                db.query(qPost,[values],(err,data)=>{
                    if(err) return res.status(500).json(err);
                    return res.status(200).json("Post have been created")
                });
            }else{
                const qAddNewCat = "INSERT INTO categories (`name`) VALUES(?)"
                const values = [
                    req.body.cat,
                ]
                db.query(qAddNewCat,[values],(err,data)=>{
                    if(err) return res.status(500).json(err);

                    const qPost = "INSERT INTO posts (`title`, `desc`, `img`, `cid`, `date`, `uid`, `status`) VALUES (?)"

                    const values = [
                        req.body.title,
                        req.body.desc,
                        req.body.img,
                        counter,
                        req.body.date,
                        userInfo.id,
                        req.body.status,
                    ]
            
                    db.query(qPost,[values],(err,data)=>{
                        if(err) return res.status(500).json(err);
                        return res.status(200).json("Post have been created")
                    });
                });
            }
        });
    })
}

export const deletePost = (req,res) =>{
    const token = req.cookies.access_token;
    if(!token) return res.status(401).json("User not authenticated!")

    jwt.verify(token,'jwtkey',(err,userInfo)=>{
        if(err) return res.status(403).json("Token is not valid!")
        const postId = req.params.id
        const q = "DELETE FROM posts WHERE `id` = ? AND `uid`=?"
        db.query(q,[postId,userInfo.id], (err,data)=>{
            if(err) return res.status(403).json("You can delete only your post!")

            return res.json("Post has been deleted!")
        })
    })

}

export const updatePost = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
  
    jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");

      let predefinedCat = [];
      let q = '';
      let values = [];
      const postId = req.params.id;
      console.log(postId)

      const qDefinedCat = "SELECT * FROM categories";
      db.query(qDefinedCat,(err,data)=>{
          if(err) return res.status(500).json(err)
          data.forEach(function(cat){
              predefinedCat.push(cat.name)
          })

          let catExists = false;
          let position =0;
          let counter=0;
          predefinedCat.forEach(function(cat){
              counter++;
              if(cat===req.body.cat){
                  catExists = true;
                  position = counter;
              }
          })

          if(catExists){
      
            
            if(!req.body.img){
              q ="UPDATE posts SET `title`=?,`desc`=?,`cid`=?, `status`=? WHERE `id` = ? AND `uid` = ?";
              values = [req.body.title, req.body.desc, position, req.body.status];
            }else{
              q ="UPDATE posts SET `title`=?,`desc`=?,`img`=?,`cid`=?, `status`=? WHERE `id` = ? AND `uid` = ?";
            //   values = [req.body.title, req.body.desc, req.body.img, req.body.cat, req.body.status];
              values = [req.body.title, req.body.desc, req.body.img, position, req.body.status];
            }

            db.query(q, [...values, postId, userInfo.id], (err, data) => {
                if (err) return res.status(500).json(err);
                return res.json("Post has been updated.");
              });

          }else{

            const qAddNewCat = "INSERT INTO categories (`name`) VALUES(?)"
            const valuesForNewCat = [
                req.body.cat,
            ]
            db.query(qAddNewCat,[valuesForNewCat],(err,data)=>{
                if(err) return res.status(500).json(err);

                if(!req.body.img){
                    q ="UPDATE posts SET `title`=?,`desc`=?,`cid`=?, `status`=? WHERE `id` = ? AND `uid` = ?";
                    values = [req.body.title, req.body.desc, position, req.body.status];
                  }else{
                    q ="UPDATE posts SET `title`=?,`desc`=?,`img`=?,`cid`=?, `status`=? WHERE `id` = ? AND `uid` = ?";
                  //   values = [req.body.title, req.body.desc, req.body.img, req.body.cat, req.body.status];
                    values = [req.body.title, req.body.desc, req.body.img, position, req.body.status];
                  }

                  db.query(q, [...values, postId, userInfo.id], (err, data) => {
                    if (err) return res.status(500).json(err);
                    return res.json("Post has been updated.");
                  });
                
            });

          }
      });
      
    });
  };



