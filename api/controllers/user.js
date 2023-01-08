import {db} from '../db.js'
import bcrypt from "bcrypt"

export const updatePassword = (req, res) => {
    const q ="UPDATE users SET `password`=? WHERE `username` = ? AND `email` = ?";

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password,salt)
    
    db.query(q, [hash, req.body.username, req.body.email], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Password has been updated.");
    });
  };