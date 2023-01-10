import {db} from '../db.js'
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const updatePassword = (req, res) => {
    const q ="UPDATE users SET `password`=? WHERE `username` = ? AND `email` = ?";

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password,salt)
    
    db.query(q, [hash, req.body.username, req.body.email], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Password has been updated.");
    });
  };

  export const changePassword = (req, res) => {

    //check if user exists
    const q = "SELECT * FROM users WHERE email = ?";
    db.query(q,[req.body.email], (err,data)=>{
      if(err) return res.json(err)
      if(data.length===0) return res.status(404).json("No user with such email");

      const secret = "5D6B46340025C11961A8502D793EDECC83A73F74838F213DB640F3A89CE247C3 - "+data[0].password;
      const token = jwt.sign({email: data[0].email, id:data[0].id}, secret, {
        expiresIn: "5m",
      });

      const link = `http://localhost:8800/api/users/change-password/${data[0].id}/${token}`
      console.log(link);

    });
  };

  export const changePasswordOpen = (req, res) => {
    const {id, token} = req.params;
    const q = "SELECT * FROM users WHERE id = ?";
    db.query(q,[id], (err,data)=>{
      if(err) return res.json(err)
      if(data.length===0) return res.status(404).json("User dose not exist");
      const secret = "5D6B46340025C11961A8502D793EDECC83A73F74838F213DB640F3A89CE247C3 - "+data[0].password;
      try{
        jwt.verify(token,secret);
        res.send("Verified")
      }catch(err){
        res.send("Not valid");
      }

    });
  };