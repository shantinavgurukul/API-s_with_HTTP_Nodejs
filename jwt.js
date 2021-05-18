var express = require('express');
var jwt = require('jsonwebtoken');
var dotenv = require('dotenv');
const app = express();
const port = 4000;

app.get('/api',function(req,res){
    res.json({
        text : 'my api'
    })
})
app.post('/api/login',function(req,res){
    const user = {id : 2}
    const token = jwt.sign({user},'my_secert_key');
    res.json({
        token : token
    })
})
app.get('/api/protected',ensureToken ,function(req,res){
    jwt.verify(req.token,'my_secert_key',function(err,data){
        if (err){
            res.sendStatus(403);
        }else{
        res.json({
            text : 'this is protected',
            data : data
            });
        }
    })
});
function ensureToken(req,res,next){

    const bearerHeader = req.headers["authorization"];
    if (bearerHeader !== 'undefined' ){
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }
    else{
        res.sendStatus(403);

    }
}
app.listen(port,() => {
    console.log(`your port is working ${port}`)
})