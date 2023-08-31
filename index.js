import express from 'express';
import cors from 'cors';
import mysql from 'mysql';
import bodyParser from 'body-parser';
import login from './routes/login-routes/loginAut.js'
import save from './routes/container-route/saveContainer.js'
import load from './routes/container-route/loadContainer.js'
import register from './routes/register-route/register.js'
const app = express();


app.use(cors({
    credentials: true,
    origin: 'http://127.0.0.1:5500'
}
));

app.use(bodyParser.json());

//routes
app.use('/', login);
app.use('/', save);
app.use('/', load);
app.use('/',register);



const port = 3000;
app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
})


