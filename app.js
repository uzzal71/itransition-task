import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import formData from "express-form-data";
import os from "os";
import session from "express-session";
import flash from "express-flash";
import expressLayouts from "express-ejs-layouts";

dotenv.config();

const app = express();

app.use(express.static('public'));
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));
app.use(flash());
app.set('view engine', 'ejs');
app.use(expressLayouts)
app.set('layout', './layouts/full-width')

const options = {
  uploadDir: os.tmpdir(),
  autoClean: true,
};

app.use(formData.parse(options));
app.use(formData.format());
app.use(formData.stream());
app.use(formData.union());

// Use express built-in middleware for URL-encoded form data
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.enable("trust proxy");

export default app;
