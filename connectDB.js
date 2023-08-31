
import mysql from 'mysql';
import dotenv from 'dotenv';
dotenv.config({path: './.env'});

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




export default connection;