import Jwt from "jsonwebtoken";

const auth = (req,res,next) => {
    const token=req.header('auth-token');
    if(!token) return res.status(400).send("Access Denied");


    try {
        const verified=Jwt.verify(token,process.env.TOKEN_SECRET);
        req.user=verified;
        next()
    } catch (error) {
        res.status(400).send("Access Denied");
    }
}

export default auth;
