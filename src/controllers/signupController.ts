import {Request, Response} from "express";
import User from "../models/signup";
import {collections} from "../services/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function signupController(req:Request, res:Response){
    const {email,password} = req.body as User;
    if(collections.users) {
        const user = await collections.users.findOne({email});
        if (user) {
           return  res.sendStatus(409);
        }
        const passwordHash = await bcrypt.hash(password, 10);
        const result = await collections.users.insertOne({email, passwordHash, info: {}, isVerified: false});
        const secretKey : string = process.env.JWT_SECRET_KEY as string;
        jwt.sign({
                id: result.insertedId,
                email,
                info: {},
                isVerified: false
            },
            secretKey,
            {expiresIn: 60}
        )
        result
            ? res.status(201).send(`Successfully created a new game with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new game.");
    }
}