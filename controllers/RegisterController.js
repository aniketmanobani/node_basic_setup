import express from "express";
import User from "../models/User.js";
import Joi from "joi";
import bcrypt from "bcryptjs";

const RegisterController = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(true),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  const error = schema.validate(req.body);

  if (error.error) return res.status(400).send(error.error);

  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("email already exist");

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashPassword;
  const user = new User(req.body);

  try {
    const savedUser = await user.save();
    res.send({user:savedUser._id});
  } catch (error) {
    res.status(400).send(error);
  }
};

export default RegisterController;
