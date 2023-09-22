import express, { Request, Response } from "express";
import {signupController} from "../controllers/signupController";

export const SignupRouter = express.Router();

SignupRouter.use(express.json());

SignupRouter.post("/",signupController);
