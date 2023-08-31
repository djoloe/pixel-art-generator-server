import express from 'express';
import connection from '../../connectDB.js';
const router = express.Router();


router.post('/container-content', function(req,res,next){
    const sql = `SELECT * FROM nodeapp.users WHERE id = ? ; `;
    connection.query(sql, [req.body.value], function(err, result){
        if(err) throw err;
        if(result){
            res.send(result[0].container);
        }
    })
})

export default router;