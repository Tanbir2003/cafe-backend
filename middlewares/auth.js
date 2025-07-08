import jwt from "jsonwebtoken";
const SECRET = "something";


const auth = (req, res, next) => {
    let token = req.headers.authorization;
    token=token.split(" ")[1]; // Assuming the token is
    // res.json(token);
    const user=jwt.verify(token,SECRET);
    req.role=user.role;
    next();
};

const authorize=(role)=>{
    return(req, res, next) => {
        if(req.role===role){
            next();
        }else{
           return  res.status(403).json({message:"Access Denied"});
        }
    }
};

export { auth, authorize,};