import express from "express";
import { login } from "./controllers/login";

const router = express.Router();

app.post("login", login);

export default router;
