import express from 'express';
import connection from './../../connectDB.js';
import bcrypt from 'bcryptjs';
const router = express.Router();

router.post('/login-user', function (req,res,next) {
    try {
        let email = req.body.email;
        let password = req.body.password;
        const sql = 'SELECT * FROM nodeapp.users WHERE email = ?';
         connection.query(sql, [ email],function(err,resultQuery) {
            if(err) throw err;
            if(resultQuery.length > 0) {
                bcrypt.compare(password, resultQuery[0].password, function(err, result) {
                    if (result) {
                        let currentUserEmail = email;
                        res.cookie("id", resultQuery[0].id);
                        res.send();
                    }
                });
            };
        })
    } catch (error) {
        console.log(error);
    }
  })


export default router;