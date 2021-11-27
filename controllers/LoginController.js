import Joi from "joi";
import User from "../models/User.js";
import bcrypt from 'bcryptjs'
import Jwt from "jsonwebtoken";
/**
 * 
 */




const LoginController =async (req,res) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
      });
    
      const error = schema.validate(req.body);
    
      if (error.error) return res.status(400).send(error.error);
    
      const emailExist = await User.findOne({ email: req.body.email });
      if(!emailExist) return res.status(400).send("email doesnt exist")
   
      // password is corrent
      const validpass=await bcrypt.compare(req.body.password,emailExist.password)
      if(!validpass) return res.status(400).send("Invalid password")

      // create and assign a token
      const token=Jwt.sign({_id:emailExist._id},process.env.TOKEN_SECRET)
      res.header('auth-token',token)
      .send(token)
}

export default LoginController;