import express from "express";
import { registerUser, loginUser } from "../controller/userController.js";

const router = express.Router();

// Define routes & link them to controllers
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
