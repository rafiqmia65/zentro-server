import dotenv from "dotenv";
import app from "./app.js";
import connectDb from "./config/db.js";

dotenv.config();

const port = process.env.PORT || 5000;

// Connect Database
connectDb();

app.listen(port, () => {
  console.log(`🚀 Zentro Place app listening on port ${port}`);
});
