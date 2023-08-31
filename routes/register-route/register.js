import express from 'express';
const router = express.Router();
import bcrypt from 'bcryptjs';
import connection from '../../connectDB.js';
const saltRounds = 5;

router.post('/register-user',  function(req, res, next) {
    try {
        let password = req.body.password;
        bcrypt.hash(password, saltRounds, function(err, hash){
        const sql = 'INSERT INTO nodeapp.users (userName, email, password) VALUES (?,?,?)';
        connection.query(sql, [req.body.username,req.body.email,hash], function(err, result) {
        if (err) throw err;
        console.log('record inserted');
        });
})
    } catch (error) {
        res.send(console.log('register'));
        console.log(error);
        }
  });

export default router;