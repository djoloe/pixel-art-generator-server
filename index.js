import express, { Router, response } from 'express';
import cors from 'cors';
import mysql from 'mysql';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
const saltRounds = 1;
let currentUserEmail = '';
let cookieID = null;
dotenv.config({path: './.env'});


const app = express();
app.use(cors({
    credentials: true,
    origin: 'http://127.0.0.1:5500'
}
));

app.use(bodyParser.json());

let connection  = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
    multipleStatements: false
});
 
connection.connect((err) => {
    if(err) throw err;
    console.log('connected');
})

const port = 3000;
app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
})



app.post('/register-user',  function(req, res, next) {
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

app.post('/login-user', function (req,res,next) {
    try {
        let email = req.body.email;
        let password = req.body.password;
        const sql = 'SELECT * FROM nodeapp.users WHERE email = ?';
         connection.query(sql, [ email],function(err,resultQuery) {
            if(err) throw err;
            if(resultQuery.length > 0) {
                bcrypt.compare(password, resultQuery[0].password, function(err, result) {
                    if (result) {
                        currentUserEmail = email;
                        res.cookie("id", resultQuery[0].id);
                        cookieID = resultQuery[0].id;
                        res.send();
                    }
                });
            };
        })
    } catch (error) {
        console.log(error);
    }
  })

app.post('/input-container', function(req,res,next){
    let content = req.body.html;
    const sql = `UPDATE nodeapp.users SET container = ? WHERE id = ? ;`
    connection.query(sql, [content,cookieID], function(err,result) {
        if(err) throw err;
        if(result) console.log('inserted');
    })
})

app.post('/container-content', function(req,res,next){
    const sql = `SELECT * FROM nodeapp.users WHERE id = ? ; `;
    connection.query(sql, [req.body.value], function(err, result){
        if(err) throw err;
        if(result){
            res.send(result[0].container);
        }
    })
})