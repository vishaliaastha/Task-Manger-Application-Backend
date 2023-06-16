const jwt = require('jsonwebtoken');
const SECRET_KEY = 'Node_API'

const auth = (req,res,next)=>{

    try{

        let token = req.headers.authorization;
        if(token){
            token = token.split(" ")[1];
            let user = jwt.verify(token,SECRET_KEY);
            req.user = user.id;
        }   
        else{
            res.status(401).json({ message: "unauthorizede user" })
        }
        next();


    }catch(err){
        res.status(401).json({ message: "unauthorizede user" })

    }
}

module.exports = auth;