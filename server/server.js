import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import Database from "better-sqlite3";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const PORT = 9465;
const db = new Database("database.db");

// Server listening on defined port
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});