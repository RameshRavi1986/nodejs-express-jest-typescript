import express from "express";
import {loginController} from "../controllers/loginController";
export const LoginRouter = express.Router();
LoginRouter.use(express.json());
LoginRouter.post("/",loginController);
