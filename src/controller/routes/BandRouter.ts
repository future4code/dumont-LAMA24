import express from "express";
import { BandController } from "../BandController";

export const bandRouter = express.Router();

const bandController = new BandController();
bandRouter.post("/signup", bandController.signupBand);
//bandRouter.post("/login", userController.login);