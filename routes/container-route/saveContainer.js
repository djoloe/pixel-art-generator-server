import connection from "../../connectDB.js";
import express from 'express'
const router = express.Router();


router.post('/input-container', function(req,res,next){
    const sql = `UPDATE nodeapp.users SET container = ? WHERE id = ? ;`
    connection.query(sql, [JSON.parse(req.body.jsonPost).html,req.body.valueCookie], function(err,result) {
        if(err) throw err;
        if(result) console.log('inserted');
    })
})

export default router;