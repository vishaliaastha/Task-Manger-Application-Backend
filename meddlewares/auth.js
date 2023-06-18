const jwt = require('jsonwebtoken');
const SECRET_KEY = 'Node_API'

const auth = (req,res,next)=>{

    try{

        let token = req.headers.authorization;

        if(token){
            token = token.split(" ")[1];
            // let user = jwt.verify(token,SECRET_KEY);
            jwt.verify(token , SECRET_KEY , (err , user) => {
                if(err) {
                    console.log(user)
                    
                    if(err.name === "TokenExpiredError"){
                        return res.status(400).json({msg : "Your Token Is Expired It has a limited Access "})
                    }else{
                        return res.status(400).json({msg : "Invalid User"})    
                    }
        
                }
                req.user = user.id;
            })
            
           
    
        }   
       
        next();

     
       
        
        

    }catch(err){
        res.status(401).json({ message: "unauthorizede user" })

    }



}

module.exports = auth;