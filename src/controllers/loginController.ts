import {Request, Response} from "express";
import User from "../models/signup";
import {collections} from "../services/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function loginController(req:Request, res:Response){
    const {email,password} = req.body as User;
    if(collections.users) {
        const user = await collections.users.findOne({email});
        if (!user) {
            return res.sendStatus(401);
        }
        const {_id:id, isVerified, passwordHash,info} = user;
        const isCorrect = await bcrypt.compare(password, passwordHash);
        const secretKey : string = process.env.JWT_SECRET_KEY as string;
        if(isCorrect){
            await jwt.sign({id, isVerified, email, info},secretKey,{expiresIn:300},(err,token)=>{
                if(err){
                    res.status(500).json(err);
                }
                res.status(200).json({token});
            })
        } else{
            res.sendStatus(401);
        }
    }
}