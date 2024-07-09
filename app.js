import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import formData from "express-form-data";
import os from "os";

dotenv.config();

const app = express();

const options = {
  uploadDir: os.tmpdir(),
  autoClean: true,
};

app.use(formData.parse(options));
app.use(formData.format());
app.use(formData.stream());
app.use(formData.union());

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.enable("trust proxy");

export default app;
