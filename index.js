import express from "express";
import bodyParser from "body-parser"; /* process the requests body */
import mongoose from "mongoose"; /* mongoDB access */
import cors from "cors"; /* cross origin resource sharing */
import dotenv from "dotenv"; /* environment variables */
import multer from "multer"; /* storing files locally */
import helmet from "helmet"; /* request safety */
import morgan from "morgan"; /* For login */
import path from "path";
import { fileURLToPath } from "url"; /* path and fileURLToPath allows us to properly set the path */
import authRoutes from "./routes/auth.js";
import { register } from "./controllers/auth.js";

/* middleware and package configuration */

/* grab file url especially when using the "type": "module" */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* accessing the file from file assets */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* Settup the file storage - from multer github - how to save your files */

const storage = multer.diskStorage({
  destinatination: function (req, file, cb) {
    cb(null, "public/assets");
  },

  filename: function (req, file, cb) {
    cb(null, file.originalFilename);
  },
});

/* Save the file */
const upload = multer({ storage });

/* 
Authentication 
"/auth/register" -API route-path must be called from frontend to effect registration
"upload.single("picture")" - is a middleware, uploads the pic in public/assets folder, before we hit the endpoint register controllers
*/

app.post("/auth/register", upload.single("picture"), register);

/* Routes */

app.use("/auth", authRoutes);

/* MONGOOSE SET-UP */

const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server connected to PORT: ${PORT}`));
  })
  .catch((error) =>
    console.log(`Error: ${error} did not connect to PORT: ${PORT}`)
  );
