import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import jobsRoute from "./routes/jobsRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8386;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/jobs", jobsRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



